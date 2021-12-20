import ocrSetValue from '../../commands/ocrSetValue'
import ocrKeys from '../../utils/ocrKeys'
import ocrClickOnText from '../../commands/ocrClickOnText'

jest.mock('../../utils/ocrKeys', ()=> jest.fn())
jest.mock('../../commands/ocrClickOnText', ()=> jest.fn())

describe('ocrSetValue', () => {
  it('should be able to set a value', async () => {
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      language: 'eng',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
      text: 'text',
      value: 'value'
    }
    const globalAny:any = global
    globalAny.driver = {
      hideKeyboard: jest.fn(),
      waitUntil: jest.fn().mockImplementation((fn)=>fn()),
      isKeyboardShown: jest.fn(),
    }

    await ocrSetValue(options)

    expect(await ocrClickOnText).toHaveBeenCalledWithSnapshot()
    expect(await globalAny.driver.waitUntil).toHaveBeenCalledTimes(2)
    expect(await globalAny.driver.isKeyboardShown).toHaveBeenCalledTimes(2)
    expect(await ocrKeys).toHaveBeenCalledWith(options.value)
    expect(await globalAny.driver.hideKeyboard).toHaveBeenCalledTimes(1)
  })
})
