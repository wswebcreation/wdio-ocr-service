import Fuse from 'fuse.js'
import {fuzzyFind} from '../../utils/fuzzySearch'

jest.mock('fuse.js')

describe('utils - fuzzySearch', () => {
  it('should find data when only 1 result is given back with a 100% match', () => {
    (Fuse as unknown as jest.Mock).mockImplementation(() => ({
      search: jest.fn().mockReturnValue([
        {
          item: {
            text: 'Username',
            originalPosition: {left: 1, top: 2, right: 3, bottom: 4},
            dprPosition: {left: 1, top: 2, right: 3, bottom: 4},
          },
          refIndex: 0,
          score: 2.220446049250313e-16
        },
      ])
    }))

    const options = {
      textArray: [
        {
          text: 'Username',
          originalPosition: {left: 1, top: 2, right: 3, bottom: 4},
          dprPosition: {left: 1, top: 2, right: 3, bottom: 4},
        },
      ],
      pattern: 'Username',
    }

    expect(fuzzyFind(options)).toMatchSnapshot()
    expect(Fuse).toHaveBeenCalledWithSnapshot()
  })

  it('should find data when multiple results are given back', () => {
    (Fuse as unknown as jest.Mock).mockImplementation(() => ({
      search: jest.fn().mockReturnValue([
        {
          item: {
            text: 'Username',
            originalPosition: {left: 1, top: 2, right: 3, bottom: 4},
            dprPosition: {left: 1, top: 2, right: 3, bottom: 4},
          },
          refIndex: 0,
          score: 2.220446049250313e-16
        },
        {
          item: {
            text: 'The currently accepted usernames for',
            originalPosition: {left: 1, top: 2, right: 3, bottom: 4},
            dprPosition: {left: 1, top: 2, right: 3, bottom: 4},
          },
          refIndex: 5,
          score: 0.5184326474378735
        },
      ])
    }))

    const options = {
      textArray: [
        {
          text: 'Username',
          originalPosition: {left: 1, top: 2, right: 3, bottom: 4},
          dprPosition: {left: 1, top: 2, right: 3, bottom: 4},
        },
        {
          text: 'Password',
          originalPosition: {left: 1, top: 2, right: 3, bottom: 4},
          dprPosition: {left: 1, top: 2, right: 3, bottom: 4},
        },
        {
          text: 'LOGIN',
          originalPosition: {left: 1, top: 2, right: 3, bottom: 4},
          dprPosition: {left: 1, top: 2, right: 3, bottom: 4},
        },
      ],
      pattern: 'Username',
    }

    expect(fuzzyFind(options)).toMatchSnapshot()
    expect(Fuse).toHaveBeenCalledWithSnapshot()
  })
})
