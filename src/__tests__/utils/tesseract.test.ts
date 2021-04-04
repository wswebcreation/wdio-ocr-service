import ChildProcess from 'child_process'
import TesseractJS from 'tesseract.js'
// @ts-ignore
import TesseractSystem from 'node-tesseract-ocr'
import { getNodeOcrData, getSystemOcrData, isTesseractAvailable } from '../../utils/tesseract'
import * as Utils from '../../utils/index'
import { TESSERACT_NODEJS, TESSERACT_SYSTEM } from './__mocks__/mocks'

jest.mock('child_process')
jest.mock('tesseract.js')
jest.mock('node-tesseract-ocr')

describe('utils - tesseract', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('isTesseractAvailable', () => {
    it('should return true with a default call', () => {
      (ChildProcess.execSync as unknown as jest.Mock).mockReturnValue(undefined)

      expect(isTesseractAvailable()).toEqual(true)
      expect(ChildProcess.execSync).toHaveBeenCalledWithSnapshot()
    })

    it('should return false with a default non existing custom command', () => {
      (ChildProcess.execSync as unknown as jest.Mock).mockImplementation(() => {
        throw new Error()
      })

      expect(isTesseractAvailable('custom-tesseract-arg')).toEqual(false)
      expect(ChildProcess.execSync).toHaveBeenCalledWithSnapshot()
    })
  })

  describe('getNodeOcrData', () => {
    let parseAttributeStringSpy: jest.SpyInstance
    const worker = TesseractJS.createWorker

    beforeEach(() => {
      parseAttributeStringSpy = jest.spyOn(Utils, 'parseAttributeString').mockReturnValue({
        bbox: { left: 83, top: 326, right: 248, bottom: 352 },
        wc: 0.9,
      })
    })

    it('should throw an error when incorrect data is returned from the `worker.recognize` method', async () => {
      (worker as unknown as jest.Mock).mockImplementation(() => ({
        load: jest.fn(),
        loadLanguage: jest.fn(),
        initialize: jest.fn(),
        setParameters: jest.fn(),
        recognize: jest.fn().mockResolvedValue('<div>'),
        terminate: jest.fn(),
      }))

      try {
        await getNodeOcrData({ filePath: 'path/file.png' })
        // Don't expect it to hit this
        expect(true).toBe(false)
      } catch (e) {
        expect(e.toString())
          .toBe(
            'Error: An error happened when parsing the getNodeOcrData, see: TypeError: Cannot read property ' +
            "'text' of undefined"
          )
      }
    })

    it('should throw an error when incorrect data is parsed in parseString', async () => {
      (worker as unknown as jest.Mock).mockImplementation(() => ({
        load: jest.fn(),
        loadLanguage: jest.fn(),
        initialize: jest.fn(),
        setParameters: jest.fn(),
        recognize: jest.fn().mockResolvedValue({ data: { text: '', hocr: false } }),
        terminate: jest.fn(),
      }))

      try {
        await getNodeOcrData({ filePath: 'path/file.png' })
        // Don't expect it to hit this
        expect(true).toBe(false)
      } catch (e) {
        expect(e.toString())
          .toContain(
            'Error: An error happened when parsing the getNodeOcrData, see: Error [ERR_UNHANDLED_ERROR]: ' +
            'Unhandled error. (Error: An error happened when parsing the getNodeOcrData, see: Error: Non-whitespace ' +
            'before first tag.'
          )
      }
    })

    it('should throw an error when no text was found', async () => {
      (worker as unknown as jest.Mock).mockImplementation(() => ({
        load: jest.fn(),
        loadLanguage: jest.fn(),
        initialize: jest.fn(),
        setParameters: jest.fn(),
        recognize: jest.fn().mockResolvedValue({ data: { text: '', hocr: '<div></div>' } }),
        terminate: jest.fn(),
      }))

      try {
        await getNodeOcrData({ filePath: 'path/file.png' })
        // Don't expect it to hit this
        expect(true).toBe(false)
      } catch (e) {
        expect(e.toString())
          .toContain('Error: An error happened when parsing the getNodeOcrData, see: Error: No text was ' +
            'found for the OCR, please verify the stored image.'
          )
      }
    })

    it('should be able to parse the node OCR data', async () => {
      (worker as unknown as jest.Mock).mockImplementation(() => ({
        load: jest.fn(),
        loadLanguage: jest.fn(),
        initialize: jest.fn(),
        setParameters: jest.fn(),
        recognize: jest.fn().mockResolvedValue(TESSERACT_NODEJS),
        terminate: jest.fn(),
      }))

      expect(await getNodeOcrData({ filePath: 'path/file.png' })).toMatchSnapshot()
      expect(parseAttributeStringSpy).toHaveBeenCalledTimes(10)
    })
  })

  describe('getSystemOcrData', () => {
    it('should throw an error when incorrect data is returned from the `recognize` method', async () => {
      (TesseractSystem.recognize as unknown as jest.Mock).mockResolvedValue('')

      try {
        await getSystemOcrData({ filePath: 'path/file.png' })
        // Don't expect it to hit this
        expect(true).toBe(false)
      } catch (e) {
        expect(e.toString())
          .toContain('Error: An error happened when parsing the getSystemOcrData, see: Error ' +
            "[ERR_UNHANDLED_ERROR]: Unhandled error. (TypeError: Cannot read property 'alto' of null"
          )
      }
    })

    it('should throw an error when incorrect data is parsed in parseString', async () => {
      (TesseractSystem.recognize as unknown as jest.Mock).mockResolvedValue(true)

      try {
        await getSystemOcrData({ filePath: 'path/file.png' })
        // Don't expect it to hit this
        expect(true).toBe(false)
      } catch (e) {
        expect(e.toString())
          .toContain('Error: An error happened when parsing the getSystemOcrData, see: Error ' +
            '[ERR_UNHANDLED_ERROR]: Unhandled error. (Error: An error happened when parsing the getSystemOcrData, ' +
            'see: Error: Non-whitespace before first tag.'
          )
      }
    })

    it('should throw an error when no text was found', async () => {
      (TesseractSystem.recognize as unknown as jest.Mock)
        .mockResolvedValue('<alto><Layout><Page><PrintSpace></PrintSpace></Page></Layout></alto>')

      try {
        await getSystemOcrData({ filePath: 'path/file.png' })
        // Don't expect it to hit this
        expect(true).toBe(false)
      } catch (e) {
        expect(e.toString())
          .toContain(
            'Error: An error happened when parsing the getSystemOcrData, see: Error: No text was found for ' +
            'the OCR, please verify the stored image.'
          )
      }
    })

    it('should be able to parse the system OCR data', async ()=>{
      (TesseractSystem.recognize as unknown as jest.Mock).mockResolvedValue(TESSERACT_SYSTEM)

      expect(await getSystemOcrData({ filePath: 'path/file.png' })).toMatchSnapshot()
    })
  })
})
