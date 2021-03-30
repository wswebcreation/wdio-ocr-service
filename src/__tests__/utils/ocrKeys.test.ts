import ocrKeys from '../../utils/ocrKeys'

const globalAny:any = global

describe('utils - ocrKeys', () => {
  it('should call the performActions with the correct keys', async () => {
    globalAny.driver = {
      performActions: jest.fn()
    }

    await ocrKeys('123')

    expect(globalAny.driver.performActions).toHaveBeenCalledWithSnapshot()
  })
})
