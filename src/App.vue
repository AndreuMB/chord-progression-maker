<script setup lang="ts">
import { Shape, SVGuitarChord, type Finger } from 'svguitar'
import { Chord, Interval, Note, Scale } from 'tonal'
import { onMounted, ref, useTemplateRef, type Ref } from 'vue'
import guitarChords from '@/assets/guitarChords.json'
import type { IChord } from './assets/guitarChordsInterface'
import ChordDiagram from './components/ChordDiagram.vue'

// TONAL

const eChordNotes = Chord.get('E').notes
const chordNotes = ref<null | string[]>(null)

// const cScale = Scale.get('C major').notes

// const chordsFromChord = chordNotes.map((note) => {
//   return Chord.get(note).name
// })

// onMounted(() => {
//   notesToChords(chordsFromChord)
// })

const scaleSuffix = ref(false)

const notesToChords = (notes: string[]) => {
  chords.value = []
  notes.forEach((note) => {
    let chordToChord = note.split(' ')[0]

    if (enharmonics[chordToChord]) {
      chordToChord = enharmonics[chordToChord]
    }

    if (chordToChord in guitarChords.chords) {
      // lot of variations of the chord G, Gm, Gdim...
      const chordData = guitarChords.chords[chordToChord as ChordRoot]

      // get the one we want
      const chord = chordData.filter((chord) => chord.suffix === note.split(' ')[1])[0]

      chords.value.push(chord as IChord)
      // chordToGuitar(chord as IChord)
    }
  })
}

// DB-CHORDS

type ChordRoot = keyof typeof guitarChords.chords

const enharmonics: Record<string, string> = {
  'G#': 'Ab',
  'D#': 'Eb',
  'A#': 'Bb',
  'E#': 'F',
  'B#': 'C',
  'F##': 'Ab',
}

const chords: Ref<IChord[]> = ref([])

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const setNote2 = (note: string) => {
  // chords.value = []
  const scale = Scale.get(note + ' ' + (scaleSuffix.value ? 'minor' : 'major'))

  // const chord = Chord.get(note)

  const scaleNotes = scale.notes

  console.log(scale.name)
  console.log(scale.notes)

  // progression generator I x x IV/V

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

  chordNotes.value = progression

  console.log(chordNotes.value)

  // const chordsFromChordNotes = chordNotes.value.map((note) => {
  //   // chord name
  //   return Chord.get(note).name
  // })

  // notesToChords(chordsFromChordNotes)
  notesToChords(chordNotes.value)
}
</script>

<template>
  <main>
    <div>
      <h1>Libraries test</h1>
      <h2>tonal</h2>
      <p>npm install --save tonal</p>
      <div>
        <p>{{ chordNotes }}</p>
        <!-- <p>{{ chordsFromChord }}</p> -->
      </div>
      <h2>svguitar</h2>
      <p>npm install --save svguitar</p>
      <p id="chart" class="w-50 bg-white"></p>
      <div>
        <h2>db-chords</h2>
        <div class="p-2">
          <button
            @click="() => (chords = [])"
            class="p-2 bg-white text-black rounded mr-2 cursor-pointer"
          >
            CLEAR
          </button>
          <button
            v-for="note in notes"
            @click="setNote2(note)"
            class="p-2 bg-white text-black rounded mr-2 cursor-pointer"
          >
            {{ note }}
          </button>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              class="sr-only peer"
              @click="() => (scaleSuffix = !scaleSuffix)"
            />
            <div
              class="relative w-11 h-6 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
            ></div>
            <span class="ml-2">{{ scaleSuffix ? 'Minor' : 'Major' }}</span>
          </label>
        </div>
        <div v-if="chords && chords.length > 0" class="flex">
          <div v-for="chord in chords" class="w-40">
            <p>{{ chord.key }}</p>
            <ChordDiagram class="bg-white" :chord="chord" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
