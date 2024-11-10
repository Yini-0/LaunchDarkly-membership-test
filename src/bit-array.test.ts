import { beforeEach, describe, expect, test } from 'vitest'
import { BitArray } from './bit-array'

describe('bit array', () => {
  let bitArray = new BitArray(0)

  beforeEach(() => {
    bitArray = new BitArray(1_000_000)
  })

  test('can hold 1 millions items', () => {
    const bitArray = new BitArray(1_000_000)
    expect(bitArray.size()).toBe(1_000_000)
  })

  test('throw range error when set over max index', () => {
    expect(() => bitArray.set(1_000_001)).toThrow('Index out of bounds')
  })

  test('set at the last index', () => {
    bitArray.set(999_999)
    expect(bitArray.has(999_999)).toBe(true)
  })

  test('set 1st index', () => {
    bitArray.set(0)
    expect(bitArray.has(0)).toBe(true)
  })
})
