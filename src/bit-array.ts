export class BitArray {
  private bits: Uint8Array
  private length: number

  constructor(size: number) {
    this.length = size
    this.bits = new Uint8Array(Math.ceil(size / 8))
  }

  // Helper function to calculate byte index and bit position
  private getByteAndBitPosition(index: number): {
    byteIndex: number
    bitPosition: number
  } {
    if (index < 0 || index >= this.length) {
      throw new RangeError('Index out of bounds')
    }
    const byteIndex = Math.floor(index / 8)
    const bitPosition = index % 8
    return { byteIndex, bitPosition }
  }

  set(index: number): void {
    const { byteIndex, bitPosition } = this.getByteAndBitPosition(index)
    this.bits[byteIndex] |= 1 << bitPosition
  }

  clear(index: number): void {
    const { byteIndex, bitPosition } = this.getByteAndBitPosition(index)
    this.bits[byteIndex] &= ~(1 << bitPosition)
  }

  has(index: number): boolean {
    const { byteIndex, bitPosition } = this.getByteAndBitPosition(index)
    return (this.bits[byteIndex] & (1 << bitPosition)) !== 0
  }

  size(): number {
    return this.length
  }
}
