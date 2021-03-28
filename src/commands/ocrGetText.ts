import ocrGetData from '../utils/ocrGetData'
import { ScreenSize } from '../types/types'

interface OcrGetTextOptions {
  isTesseractAvailable: boolean;
  ocrImagesPath: string;
  reuseOcr: boolean;
  screenSize: ScreenSize;
}

export default async function ocrGetText(
  options: OcrGetTextOptions
): Promise<string> {
  const { text } = await ocrGetData(options)

  return text.replace(/\n\s*\n/g, '\n')
}
