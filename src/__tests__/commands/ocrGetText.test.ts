import ocrGetText from '../../commands/ocrGetText'

jest.mock('../../utils/ocrGetData', ()=> jest.fn().mockResolvedValue({
  text: 'Username\n\nPassword\n\n \n\n \n\nLOGIN\n\n \n\n \n',
}))

describe('ocrGetText', () => {
  it('should be able to return text', async () => {
    const options = {
      isTesseractAvailable: true,
      ocrImagesPath: 'ocrImagesPath',
      language: 'eng',
      reuseOcr: true,
      screenSize: { width: 1, height: 2 },
    }

    expect(await ocrGetText(options)).toEqual('Username\nPassword\nLOGIN\n')
  })
})
