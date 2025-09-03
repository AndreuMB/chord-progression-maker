<script setup lang="ts">
import { Chord, Note } from 'tonal'
import * as Tone from 'tone'
import { Piano } from '@tonejs/piano/build/piano/Piano'

const props = defineProps<{
  pianoSound: Piano
  chord: string
}>()

const emit = defineEmits(['chordPlay'])

function highlightNotes(notes: string[], on = true) {
  notes.forEach((n) => {
    // key id is always sharp find enharmonic in case is flat
    if (n.includes('b')) n = Note.enharmonic(n)
    const el = document.getElementById(n)
    if (el) el.classList.toggle('active', on)
  })
}

function playChord(name: string) {
  emit('chordPlay')
  const chord = Chord.get(name).notes

  // pick octave 4 and simplify
  const notes = chord.map((pc) => Note.simplify(pc + '4'))

  highlightNotes(notes, true)

  const now = Tone.now()
  notes.forEach((n) => props.pianoSound.keyDown({ note: n }))

  // props.pianoSound.stopAll() // release all at once
  notes.forEach((n) => props.pianoSound.keyUp({ note: n, time: now + 1 }))
}
</script>

<template>
  <button @click="playChord(props.chord)">Play {{ props.chord }}</button>
</template>
