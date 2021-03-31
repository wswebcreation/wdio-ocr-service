// @ts-ignore
import PureImage from 'pureimage'
import fs from 'fs'
import createImage from '../../utils/createImage'

jest.mock('fs')
jest.mock('pureimage')

interface ContextFunctionArguments {
  drawImageArgs?: string | number[];
  fillRectangleArgs?: string | number[];
  rectangleArgs?: string | number[];
}

const pureImageDecodePNGFromStream = PureImage.decodePNGFromStream
const pureImageEncodePNGToStream = PureImage.encodePNGToStream
const pureImageMake = PureImage.make
let contextFunctionArguments: ContextFunctionArguments[] = [];

describe('createImage', () => {
  beforeEach(() => {
    fs.createReadStream = jest.fn().mockReturnValue('createReadStream')
    fs.createWriteStream = jest.fn().mockReturnValue('createWriteStream')
    pureImageDecodePNGFromStream.mockResolvedValue('pureImageDecodePNGFromStream')
    pureImageEncodePNGToStream.mockResolvedValue('')
    pureImageMake.mockImplementation(() => ({
      getContext: jest.fn().mockImplementation(() => ({
        beginPath: jest.fn().mockImplementation(() => jest.fn()),
        drawImage: jest.fn().mockImplementation(
          (...drawImageArgs) => contextFunctionArguments.push({drawImageArgs})
        ),
        fillRect: jest.fn().mockImplementation(
          (...fillRectangleArgs) => contextFunctionArguments.push({fillRectangleArgs})
        ),
        rect: jest.fn().mockImplementation(
          (...rectangleArgs) => contextFunctionArguments.push({rectangleArgs})
        ),
        stroke: jest.fn().mockImplementation(() => jest.fn()),
      })),
    }))
  })

  afterEach(() => {
    contextFunctionArguments = [];
  })

  it('should call all internal methods with default options', async () => {
    const height = 1792
    const width = 828
    const options = {
      filePath: 'ocr-images/ios-1617168519503.png',
      height,
      width,
    }

    await createImage(options);

    expect(fs.createReadStream).toHaveBeenCalledTimes(1)
    expect(pureImageDecodePNGFromStream).toHaveBeenCalledTimes(1)
    expect(pureImageMake).toHaveBeenCalledTimes(1)
    expect(pureImageMake).toHaveBeenCalledWith(width, height)
    expect(contextFunctionArguments).toMatchSnapshot();
    expect(fs.createWriteStream).toHaveBeenCalledTimes(1)
  })

  it('should be able to crop an image when it is being drawn', async () => {
    const height = 1792
    const width = 828
    const options = {
      filePath: 'ocr-images/ios-1617168519503.png',
      height,
      width,
      top: 300,
      left: 70,
      right: 750,
      bottom: 745
    }

    await createImage(options);

    expect(contextFunctionArguments).toMatchSnapshot();
  })

  it('should be able to crop an image when it is being drawn where top is 0', async () => {
    const height = 1792
    const width = 828
    const options = {
      filePath: 'ocr-images/ios-1617168519503.png',
      height,
      width,
      top: 0,
      left: 0,
      right: 25,
      bottom: 1700
    }

    await createImage(options);

    expect(contextFunctionArguments).toMatchSnapshot();
  })

  it('should be able to draw the lines', async () => {
    const height = 1792
    const width = 828
    const options = {
      filePath: "ocr-images/ios-1617180757754.png",
      height,
      lines: [
        {
          text: 'Username',
          bbox: {
            left: 83,
            top: 326,
            right: 248,
            bottom: 352
          }
        },
        {
          text: 'Password',
          bbox: {
            left: 83,
            top: 454,
            right: 237,
            bottom: 480
          }
        },
        {
          text: 'LOGIN',
          bbox: {
            left: 359,
            top: 669,
            right: 467,
            bottom: 695
          }
        }
      ],
      width,
    }

    await createImage(options);

    expect(contextFunctionArguments).toMatchSnapshot();
  })
})
