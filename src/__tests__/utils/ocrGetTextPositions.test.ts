import * as Utils from '../../utils/'
import ocrGetTextPositions from '../../utils/ocrGetTextPositions'

const ocrGetDataResponse = {
  'lines': [
    {
      'text': '  Username  ',
      'bbox': {
        'left': 83,
        'top': 326,
        'right': 248,
        'bottom': 352
      }
    },
    {
      'text': '  Password    ',
      'bbox': {
        'left': 83,
        'top': 454,
        'right': 237,
        'bottom': 480
      }
    },
    {
      'text': ' LOGIN ',
      'bbox': {
        'left': 359,
        'top': 669,
        'right': 467,
        'bottom': 695
      }
    }
  ],
  'words': [
    {
      'text': 'Username',
      'bbox': {
        'left': 83,
        'top': 326,
        'right': 248,
        'bottom': 352
      },
      'wc': 0.96
    },
    {
      'text': 'Password',
      'bbox': {
        'left': 83,
        'top': 454,
        'right': 237,
        'bottom': 480
      },
      'wc': 0.96
    },
    {
      'text': 'LOGIN',
      'bbox': {
        'left': 359,
        'top': 669,
        'right': 467,
        'bottom': 695
      },
      'wc': 0.95
    }
  ],
  'text': '\n\t\t\nUsername\n\nPassword\n\nLOGIN\n\f\t',
  'dpr': 2
}

jest.mock('../../utils/ocrGetData', () => jest.fn().mockImplementation(()=> ocrGetDataResponse))

describe('utils - ocrGetTextPositions', () => {
  it('', async () => {
    const getDprPositionsSpy = jest.spyOn(Utils, 'getDprPositions').mockReturnValue({
      'left': 1,
      'top': 2,
      'right': 3,
      'bottom': 4
    })
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'string',
      reuseOcr: true,
      screenSize: {
        width: 123,
        height: 123,
      }
    }

    expect(await ocrGetTextPositions(options)).toMatchSnapshot()
    expect(getDprPositionsSpy).toHaveBeenCalledTimes(3)
  })
})
