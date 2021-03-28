import type { Services } from '@wdio/types'
import { mkdirSync } from 'fs'
import ocrElementPositionByText from './commands/ocrGetElementPositionByText'
import ocrGetText from './commands/ocrGetText'
import ocrClickOnText from './commands/ocrClickOnText'
import ocrSetValue from './commands/ocrSetValue'
import {
  ClickOnTextOptions,
  ElementPositionByText,
  GetTextOptions,
  OcrServiceConfig,
  ScreenSize,
  SetValueOptions,
  WaitForTextDisplayedOptions,
} from './types/types'
import { DEFAULT_OPTIONS } from './utils/constants'
import ocrWaitForTextDisplayed from './commands/ocrWaitForTextDisplayed'
import { isTesseractAvailable } from './utils/tesseract'

export default class OcrService implements Services.ServiceInstance {
  private _options: OcrServiceConfig;

  constructor(options: OcrServiceConfig) {
    this._options = { ...DEFAULT_OPTIONS, ...options }
    const ocrImagesPath =
      this._options.ocrImagesPath || DEFAULT_OPTIONS.ocrImagesPath

    mkdirSync(ocrImagesPath, { recursive: true })
  }

  async before() {
    if (driver.isIOS) {
      // Lower the quality so it will have better results for OCR on iOS
      await driver.updateSettings({ screenshotQuality: 2 })
    }
    const screenSize: ScreenSize = await driver.getWindowSize()
    const tesseractAvailable = await isTesseractAvailable()

    driver.addCommand(
      'ocrGetElementPositionByText',
      (selector:string, options: ElementPositionByText={}) => {
        const { reuseOcr } = options

        return ocrElementPositionByText({
          isTesseractAvailable: tesseractAvailable,
          reuseOcr: !!reuseOcr,
          ocrImagesPath: this._options.ocrImagesPath,
          screenSize,
          text: selector,
        })
      }
    )

    driver.addCommand(
      'ocrClickOnText',
      (selector: string, options: ClickOnTextOptions = {}) => {
        const { reuseOcr } = options

        return ocrClickOnText({
          isTesseractAvailable: tesseractAvailable,
          reuseOcr: !!reuseOcr,
          ocrImagesPath: this._options.ocrImagesPath,
          screenSize,
          text: selector,
        })
      }
    )

    driver.addCommand('ocrGetText', (options: GetTextOptions = {}) => {
      const { reuseOcr } = options

      return ocrGetText({
        isTesseractAvailable: tesseractAvailable,
        reuseOcr: !!reuseOcr,
        ocrImagesPath: this._options.ocrImagesPath,
        screenSize,
      })
    })

    driver.addCommand(
      'ocrWaitForTextDisplayed',
      (selector: string, options: WaitForTextDisplayedOptions = {}) => {
        const { timeout, timeoutMsg } = options

        return ocrWaitForTextDisplayed({
          isTesseractAvailable: tesseractAvailable,
          ocrImagesPath: this._options.ocrImagesPath,
          screenSize,
          text: selector,
          timeout,
          timeoutMsg,
        })
      }
    )

    driver.addCommand(
      'ocrSetValue',
      (selector: string, value: string, options: SetValueOptions = {}) => {
        const { reuseOcr } = options

        return ocrSetValue({
          isTesseractAvailable: tesseractAvailable,
          ocrImagesPath: this._options.ocrImagesPath,
          reuseOcr: !!reuseOcr,
          screenSize,
          text: selector,
          value,
        })
      }
    )
  }
}
