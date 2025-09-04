<script setup lang="ts">
import { Shape, SVGuitarChord, type Finger } from 'svguitar'
import { Chord, Interval, Note, Scale } from 'tonal'
import { capitalize, onMounted, ref, useTemplateRef, type Ref } from 'vue'
import guitarChords from '@/assets/guitarChords.json'
import type { IChord } from './assets/guitarChordsInterface'
import PianoKeyboard from './components/PianoKeyboard.vue'
import GuitarChord from './components/GuitarChord.vue'
import GuitarDiagram from './components/GuitarDiagram.vue'

// TONAL

const chordNotes = ref<null | string[]>(null)

const scaleSuffixToggle = ref(false)

// DB-CHORDS

type ChordRoot = keyof typeof guitarChords.chords

const enharmonics: Record<string, string> = {
  'G#': 'Ab',
  'D#': 'Eb',
  'A#': 'Bb',
}

const chords: Ref<IChord[]> = ref([])

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const scaleSuffix = ref<string>('major')

const setNote = (note: string) => {
  // chords.value = []
  const scale = Scale.get(note + ' ' + scaleSuffix.value)
  const scaleNotes = scale.notes

  const progression = scaleSuffixToggle.value
    ? minorProgression(scaleNotes)
    : majorProgression(scaleNotes)

  chordNotes.value = progression

  notesToChords(chordNotes.value)
}

// major progression generator I x x IV/V
const majorProgression = (scaleNotes: string[]) => {
  // start chord
  const CHORD_I = scaleNotes[0] + ' major'

  // final chord
  const CHORD_IV = scaleNotes[3]
  const CHORD_V = scaleNotes[4]
  const finalChords = [CHORD_IV, CHORD_V]
  const randomF = finalChords[Math.floor(Math.random() * finalChords.length)] + ' major'

  // middle chords
  const middleChords = [scaleNotes[1], scaleNotes[2], scaleNotes[5]]

  const randomM1 = middleChords[Math.floor(Math.random() * middleChords.length)] + ' minor'
  const randomM2 = middleChords[Math.floor(Math.random() * middleChords.length)] + ' minor'

  const progression = [CHORD_I, randomM1, randomM2, randomF]
  return progression
}

// minor progression generator i/VI x x x
const minorProgression = (scaleNotes: string[]) => {
  // start chord
  const CHORD_i = scaleNotes[0] + ' minor'
  const CHORD_VI = scaleNotes[5] + ' major'
  const startChords = [CHORD_i, CHORD_VI]
  const randomStart = startChords[Math.floor(Math.random() * startChords.length)]

  // final chord
  const CHORD_III = scaleNotes[2] + ' major'
  const CHORD_iv = scaleNotes[3] + ' minor'
  const CHORD_v = scaleNotes[4] + ' minor'
  const CHORD_V = scaleNotes[4] + ' major' // not in scale but can fit well and make tension
  const CHORD_VII = scaleNotes[6] + ' major'
  const scaleChords = startChords.concat([CHORD_III, CHORD_iv, CHORD_v, CHORD_V, CHORD_VII])
  const randomChord1 = scaleChords[Math.floor(Math.random() * scaleChords.length)]
  const randomChord2 = scaleChords[Math.floor(Math.random() * scaleChords.length)]
  const randomChord3 = scaleChords[Math.floor(Math.random() * scaleChords.length)]

  // const progression = [randomStart]
  // progression.push(pickChord(progression, scaleNotes))
  // progression.push(pickChord(progression, scaleNotes))
  // progression.push(pickChord(progression, scaleNotes))
  const progression = [randomStart, randomChord1, randomChord2, randomChord3]

  progression.forEach((cp, index) => {
    const chordQuantity = progression.filter((c) => c == cp).length
    console.log(cp + ' ' + chordQuantity)
    if (chordQuantity > 2) {
      const scaleChordsReduced = scaleChords.filter((c) => c != cp)
      console.log(scaleChordsReduced)
      const rc = scaleChordsReduced[Math.floor(Math.random() * scaleChords.length)]
      progression[index] = rc
    }
  })

  return progression
}

// check dont repeat more than 2 times
const pickChord = (progression: string[], scaleChords: string[]) => {
  const MAX_TRIES = 20
  let chord = ''
  let tries = 0
  do {
    chord = scaleChords[Math.floor(Math.random() * scaleChords.length)]
    tries++
  } while (progression.filter((c) => c === chord).length >= 2 && tries < MAX_TRIES)
  return chord
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
</script>

<template>
  <main class="w-full flex flex-col text-center items-center">
    <h1 class="text-4xl mb-10">CHORD PROGESSION MAKER</h1>
    <div class="border p-2">
      <h2 class="mb-2">Select a scale:</h2>
      <div class="buttons flex w-180 justify-between">
        <button @click="() => (chords = [])">CLEAR</button>
        <button v-for="note in notes" @click="setNote(note)">
          {{ note }}
        </button>
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            class="sr-only peer"
            v-model="scaleSuffixToggle"
            @click="() => (scaleSuffixToggle ? (scaleSuffix = 'major') : (scaleSuffix = 'minor'))"
          />
          <div
            class="relative w-11 h-6 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
          ></div>
          <span class="ml-2">{{ capitalize(scaleSuffix) }}</span>
        </label>
      </div>
    </div>

    <div
      v-if="chords && chords.length > 0"
      class="flex flex-col text-center items-center justify-center gap-4"
    >
      <GuitarDiagram :chords="chords" />
      <PianoKeyboard :chords="chords" />
    </div>
  </main>
</template>

<style scoped></style>
