import fs from 'fs'
import * as Utils from '../../utils'
import createImage from '../../utils/createImage'
import * as Tesseract from '../../utils/tesseract'
import ocrGetData from '../../utils/ocrGetData'

jest.mock('fs')
jest.mock('jimp', () => ({
  read: jest.fn().mockImplementation(() => ({
    contrast: jest.fn(),
    greyscale: jest.fn(),
    getBufferAsync: jest.fn().mockReturnValue('getBufferAsync'),
  }))
}))
jest.mock('../../utils/createImage', () => jest.fn())

let logger: string[] = []
jest.mock('@wdio/logger', () => jest.fn().mockImplementation(() => ({
  info: jest.fn().mockImplementation((...infoArgs) => logger.push(infoArgs)),
})))

const globalAny: any = global
let getScreenshotSizeSpy: jest.SpyInstance
let dateSpy: jest.SpyInstance
let getSystemOcrDataSpy: jest.SpyInstance
let getNodeOcrDataSpy: jest.SpyInstance

describe('utils - ocrGetData', () => {
  beforeEach(() => {
    globalAny.driver = {
      isAndroid: true,
      isIOS: false,
      takeScreenshot: jest.fn().mockReturnValue('takeScreenshot')
    }
    getScreenshotSizeSpy = jest
      .spyOn(Utils, 'getScreenshotSize')
      .mockReturnValue({ height: 400, width: 200 })
    fs.writeFileSync = jest.fn()
    const mockDate = new Date(1466424490000)
    dateSpy = jest
      .spyOn(global, 'Date')
      // @ts-ignore
      .mockImplementation(() => mockDate)
    getNodeOcrDataSpy = jest
      .spyOn(Tesseract, 'getNodeOcrData')
    getSystemOcrDataSpy = jest
      .spyOn(Tesseract, 'getSystemOcrData')
    jest.spyOn(process, 'hrtime').mockReturnValue([0, 0])
  })

  afterEach(() => {
    jest.clearAllMocks()
    logger = []
  })

  it('should return Node ocrData with default options', async () => {
    const options = {
      isTesseractAvailable: false,
      ocrImagesPath: 'ocrImagesPath',
      reuseOcr: false,
      screenSize: {
        height: 200,
        width: 100,
      }
    }
    const ocrData = {
      text: 'ocrData',
      lines: [{ text: 'line string', bbox: { left: 1, top: 2, right: 3, bottom: 4 } }],
      words: [{ text: 'word string', bbox: { left: 5, top: 6, right: 7, bottom: 8 } }],
    }
    getNodeOcrDataSpy.mockResolvedValue(ocrData)

    expect(await ocrGetData(options)).toMatchSnapshot()
    expect(globalAny.driver.takeScreenshot).toHaveBeenCalledTimes(1)
    expect(getScreenshotSizeSpy).toHaveBeenCalledTimes(1)
    expect(dateSpy).toHaveBeenCalled()
    expect(fs.writeFileSync).toHaveBeenCalledWith('ocrImagesPath/android-1466424490000.png', 'getBufferAsync', { 'encoding': 'base64' })
    expect(getSystemOcrDataSpy).not.toHaveBeenCalled()
    expect(getNodeOcrDataSpy).toHaveBeenCalledWith({ filePath: 'ocrImagesPath/android-1466424490000.png' })
    expect(createImage).toHaveBeenCalledWithSnapshot()
    expect(logger).toMatchSnapshot()
  })

  it('should return Node ocrData for a cropped Android image', async () => {
    const options = {
      androidRectangles: { left: 10, top: 20, right: 30, bottom: 40 },
      isTesseractAvailable: false,
      ocrImagesPath: 'ocrImagesPath',
      reuseOcr: false,
      screenSize: {
        height: 200,
        width: 100,
      }
    }
    const ocrData = {
      text: 'ocrData',
      lines: [{ text: 'line string', bbox: { left: 100, top: 200, right: 300, bottom: 400 } }],
      words: [{ text: 'word string', bbox: { left: 500, top: 600, right: 700, bottom: 800 } }],
    }
    getNodeOcrDataSpy.mockResolvedValue(ocrData)

    expect(await ocrGetData(options)).toMatchSnapshot()
    expect(globalAny.driver.takeScreenshot).toHaveBeenCalledTimes(1)
    expect(getScreenshotSizeSpy).toHaveBeenCalledTimes(1)
    expect(fs.writeFileSync).toHaveBeenCalledWith('ocrImagesPath/android-1466424490000.png', 'getBufferAsync', { 'encoding': 'base64' })
    // This is the first call for writing the cropped image
    expect(createImage).toHaveBeenCalledWithSnapshot()
  })

  it('should return Node ocrData for a cropped iOS image', async () => {
    const options = {
      iOSRectangles: { left: 10, top: 20, right: 30, bottom: 40 },
      isTesseractAvailable: false,
      ocrImagesPath: 'ocrImagesPath',
      reuseOcr: false,
      screenSize: {
        height: 200,
        width: 100,
      }
    }
    const ocrData = {
      text: 'ocrData',
      lines: [{ text: 'line string', bbox: { left: 100, top: 200, right: 300, bottom: 400 } }],
      words: [{ text: 'word string', bbox: { left: 500, top: 600, right: 700, bottom: 800 } }],
    }
    globalAny.driver.isAndroid = false
    globalAny.driver.isIOS = true
    getNodeOcrDataSpy.mockResolvedValue(ocrData)

    expect(await ocrGetData(options)).toMatchSnapshot()
    expect(globalAny.driver.takeScreenshot).toHaveBeenCalledTimes(1)
    expect(getScreenshotSizeSpy).toHaveBeenCalledTimes(1)
    expect(fs.writeFileSync).toHaveBeenCalledWith('ocrImagesPath/ios-1466424490000.png', 'getBufferAsync', { 'encoding': 'base64' })
    // This is the first call for writing the cropped image
    expect(createImage).toHaveBeenCalledWithSnapshot()
  })

  it('should return Node ocrData when it needs to re-use stored driver data', async () => {
    const options = {
      isTesseractAvailable: false,
      ocrImagesPath: 'string',
      reuseOcr: true,
      screenSize: {
        height: 200,
        width: 100,
      }
    }
    globalAny.driver.ocrData = ['driver.ocrData available']

    expect(await ocrGetData(options)).toEqual(['driver.ocrData available'])
  })

  it('should return System ocrData with default options', async () => {
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      reuseOcr: false,
      screenSize: {
        height: 200,
        width: 100,
      }
    }
    const ocrData = {
      text: 'ocrData',
      lines: [{ text: 'line string', bbox: { left: 1, top: 2, right: 3, bottom: 4 } }],
      words: [{ text: 'word string', bbox: { left: 5, top: 6, right: 7, bottom: 8 } }],
    }
    getSystemOcrDataSpy.mockResolvedValue(ocrData)

    expect(await ocrGetData(options)).toMatchSnapshot()
    expect(getSystemOcrDataSpy).toHaveBeenCalledWith({ filePath: 'ocrImagesPath/android-1466424490000.png' })
    expect(getNodeOcrDataSpy).not.toHaveBeenCalled()
    expect(logger).toMatchSnapshot()
  })

  it('should be able to throw an error', async () => {
    try {
      // @ts-ignore
      await ocrGetData({})
      // Don't expect it to hit this
      expect(true).toBe(false)
    } catch (e) {
      expect(e.toString()).toBe("Error: TypeError: Cannot read property 'width' of undefined")
    }
  })
})
