import { ScreenSize } from '../types/types'
import ocrGetText from './ocrGetText'

interface OcrWaitForTextDisplayedOptions {
  isTesseractAvailable: boolean;
  ocrImagesPath: string;
  screenSize: ScreenSize;
  text: string;
  timeout?: number;
  timeoutMsg?: string;
}

export default async function ocrWaitForTextDisplayed(
  options: OcrWaitForTextDisplayedOptions
) {
  const { timeout, timeoutMsg } = options

  return driver.waitUntil(
    async () => {
      const { isTesseractAvailable, ocrImagesPath, screenSize, text } = options

      return (
        await ocrGetText({
          isTesseractAvailable,
          ocrImagesPath,
          // Always use a clean OCR
          reuseOcr: false,
          screenSize,
        })
      ).includes(text)
    },
    {
      timeout: timeout || 180000,
      timeoutMsg:
        timeoutMsg ||
        `Could not find the text "${options.text}" within the requested time.`,
    }
  )
}
