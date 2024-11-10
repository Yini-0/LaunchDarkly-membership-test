import { describe, expect, test } from 'vitest'
import { generateDataArray, writeDataToFile } from './user-gen'

describe('user gen', () => {
  const numOfUsers = 50_000
  test(`generate ${numOfUsers} mock users`, () => {
    const dataArray = generateDataArray(numOfUsers)
    writeDataToFile('./src/user.ts', dataArray)
    expect(1).toBe(1)
  })
})
