<script setup lang="ts">
import { Chord, Note } from 'tonal'
import * as Tone from 'tone'
import { Piano } from '@tonejs/piano/build/piano/Piano'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import KeyButton from './KeyButton.vue'

const props = defineProps<{
  pianoSound: Piano
  chord: string
  keyBinding?: string
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
  const notes = chord.map((note) => Note.simplify(note) + '4')

  highlightNotes(notes, true)

  // play sound
  notes.forEach((n) => props.pianoSound.keyDown({ note: n }))

  // stop sound
  const now = Tone.now()
  notes.forEach((n) => props.pianoSound.keyUp({ note: n, time: now + 1 }))
}

const buttonRef = ref<{ trigger: () => void } | null>(null)

// handle keyboard presses
function handleKeydown(e: KeyboardEvent) {
  if (e.repeat) return
  if (e.key === props.keyBinding && buttonRef.value) {
    // needed for the animation to work
    buttonRef.value.trigger()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <KeyButton ref="buttonRef" @click="playChord(chord)">Play {{ chord }}</KeyButton>
</template>
