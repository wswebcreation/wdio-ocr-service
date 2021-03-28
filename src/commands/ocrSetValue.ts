import { ScreenSize } from '../types/types'
import ocrKeys from '../utils/ocrKeys'
import ocrClickOnText from './ocrClickOnText'

interface OcrSetValueOptions {
  isTesseractAvailable: boolean;
  reuseOcr: boolean;
  ocrImagesPath: string;
  screenSize: ScreenSize;
  text: string;
  value: string;
}

export default async function ocrSetValue(options: OcrSetValueOptions): Promise<void> {
  const {
    isTesseractAvailable,
    reuseOcr,
    ocrImagesPath,
    screenSize,
    text,
    value,
  } = options

  await ocrClickOnText({
    isTesseractAvailable,
    ocrImagesPath,
    reuseOcr,
    screenSize,
    text,
  })
  await driver.waitUntil(async () => driver.isKeyboardShown(), {
    timeout: 15000,
    timeoutMsg: 'Keyboard was not hidden',
  })
  await ocrKeys(value)
  await driver.hideKeyboard()
  await driver.waitUntil(async () => !(await driver.isKeyboardShown()), {
    timeout: 15000,
    timeoutMsg: 'Keyboard is still shown',
  })
}
