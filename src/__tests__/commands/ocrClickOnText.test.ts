import ocrClickOnText from '../../commands/ocrClickOnText'
import * as OcrGetElementPositionByText from '../../commands/ocrGetElementPositionByText'

describe('ocrClickOnText', () => {
  it('should be able to click on text with the correct arguments', async () => {
    const ocrGetElementPositionByTextSpy = jest.spyOn(OcrGetElementPositionByText, 'default')
      .mockResolvedValue({
        searchValue: '',
        matchedString: '',
        originalPosition: { top: 1, bottom: 2, left: 3, right: 4 },
        dprPosition: { top: 1, bottom: 2, left: 3, right: 4 },
        score: 1,
      })
    const globalAny:any = global
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
      text: 'text',
    }

    globalAny.driver = {
      performActions: jest.fn(),
    }

    await ocrClickOnText(options)

    expect(ocrGetElementPositionByTextSpy).toHaveBeenCalledTimes(1)
    expect(globalAny.driver.performActions).toHaveBeenCalledWithSnapshot()
  })
})
