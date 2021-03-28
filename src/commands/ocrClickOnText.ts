import ocrGetElementPositionByText from './ocrGetElementPositionByText'
import { determineClickPoint } from '../utils'
import { ScreenSize } from '../types/types'

interface OcrClickOnTextOptions {
  isTesseractAvailable: boolean;
  ocrImagesPath: string;
  reuseOcr: boolean;
  screenSize: ScreenSize;
  text: string;
}

export default async function ocrClickOnText(
  options: OcrClickOnTextOptions
): Promise<void> {
  const element = await ocrGetElementPositionByText(options)
  const { x, y } = determineClickPoint({
    rectangles: element.dprPosition,
  })
  await driver.performActions([
    {
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        {
          type: 'pointerMove',
          duration: 0,
          x,
          y,
        },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 500 },
        { type: 'pointerUp', button: 0 },
      ],
    },
  ])
}
