import logger from '@wdio/logger'
import { writeFileSync } from 'fs'
import { join } from 'path'
import Jimp from 'jimp'
import { getScreenshotSize } from './index'
import { GetOcrData, ScreenSize } from '../types/types'
import createImage from './createImage'
import { SERVICE_NAME } from './constants'
import { getNodeOcrData, getSystemOcrData } from './tesseract'

interface OcrGetDataOptions {
  isTesseractAvailable: boolean;
  ocrImagesPath: string;
  reuseOcr: boolean;
  screenSize: ScreenSize;
}

interface OcrGetData extends GetOcrData{
  dpr: number;
}

const log = logger(SERVICE_NAME)

// @TODO: fix output
export default async function ocrGetData(options: OcrGetDataOptions): Promise<OcrGetData> {
  const { isTesseractAvailable, ocrImagesPath, reuseOcr, screenSize } = options

  // @TODO: fix this typing
  // @ts-ignore
  if (!reuseOcr || !driver.ocrData) {
    try {
      // Take a screenshot
      const screenshot = await driver.takeScreenshot()
      const { height, width } = getScreenshotSize(screenshot)
      const dpr = width / screenSize.width

      // Make it grey which will be better for OCR
      const image = await Jimp.read(Buffer.from(screenshot, 'base64'))
      image.greyscale()
      const greyscaleImage = (
        await image.getBufferAsync(Jimp.MIME_PNG)
      ).toString('base64')

      // Store it
      const fileName = `${
        driver.isAndroid ? 'android' : 'ios'
      }-${new Date().getTime()}.png`
      const filePath = join(ocrImagesPath, fileName)
      writeFileSync(filePath, greyscaleImage, { encoding: 'base64' })

      // OCR the image
      let ocrData: any
      const start = process.hrtime()

      if (isTesseractAvailable) {
        log.info('Using system installed version of Tesseract')
        ocrData = await getSystemOcrData({
          filePath,
        })
      } else {
        log.info('Using NodeJS version of Tesseract')
        ocrData = await getNodeOcrData({
          filePath,
        })
      }

      const diff = process.hrtime(start)
      const processTime = (
        (diff[0] * 1000000 + diff[1] / 1000) /
        1000000
      ).toFixed(3)

      log.info(`It took '${processTime}s' to process the image.`)
      log.info(
        `The following text was found through OCR:\n\n${ocrData.text.replace(
          /[\r\n]{2,}/g,
          '\n'
        )}`
      )

      // Overwrite image with the found locations
      await createImage({
        filePath,
        height,
        lines: ocrData.lines,
        width,
      })

      log.info(`OCR Image with found text can be found here:\n\n${filePath}`)

      const parsedOcrData = {
        ...ocrData,
        ...{ dpr },
      }

      // @TODO: fix this typing
      // @ts-ignore
      driver.ocrData = parsedOcrData

      return parsedOcrData
    } catch (e) {
      throw new Error(e)
    }
  }

  // @TODO: fix this typing
  // @ts-ignore
  return driver.ocrData
}
