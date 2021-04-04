import { determineClickPoint, getDprPositions, getScreenshotSize, parseAttributeString } from '../../utils'

describe('utils - index', () => {
  it('should be able to get the screenshot size with getScreenshotSize', () => {
    const base64Image = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjRweCIgaGVpZ2h0PSI' +
      '2NHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp' +
      '4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+TG9nbyBSZWd1bGFyPC90aXRsZT4KICAgIDxnIGlkPSJ' +
      'Mb2dvLVJlZ3VsYXIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICA' +
      'gICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNFQTU5MDYiIHg9IjAiIHk9IjAiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgcng9IjU' +
      'iPjwvcmVjdD4KICAgICAgICA8cGF0aCBkPSJNOCwxNiBMOCw0OCBMNiw0OCBMNiwxNiBMOCwxNiBaIE00MywxNiBDNTEuODM2NTU2LDE2IDU' +
      '5LDIzLjE2MzQ0NCA1OSwzMiBDNTksNDAuODM2NTU2IDUxLjgzNjU1Niw0OCA0Myw0OCBDMzQuMTYzNDQ0LDQ4IDI3LDQwLjgzNjU1NiAyNyw' +
      'zMiBDMjcsMjMuMTYzNDQ0IDM0LjE2MzQ0NCwxNiA0MywxNiBaIE0yNywxNiBMMTQuMTA2LDQ3Ljk5OTIwNzggTDExLjk5OSw0Ny45OTkyMDc' +
      '4IEwyNC44OTQsMTYgTDI3LDE2IFogTTQzLDE4IEMzNS4yNjgwMTM1LDE4IDI5LDI0LjI2ODAxMzUgMjksMzIgQzI5LDM5LjczMTk4NjUg' +
      'MzUuMjY4MDEzNSw0NiA0Myw0NiBDNTAuNzMxOTg2NSw0NiA1NywzOS43MzE5ODY1IDU3LDMyIEM1NywyNC4yNjgwMTM1IDUwLjczMTk4NjUs' +
      'MTggNDMsMTggWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg=='

    expect(getScreenshotSize(base64Image)).toEqual({ 'height': 1701733231, 'width': 774906400 })
  })

  it('should be able to determine the correct DRP positions with getDprPositions', () => {
    expect(getDprPositions(
      {
        top: 200,
        left: 300,
        right: 400,
        bottom: 500
      },
      2,
    ))
      .toEqual(
        {
          top: 100,
          left: 150,
          right: 200,
          bottom: 250
        }
      )
  })

  it('should be able to determine the correct click coordinates with determineClickPoint', () => {
    expect(determineClickPoint(
      {
        rectangles: {
          top: 200,
          left: 300,
          right: 400,
          bottom: 500
        },
      }
    ))
      .toEqual(
        {
          x: 350,
          y: 350,
        }
      )
  })

  describe(' - parseAttributeString', () => {
    it('should be able to parse data when no matching attributes are provided', () => {
      expect(parseAttributeString([''])).toMatchSnapshot()
    })

    it('should be able to parse data when bbox attributes are provided', () => {
      expect(parseAttributeString(['bbox 83 326 248 352'])).toMatchSnapshot()
    })

    it('should be able to parse data when x_wconf attributes are provided', () => {
      expect(parseAttributeString(['x_wconf 91'])).toMatchSnapshot()
    })

    it('should be able to parse data when both bbox and x_wconf attributes are provided', () => {
      expect(parseAttributeString(['', 'bbox 359 669 467 695', 'x_wconf 90'])).toMatchSnapshot()
    })
  })
})
