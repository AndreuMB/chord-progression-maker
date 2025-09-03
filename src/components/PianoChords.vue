<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { QwertyOptions } from '@/types/qwerty-hancock'
import { Chord, Note } from 'tonal'
import * as Tone from 'tone'
import { Piano } from '@tonejs/piano/build/piano/Piano'

const props = defineProps<{
  chord: string
}>()

const pianoSound = new Piano({
  velocities: 5,
})

// connect it to the speaker output
pianoSound.toDestination()

const loading = ref(true)
const options: QwertyOptions = {
  id: 'keyboard',
  width: 500,
  height: 150,
  octaves: 2,
  startNote: 'A3',
  whiteNotesColour: 'white',
  blackNotesColour: 'black',
  hoverColour: '#f3e939',
}
const keyboard = new QwertyHancock(options)

onMounted(async () => {
  await pianoSound.load()
  loading.value = false
})

function highlightNotes(notes: string[], on = true) {
  notes.forEach((n) => {
    // key id is always sharp find enharmonic in case is flat
    if (n.includes('b')) n = Note.enharmonic(n)
    const el = document.getElementById(n)
    if (el) el.classList.toggle('active', on)
  })
}

async function playChord(name: string, duration = 1.5) {
  if (!keyboard) return

  const chord = Chord.get(name).notes

  // pick octave 4 and simplify
  const notes = chord.map((pc) => Note.simplify(pc + '4'))

  console.log(notes)

  highlightNotes(notes, true)

  const now = Tone.now()
  notes.forEach((n) => pianoSound.keyDown({ note: n }))

  // piano.keyUp({ note: 'C4', time: now + 1 }) // release all at once
  notes.forEach((n) => pianoSound.keyUp({ note: n, time: now + 1 }))

  setTimeout(() => highlightNotes(notes, false), duration * 1000)
}
</script>

<template>
  <button v-if="loading === false" @click="playChord(props.chord)">Play {{ props.chord }}</button>
</template>
