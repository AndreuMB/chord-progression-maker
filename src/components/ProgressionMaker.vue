<script setup lang="ts">
import { Note, Scale } from 'tonal'
import { ref } from 'vue'
import guitarChords from '@/assets/guitarChords.json'
import type { IChord } from '@/assets/guitarChordsInterface'
import PianoKeyboard from '@/components/PianoKeyboard.vue'
import GuitarDiagram from '@/components/GuitarDiagram.vue'
import ToggleCheckbox from '@/components/ToggleCheckbox.vue'
import NoteButton from './NoteButton.vue'

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

const chords = ref<IChord[]>([])

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const notesGroup = [['C', 'C#'], ['D', 'D#'], ['E'], ['F', 'F#'], ['G', 'G#'], ['A', 'A#'], ['B']]

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

  // left chords
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
  <main
    class="h-dvh w-dvw flex not-lg:flex-col items-center bg-secondary p-4 sm:p-12 gap-2 sm:gap-10"
  >
    <!-- options -->
    <div
      class="flex lg:flex-col sm:flex-row flex-col gap-2 lg:mr-10 not-lg:w-full lg:min-w-40 justify-around"
    >
      <!-- scales -->
      <div class="flex flex-col gap-2 border p-2 justify-center rounded w-full">
        <!-- not-lg:max-w-100 -->
        <div class="buttons flex lg:flex-col not-lg:flex-wrap justify-around gap-1 h-full">
          <button class="bg-terciary! w-full" @click="() => (chords = [])">
            <i class="pi pi-eraser"></i>
          </button>
          <div class="flex gap-1 w-full justify-around lg:flex-col">
            <div
              v-for="noteGroup in notesGroup"
              class="w-full flex justify-around gap-1 not-lg:flex-col"
            >
              <NoteButton
                :label="note"
                v-for="note in noteGroup"
                @click="setNote(note)"
                class="h-full w-full"
              />
            </div>
          </div>
          <select
            class="text-secondary bg-primary rounded p-1 text-center w-full"
            v-model="scaleSuffix"
          >
            <option value="major" selected>M</option>
            <option value="minor">m</option>
          </select>
        </div>
      </div>
      <!-- toggles -->
      <div class="flex flex-col border p-2 gap-2 justify-around rounded">
        <ToggleCheckbox label="Guitar Chords" @click="(toggle) => (guitarChordsToggle = toggle)" />
        <ToggleCheckbox label="Full Chords" @click="(toggle) => (fullChordsToggle = toggle)" />
      </div>
    </div>

    <!-- keyboard and guitar -->

    <div
      v-if="chords && chords.length > 0"
      class="flex flex-col justify-center sm:gap-10 gap-5 border rounded sm:p-10 p-2 w-full m-auto"
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
    <div v-else class="flex flex-col text-center items-center justify-center text-2xl w-full">
      <div class="border rounded p-10"><p class="animate-pulse">SELECT A SCALE TO START</p></div>
    </div>
  </main>
</template>
