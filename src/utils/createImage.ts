// @ts-ignore
import { encodePNGToStream, decodePNGFromStream, make } from 'pureimage'
import { createReadStream, createWriteStream } from 'fs'
import { Rectangles } from '../types/types'

interface CreateImageData {
  filePath: string;
  height: number;
  lines: any;
  width: number;
}

export default async function createImage(data: CreateImageData) {
  const { filePath, height, lines, width } = data

  const image = await decodePNGFromStream(createReadStream(filePath))
  const canvasImage = make(width, height)
  const context = canvasImage.getContext('2d')
  context.drawImage(
    image,
    // Start at x/y pixels from the left and the top of the image (crop)
    0, 0,
    // 'Get' a (w * h) area from the source image (crop)
    width, height,
    // Place the result at 0, 0 in the canvas,
    0, 0,
    // With as width / height: 100 * 100 (scale)
    width, height
  )

  // Highlight all found texts
  lines.forEach(({ bbox }: { bbox: Rectangles }) => {
    const { right, bottom, left, top } = bbox
    context.beginPath()
    context.fillStyle = 'rgba(57, 170, 86, 0.5)'
    context.fillRect(left, top, right - left, bottom - top)
    context.lineWidth = 2
    context.strokeStyle = '#39aa56'
    context.rect(left, top, right - left, bottom - top)
    context.stroke()
  })

  await encodePNGToStream(canvasImage, createWriteStream(filePath))
}
