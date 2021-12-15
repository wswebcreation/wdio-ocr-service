import ocrGetElementPositionByText from '../../commands/ocrGetElementPositionByText'
import * as OcrGetTextPositions from '../../utils/ocrGetTextPositions'
import * as FuzzySearch from '../../utils/fuzzySearch'

let logger: string[] = []
jest.mock('@wdio/logger', ()=>jest.fn().mockImplementation(()=>({
  info: jest.fn().mockImplementation((...infoArgs)=> logger.push(infoArgs)),
  warn: jest.fn().mockImplementation((...warnArgs)=> logger.push(warnArgs)),
})))
jest.mock('../../utils/ocrGetTextPositions', ()=> jest.fn())

describe('ocrGetElementPositionByText', () => {
  let ocrGetTextPositionsSpy: jest.SpyInstance
  let fuzzySearchSpy: jest.SpyInstance

  beforeEach(() => {
    ocrGetTextPositionsSpy = jest.spyOn(OcrGetTextPositions, 'default').mockResolvedValue([
      {
        text: 'text',
        originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
        dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
      },
    ])
  })

  afterEach(() => {
    ocrGetTextPositionsSpy.mockClear()
    fuzzySearchSpy.mockClear()
    logger = []
  })

  it('should throw an error when no matches are found', async () => {
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      tesseractLang: 'eng',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
      text: 'text',
    }
    fuzzySearchSpy = jest.spyOn(FuzzySearch, 'fuzzyFind').mockReturnValue([])

    try {
      await ocrGetElementPositionByText(options)
      // Don't expect it to hit this
      expect(true).toEqual(false)
    } catch (error) {
      expect(ocrGetTextPositionsSpy).toHaveBeenCalledTimes(1)
      expect(fuzzySearchSpy).toHaveBeenCalledTimes(1)
      expect(error.toString())
        .toEqual('Error: InvalidSelectorMatch. Strategy \'ocr\' has failed to find word \'text\' in the image')
      expect(logger).toMatchSnapshot()
    }
  })

  it('should select the match with the highest score', async () => {
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      tesseractLang: 'eng',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
      text: 'text',
    }
    fuzzySearchSpy = jest.spyOn(FuzzySearch, 'fuzzyFind').mockReturnValue([
      {
        item: {
          text: 'text 100',
          originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
          dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
        },
        refIndex: 0,
        score: 0,
      },
      {
        item: {
          text: 'text 90',
          originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
          dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
        },
        refIndex: 0,
        score: 0.1,
      }
    ])

    expect(await ocrGetElementPositionByText(options)).toMatchSnapshot()
    expect(logger).toMatchSnapshot()
  })

  it('should select the sorted match with the highest score', async () => {
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      tesseractLang: 'eng',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
      text: 'text',
    }
    fuzzySearchSpy = jest.spyOn(FuzzySearch, 'fuzzyFind').mockReturnValue([
      {
        item: {
          text: 'text 60',
          originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
          dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
        },
        refIndex: 0,
        score: 0.4,
      },
      {
        item: {
          text: 'text 90',
          originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
          dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
        },
        refIndex: 0,
        score: 0.1,
      }
    ])

    expect(await ocrGetElementPositionByText(options)).toMatchSnapshot()
  })

  it('should select the only match', async () => {
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      tesseractLang: 'eng',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
      text: 'text',
    }
    fuzzySearchSpy = jest.spyOn(FuzzySearch, 'fuzzyFind').mockReturnValue([
      {
        item: {
          text: 'text 60',
          originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
          dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
        },
        refIndex: 0,
        score: 0.4,
      },
    ])

    expect(await ocrGetElementPositionByText(options)).toMatchSnapshot()
    expect(logger).toMatchSnapshot()
  })
})
