<script setup lang="ts">
import { Note, Scale } from 'tonal'
import { capitalize, ref, type Ref } from 'vue'
import guitarChords from '@/assets/guitarChords.json'
import type { IChord } from './assets/guitarChordsInterface'
import PianoKeyboard from './components/PianoKeyboard.vue'
import GuitarDiagram from './components/GuitarDiagram.vue'
import ToggleCheckbox from './components/ToggleCheckbox.vue'

const guitarChordsToggle = ref(false)
const fullChordsToggle = ref(false)

// TONAL
const chordNotes = ref<null | string[]>(null)

// DB-CHORDS

type ChordRoot = keyof typeof guitarChords.chords

const enharmonics: Record<string, string> = {
  'G#': 'Ab',
  'D#': 'Eb',
  'A#': 'Bb',
  Db: 'C#',
}

const fullChords = ref<IChord[]>([])

const chords: Ref<IChord[]> = ref([])

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const scaleSuffix = ref<string>('major')

const setNote = (note: string) => {
  const scale = Scale.get(note + ' ' + scaleSuffix.value)
  const scaleNotes = scale.notes

  let scaleChords: scaleChords
  let progression

  if (scaleSuffix.value === 'minor') {
    scaleChords = minorScaleChords(scaleNotes)
    progression = minorProgression(scaleChords)
  } else {
    scaleChords = majorScaleChords(scaleNotes)
    progression = majorProgression(scaleChords)
  }

  chordNotes.value = progression

  notesToChords(chordNotes.value)
  fullChords.value = chordsToIChords(scaleChords)
}

interface scaleChords {
  chordI: string
  chordII: string
  chordIII: string
  chordIV: string
  chordV: string
  chordVI: string
  chordVII: string
}

const majorScaleChords = (scaleNotes: string[]): scaleChords => {
  // const CHORD_I = scaleNotes[0] + ' major'
  // const CHORD_II = scaleNotes[1] + ' minor'
  // const CHORD_III = scaleNotes[2] + ' minor'
  // const CHORD_IV = scaleNotes[3] + ' major'
  // const CHORD_V = scaleNotes[4] + ' major'
  // const CHORD_VI = scaleNotes[5] + ' minor'

  const scaleChords: scaleChords = {
    chordI: scaleNotes[0] + ' major',
    chordII: scaleNotes[1] + ' minor',
    chordIII: scaleNotes[2] + ' minor',
    chordIV: scaleNotes[3] + ' major',
    chordV: scaleNotes[4] + ' major',
    chordVI: scaleNotes[5] + ' minor',
    chordVII: scaleNotes[6] + ' dim',
  }

  return scaleChords
}

// major progression generator I x x IV/V
const majorProgression = (scaleChords: scaleChords) => {
  // final chord
  const finalChords = [scaleChords.chordIV, scaleChords.chordV]
  const randomF = finalChords[Math.floor(Math.random() * finalChords.length)]

  // middle chords
  const middleChords = [scaleChords.chordII, scaleChords.chordIII, scaleChords.chordVI]

  const randomM1 = middleChords[Math.floor(Math.random() * middleChords.length)]
  const randomM2 = middleChords[Math.floor(Math.random() * middleChords.length)]

  const progression = [scaleChords.chordI, randomM1, randomM2, randomF]
  return progression
}

const minorScaleChords = (scaleNotes: string[]): scaleChords => {
  const scaleChords: scaleChords = {
    chordI: scaleNotes[0] + ' minor',
    chordII: scaleNotes[1] + ' dim',
    chordIII: scaleNotes[2] + ' major',
    chordIV: scaleNotes[3] + ' minor',
    chordV: scaleNotes[4] + ' minor',
    chordVI: scaleNotes[5] + ' major',
    chordVII: scaleNotes[6] + ' major',
  }

  return scaleChords
}

// minor progression generator i/VI x x x
const minorProgression = (scaleNotes: scaleChords) => {
  // start chord
  const startChords = [scaleNotes.chordI, scaleNotes.chordVI]
  const randomStart = startChords[Math.floor(Math.random() * startChords.length)]

  // final chord
  const CHORD_V = scaleNotes.chordV.split(' ')[0] + ' major' // not in scale but can fit well and make tension
  const scaleChords = startChords.concat([
    scaleNotes.chordIII,
    scaleNotes.chordIV,
    scaleNotes.chordV,
    CHORD_V,
    scaleNotes.chordVII,
  ])
  const randomChord1 = scaleChords[Math.floor(Math.random() * scaleChords.length)]
  const randomChord2 = scaleChords[Math.floor(Math.random() * scaleChords.length)]
  const randomChord3 = scaleChords[Math.floor(Math.random() * scaleChords.length)]

  const progression = [randomStart, randomChord1, randomChord2, randomChord3]

  progression.forEach((cp, index) => {
    const chordQuantity = progression.filter((c) => c == cp).length
    if (chordQuantity > 2) {
      const scaleChordsReduced = scaleChords.filter((c) => c != cp)
      const rc = scaleChordsReduced[Math.floor(Math.random() * scaleChords.length)]
      progression[index] = rc
    }
  })

  return progression
}

const notesToChords = (notes: string[]) => {
  chords.value = []
  notes.forEach((note) => {
    let chordToChord = note.split(' ')[0]

    // adapt the chords to the ones are in the guitar-db
    chordToChord = Note.simplify(chordToChord)
    if (enharmonics[chordToChord]) {
      chordToChord = enharmonics[chordToChord]
    }

    if (chordToChord in guitarChords.chords) {
      // lot of variations of the chord G, Gm, Gdim...
      const chordData = guitarChords.chords[chordToChord as ChordRoot]

      // get the one we want
      const chord = chordData.filter((chord) => chord.suffix === note.split(' ')[1])[0]

      chords.value.push(chord as IChord)
    }
  })
}

const chordsToIChords = (notes: scaleChords) => {
  const ichords: IChord[] = []
  Object.keys(notes).forEach((note) => {
    note = notes[note as keyof scaleChords]

    let chordToChord = note.split(' ')[0]

    // adapt the chords to the ones are in the guitar-db
    chordToChord = Note.simplify(chordToChord)
    if (enharmonics[chordToChord]) {
      chordToChord = enharmonics[chordToChord]
    }

    if (chordToChord in guitarChords.chords) {
      // lot of variations of the chord G, Gm, Gdim...
      const chordData = guitarChords.chords[chordToChord as ChordRoot]

      // get the one we want
      const chord = chordData.filter((chord) => chord.suffix === note.split(' ')[1])[0]

      ichords.push(chord as IChord)
    }
  })
  return ichords
}
</script>

<template>
  <main class="w-full h-full flex flex-col items-center bg-gray-950 p-10">
    <h1 class="text-4xl mb-10">CHORD PROGESSION MAKER</h1>
    <div class="flex gap-20 items-center p-10 justify-center h-full w-full">
      <div class="flex flex-col gap-5">
        <div class="border p-2">
          <h2 class="mb-2">Select a scale:</h2>
          <div class="buttons flex w-180 justify-between">
            <button @click="() => (chords = [])">CLEAR</button>
            <button v-for="note in notes" @click="setNote(note)">
              {{ scaleSuffix == 'major' ? note : note.toLowerCase() }}
            </button>
            <div class="flex flex-col gap-5">
              <ToggleCheckbox
                :label="capitalize(scaleSuffix)"
                @click="(toggle) => (toggle ? (scaleSuffix = 'minor') : (scaleSuffix = 'major'))"
              />
              <ToggleCheckbox
                label="Guitar Chords"
                @click="(toggle) => (guitarChordsToggle = toggle)"
              />
              <ToggleCheckbox
                label="Full Chords"
                @click="(toggle) => (fullChordsToggle = toggle)"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="chords && chords.length > 0"
        class="flex flex-col text-center items-center justify-center gap-4"
      >
        <PianoKeyboard
          :chords="chords"
          :fullChords="fullChords"
          :fullChordsToggle="fullChordsToggle"
        />
        <GuitarDiagram
          v-if="guitarChordsToggle"
          :chords="chords"
          :fullChords="fullChords"
          :fullChordsToggle="fullChordsToggle"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
