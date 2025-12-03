export interface QwertyOptions {
  id: string
  width: number
  height: number
  octaves?: number
  startNote?: string
  whiteKeyColour?: string
  blackKeyColour?: string
  activeColour?: string
}

declare global {
  class QwertyHancock {
    constructor(options: QwertyOptions)
    keyDown?: (note: string, frequency: number) => void
    keyUp?: (note: string, frequency: number) => void
  }
}