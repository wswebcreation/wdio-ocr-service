import { exec, ExecException } from 'child_process'
import { createWorker, OEM, PSM } from 'tesseract.js'
// @ts-ignore
import { recognize } from 'node-tesseract-ocr'
import { parseString } from 'xml2js'
import { GetOcrData, Line, Rectangles, Words } from '../types/types'

export async function isTesseractAvailable(
  tesseractName: string = ''
): Promise<boolean> {
  const binary = tesseractName || 'tesseract'
  const command = [binary, '--version'].join(' ')

  return new Promise((resolve) => {
    exec(command, (error: ExecException | null) => {
      if (error) {
        return resolve(false)
      }

      return resolve(true)
    })
  })
}

interface GetOcrDataOptions {
  filePath: string;
}

export async function getNodeOcrData(options: GetOcrDataOptions): Promise<GetOcrData|Error> {
  try {
    const { filePath } = options
    const jsonSingleWords: Words[] = []
    const jsonWordStrings: Line[] = []
    let composedBlocks: any = []

    const worker = createWorker()
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    await worker.setParameters({
      tessedit_ocr_engine_mode: OEM.TESSERACT_LSTM_COMBINED,
      tessedit_pageseg_mode: PSM.AUTO,
      tessjs_create_tsv: '0',
      tessjs_create_box: '0',
      tessjs_create_unlv: '0',
      tessjs_create_osd: '0',
    })
    const { data: { text, hocr } } = await worker.recognize(filePath)

    // @ts-ignore
    parseString(hocr, (error: Error, data: any) => {
      if (error) {
        throw Error(`An error happened when parsing the getNodeOcrData, see: ${error}`)
      }

      composedBlocks = data.div.div
    })

    if (!composedBlocks || composedBlocks.length === 0){
      throw Error('No text was found for the OCR, please verify the stored image.')
    }

    // This is for single words
    // @ts-ignore
    composedBlocks.forEach(({ p: TextBlock }) => {
      // @ts-ignore
      TextBlock.forEach(({ span: TextLine }) => {
        // @ts-ignore
        TextLine.forEach(({ span: String }) => {
          // @ts-ignore
          String.forEach(({ _: text, $: { title } }) => {
            if (!text) {
              return
            }

            const attributes = `; ${title}`.split('; ')
            const { bbox, wc } = parseAttributeString(attributes)

            jsonSingleWords.push({
              text,
              bbox,
              wc,
            })
          })
        })
      })
    })

    // This is for single lines
    // @ts-ignore
    composedBlocks.forEach(({ p: TextBlock }) => {
      // @ts-ignore
      TextBlock.forEach(({ span: TextLine }) => {
        // @ts-ignore
        TextLine.forEach(({ $: { title }, span: String }) => {
          const attributes = `; ${title}`.split('; ')
          const { bbox } = parseAttributeString(attributes)
          const line = {
            text: '',
            bbox,
          }

          // @ts-ignore
          String.map(({ _: text }) => {
            line.text = `${line.text} ${text || ''}`.trim()
          })

          if (line.text === '') {
            return
          }

          jsonWordStrings.push(line)
        })
      })
    })

    await worker.terminate()

    return {
      lines: jsonWordStrings,
      words: jsonSingleWords,
      text,
    }
  } catch (error) {
    throw Error(`An error happened when parsing the getNodeOcrData, see: ${error}`)
  }
}

export async function getSystemOcrData(options: GetOcrDataOptions): Promise<GetOcrData|Error> {
  try {
    const { filePath } = options
    const jsonSingleWords: Words[] = []
    const jsonWordStrings: Line[] = []
    let composedBlocks: any = []
    let text: string = ''
    const result = await recognize(filePath, {
      lang: 'eng',
      oem: 1,
      // https://github.com/tesseract-ocr/tesseract/blob/master/doc/tesseract.1.asc
      psm: 3,
      presets: ['txt', 'alto'],
    })

    parseString(result, (error: Error, data) => {
      if (error) {
        throw Error(`An error happened when parsing the getSystemOcrData, see: ${error}`)
      }

      text = data.alto.Layout[0]._
      composedBlocks = data.alto.Layout[0].Page[0].PrintSpace[0].ComposedBlock
    })

    if (!composedBlocks || composedBlocks.length === 0){
      throw Error('No text was found for the OCR, please verify the stored image.')
    }

    // This is for single words
    // @ts-ignore
    composedBlocks.forEach(({ TextBlock }) => {
      // @ts-ignore
      TextBlock.forEach(({ TextLine }) => {
        // @ts-ignore
        TextLine.forEach(({ String }) => {
          // @ts-ignore
          String.forEach(({ $: { CONTENT, HPOS, VPOS, WIDTH, HEIGHT, WC } }) => {
            jsonSingleWords.push({
              text: CONTENT || '',
              bbox: {
                left: Number(HPOS),
                top: Number(VPOS),
                right: Number(HPOS) + Number(WIDTH),
                bottom: Number(VPOS) + Number(HEIGHT),
              },
              wc: Number(WC),
            })
          }
          )
        })
      })
    })

    // This is for single lines
    // @ts-ignore
    composedBlocks.forEach(({ TextBlock }) => {
      // @ts-ignore
      TextBlock.forEach(({ TextLine }) => {
        // @ts-ignore
        TextLine.forEach(({ $: { HPOS, VPOS, WIDTH, HEIGHT }, String }) => {
          const line = {
            text: '',
            bbox: {
              left: Number(HPOS),
              top: Number(VPOS),
              right: Number(HPOS) + Number(WIDTH),
              bottom: Number(VPOS) + Number(HEIGHT),
            },
          }
          // @ts-ignore
          String.forEach(({ $: { CONTENT } }) => {
            line.text = `${line.text} ${CONTENT || ''}`.trim()
          })

          if (line.text === '') {
            return
          }

          jsonWordStrings.push(line)
        })
      })
    })

    return {
      lines: jsonWordStrings,
      words: jsonSingleWords,
      text,
    }
  } catch (error) {
    throw Error(`An error happened when parsing the getSystemOcrData, see: ${error}`)
  }
}

export function parseAttributeString(
  attributes: string[]
): { bbox: Rectangles; wc: number } {
  let bbox = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  }
  let wc = 0

  attributes.forEach((attribute: string) => {
    if (attribute.includes('bbox')) {
      const bboxValues = attribute.replace('bbox ', '').split(' ')
      bbox = {
        left: Number(bboxValues[0]),
        top: Number(bboxValues[1]),
        right: Number(bboxValues[2]),
        bottom: Number(bboxValues[3]),
      }
    } else if (attribute.includes('x_wconf')) {
      const score = attribute.replace('x_wconf ', '')
      wc = Number(score) / 100
    }
  })

  return {
    ...{ bbox },
    wc,
  }
}
