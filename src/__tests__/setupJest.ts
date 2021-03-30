import { toMatchSnapshot } from 'jest-snapshot'

expect.extend({
  toHaveBeenCalledWithSnapshot(received) {
    // @ts-ignore
    return toMatchSnapshot.call(this, received)
  },
})
