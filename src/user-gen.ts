import * as fs from 'fs'

function generateUUID() {
  return '10000000-1000-4000-8000-100000000000'.replace(
    /[018]/g,
    (c: string): string => {
      const randomValue: number =
        crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4))
      return (parseInt(c) ^ randomValue).toString(16)
    }
  )
}

export function generateDataArray(numEntries: number) {
  const data: { id: string; idx: number }[] = []

  for (let i = 0; i < numEntries; i++) {
    const guid = generateUUID()
    data.push({ id: guid, idx: i })
  }

  return { user: data }
}

export function writeDataToFile(
  fileName: string,
  data: { user: { id: string; idx: number }[] }
): void {
  const fileContent = `export const data = ${JSON.stringify(data, null, 2)};\n`

  fs.writeFile(fileName, fileContent, (err: unknown) => {
    if (err) {
      console.error('Error writing to file:', err)
    } else {
      console.log(`Data successfully written to ${fileName}`)
    }
  })
}
