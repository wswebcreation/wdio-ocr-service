import ocrWaitForTextDisplayed from '../../commands/ocrWaitForTextDisplayed'
import ocrGetText from '../../commands/ocrGetText'

jest.mock('../../commands/ocrGetText', ()=> jest.fn().mockResolvedValue(''))

describe('ocrWaitForTextDisplayed', () => {
  it('should be able to wait for a text to be displayed', async () => {
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
      text: 'text',
    }
    const globalAny:any = global
    globalAny.driver = {
      waitUntil: jest.fn().mockImplementation((fn)=>fn()),
    }

    await ocrWaitForTextDisplayed(options)

    expect(await globalAny.driver.waitUntil).toHaveBeenCalledTimes(1)
    expect(await ocrGetText).toHaveBeenCalledWithSnapshot()
  })
})
