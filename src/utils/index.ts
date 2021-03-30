import {
  ClickPoint,
  DetermineClickPointOptions,
  Rectangles,
  ScreenSize,
} from '../typings/types'

/**
 * Get the size of a screenshot in pixels
 */
export function getScreenshotSize(screenshot: string): ScreenSize {
  return {
    height: Buffer.from(screenshot, 'base64').readUInt32BE(20),
    width: Buffer.from(screenshot, 'base64').readUInt32BE(16),
  }
}

export function getDprPositions(values: Rectangles, dpr: number): Rectangles {
  Object.keys({ ...values }).map((value: string) => {
    // @ts-ignore
    values[value] /= dpr
  })

  return values
}

/**
 * Determine the click point
 */
export function determineClickPoint(options: DetermineClickPointOptions): ClickPoint {
  const { rectangles: { left, right, top, bottom } } = options
  const x = left + (right - left) / 2
  const y = top + (bottom - top) / 2

  return { x, y }
}
