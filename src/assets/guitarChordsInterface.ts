export interface Root {
  main: Main
  tunings: Tunings
  keys: string[]
  suffixes: string[]
  chords: Chords
}

export interface Main {
  strings: number
  fretsOnChord: number
  name: string
  numberOfChords: number
}

export interface Tunings {
  standard: string[]
}

export interface Chords {
  C: IChord[]
  Csharp: IChord[]
  D: IChord[]
  Eb: IChord[]
  E: IChord[]
  F: IChord[]
  Fsharp: IChord[]
  G: IChord[]
  Ab: IChord[]
  A: IChord[]
  Bb: IChord[]
  B: IChord[]
}

export interface C {
  key: string
  suffix: string
  positions: Position[]
}

export interface IChord {
  key: string
  suffix: string
  positions: Position[]
}

export interface Position {
  frets: number[]
  fingers: number[]
  baseFret: number
  barres: number[]
  midi: number[]
  capo?: boolean
}

export interface Csharp {
  key: string
  suffix: string
  positions: Position2[]
}

export interface Position2 {
  frets: number[]
  fingers: number[]
  barres: number[]
  baseFret: number
  midi: number[]
  capo?: boolean
}

export interface D {
  key: string
  suffix: string
  positions: Position3[]
}

export interface Position3 {
  frets: number[]
  fingers: number[]
  baseFret: number
  barres: number[]
  midi: number[]
  capo?: boolean
}

export interface Eb {
  key: string
  suffix: string
  positions: Position4[]
}

export interface Position4 {
  frets: number[]
  fingers: number[]
  baseFret: number
  barres: number[]
  midi: number[]
  capo?: boolean
}

export interface E {
  key: string
  suffix: string
  positions: Position5[]
}

export interface Position5 {
  frets: number[]
  fingers: number[]
  baseFret: number
  barres: number[]
  midi: number[]
  capo?: boolean
}

export interface F {
  key: string
  suffix: string
  positions: Position6[]
}

export interface Position6 {
  frets: number[]
  fingers: number[]
  barres: number[]
  capo?: boolean
  baseFret: number
  midi: number[]
}

export interface Fsharp {
  key: string
  suffix: string
  positions: Position7[]
}

export interface Position7 {
  frets: number[]
  fingers: number[]
  barres: number[]
  capo?: boolean
  baseFret: number
  midi: number[]
}

export interface G {
  key: string
  suffix: string
  positions: Position8[]
}

export interface Position8 {
  frets: number[]
  fingers: number[]
  baseFret: number
  barres: number[]
  midi: number[]
  capo?: boolean
}

export interface Ab {
  key: string
  suffix: string
  positions: Position9[]
}

export interface Position9 {
  frets: number[]
  fingers: number[]
  barres: number[]
  capo?: boolean
  baseFret: number
  midi: number[]
}

export interface A {
  key: string
  suffix: string
  positions: Position10[]
}

export interface Position10 {
  frets: number[]
  fingers: number[]
  baseFret: number
  barres: number[]
  midi: number[]
  capo?: boolean
}

export interface Bb {
  key: string
  suffix: string
  positions: Position11[]
}

export interface Position11 {
  frets: number[]
  fingers: number[]
  barres: number[]
  capo?: boolean
  baseFret: number
  midi: number[]
}

export interface B {
  key: string
  suffix: string
  positions: Position12[]
}

export interface Position12 {
  frets: number[]
  fingers: number[]
  barres: number[]
  capo?: boolean
  baseFret: number
  midi: number[]
}
