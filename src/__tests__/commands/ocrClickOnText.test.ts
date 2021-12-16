import ocrClickOnText from '../../commands/ocrClickOnText'
import * as OcrGetElementPositionByText from '../../commands/ocrGetElementPositionByText'

jest.mock('../../commands/ocrGetElementPositionByText', ()=>jest.fn())

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
      tesseractLang: 'deu',
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

  it('should be able to click on text with a different clickDuration', async () => {
    const globalAny:any = global
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      tesseractLang: 'nld',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
      text: 'text',
      clickDuration: 250
    }

    globalAny.driver = {
      performActions: jest.fn(),
    }

    await ocrClickOnText(options)

    expect(globalAny.driver.performActions).toHaveBeenCalledWithSnapshot()
  })

  it('should be able to click on text without providing a language', async () => {
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

    expect(globalAny.driver.performActions).toHaveBeenCalledWithSnapshot()
  })

  it('should be able to click on text with providing a language', async () => {
    const globalAny:any = global
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      tesseractLang: 'nld',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
      text: 'text',
    }

    globalAny.driver = {
      performActions: jest.fn(),
    }

    await ocrClickOnText(options)

    expect(globalAny.driver.performActions).toHaveBeenCalledWithSnapshot()
  })
})
