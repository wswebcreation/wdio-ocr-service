import { toMatchSnapshot } from 'jest-snapshot'
import fs from 'fs'
import WdioOcrService from '../index'
import * as Tesseract from '../utils/tesseract'
import { OCR_IMAGES_PATH } from '../utils/constants'
import OcrGetElementPositionByText from '../commands/ocrGetElementPositionByText'
import OcrClickOnText from '../commands/ocrClickOnText'
import OcrGetText from '../commands/ocrGetText'
import OcrWaitForTextDisplayed from '../commands/ocrWaitForTextDisplayed'
import OcrSetValue from '../commands/ocrSetValue'

expect.extend({
  toHaveBeenCalledWithSnapshot(received) {
    // @ts-ignore
    return toMatchSnapshot.call(this, received)
  },
})

jest.mock('fs')
jest.mock('../commands/ocrGetElementPositionByText', () => jest.fn())
jest.mock('../commands/ocrClickOnText', () => jest.fn())
jest.mock('../commands/ocrGetText', () => jest.fn())
jest.mock('../commands/ocrWaitForTextDisplayed', () => jest.fn())
jest.mock('../commands/ocrSetValue', () => jest.fn())

const caps: WebDriver.Capabilities = {
  browserName: 'chrome',
  platformName: 'iOS',
  'appium:platformVersion': '14.2'
}

class DriverMock {
  [key: string]: any;

  constructor(isIOS:boolean) {
    this.addCommand = jest.fn().mockImplementation((name, fn) => {
      this[name] = fn
    })

    this.getWindowSize = jest.fn().mockReturnValue({ height: 400, width: 200 })
    this.isIOS = isIOS
    this.updateSettings = jest.fn()
  }
}

function getDriver(isIOS:boolean = true) {
  return new DriverMock(isIOS) as unknown as WebdriverIO.Browser
}

describe('wdio-ocr-service', () => {
  let isTesseractAvailableSpy: jest.SpyInstance

  beforeEach(() => {
    isTesseractAvailableSpy = jest.spyOn(Tesseract, 'isTesseractAvailable').mockResolvedValue(false)
  })

  afterEach(() => {
    isTesseractAvailableSpy.mockRestore()
  })

  describe('init', () => {
    it('should create the default ocr-folder', () => {
      fs.mkdirSync = jest.fn()
      new WdioOcrService()

      expect(fs.mkdirSync).toHaveBeenCalledWith(OCR_IMAGES_PATH, { 'recursive': true })

    })

    it('should create a provided ocr-folder', () => {
      fs.mkdirSync = jest.fn()
      const path = './foo'
      new WdioOcrService({ ocrImagesPath: path })

      expect(fs.mkdirSync).toHaveBeenCalledWith(path, { 'recursive': true })

    })
  })

  describe('before hook', () => {
    it('should register all commands', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())

      expect(service['_driver']?.getWindowSize).toHaveBeenCalled()
      expect(service['_driver']?.updateSettings).toHaveBeenCalled()
      expect(isTesseractAvailableSpy).toHaveBeenCalled()
      expect(service['_driver']?.addCommand).toBeCalledTimes(5)

      await service.before(caps, [], getDriver(false))
      expect(service['_driver']?.updateSettings).not.toHaveBeenCalled()
    })

    it('should be able to call ocrGetElementPositionByText with no options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrGetElementPositionByText('foo')

      expect(OcrGetElementPositionByText).toHaveBeenCalledWithSnapshot()
    })

    it('should be able to call ocrGetElementPositionByText with all options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrGetElementPositionByText(
        'foo',
        {
          androidRectangles: { foo: 'androidRectangles' },
          iOSRectangles: { foo: 'iOSRectangles' },
          reuseOcr: true
        }
      )

      expect(OcrGetElementPositionByText).toHaveBeenCalledWithSnapshot()
    })

    it('should be able to call ocrClickOnText with no options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrClickOnText('click')

      expect(OcrClickOnText).toHaveBeenCalledWithSnapshot()
    })

    it('should be able to call ocrClickOnText with all options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrClickOnText(
        'click',
        {
          androidRectangles: { foo: 'androidRectangles' },
          iOSRectangles: { foo: 'iOSRectangles' },
          reuseOcr: true
        }
      )

      expect(OcrClickOnText).toHaveBeenCalledWithSnapshot()
    })

    it('should be able to call ocrGetText with no options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrGetText()

      expect(OcrGetText).toHaveBeenCalledWithSnapshot()
    })

    it('should be able to call ocrGetText with all options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrGetText(
        {
          androidRectangles: { foo: 'androidRectangles' },
          iOSRectangles: { foo: 'iOSRectangles' },
          reuseOcr: true
        }
      )

      expect(OcrGetText).toHaveBeenCalledWithSnapshot()
    })

    it('should be able to call ocrWaitForTextDisplayed with no options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrWaitForTextDisplayed('ocrWaitForTextDisplayed')

      expect(OcrWaitForTextDisplayed).toHaveBeenCalledWithSnapshot()
    })

    it('should be able to call ocrWaitForTextDisplayed with all options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrWaitForTextDisplayed(
        'ocrWaitForTextDisplayed',
        {
          androidRectangles: { foo: 'androidRectangles' },
          iOSRectangles: { foo: 'iOSRectangles' },
          reuseOcr: true,
          timeout: 15,
          timeoutMsg: 'timeoutMsg',
        }
      )

      expect(OcrWaitForTextDisplayed).toHaveBeenCalledWithSnapshot()
    })

    it('should be able to call ocrSetValue with no options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrSetValue('ocrSetValue-selector', 'ocrSetValue')

      expect(OcrSetValue).toHaveBeenCalledWithSnapshot()
    })

    it('should be able to call ocrSetValue with all options', async () => {
      const service = new WdioOcrService()

      await service.before(caps, [], getDriver())
      // @ts-ignore
      await service['_driver']?.ocrSetValue(
        'ocrSetValue-selector',
        'ocrSetValue',
        {
          androidRectangles: { foo: 'androidRectangles' },
          iOSRectangles: { foo: 'iOSRectangles' },
          reuseOcr: true
        }
      )

      expect(OcrSetValue).toHaveBeenCalledWithSnapshot()
    })
  })
})
