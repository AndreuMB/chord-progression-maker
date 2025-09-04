<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { QwertyOptions } from '@/types/qwerty-hancock'
import { Chord, Note } from 'tonal'
import * as Tone from 'tone'
import { Piano } from '@tonejs/piano/build/piano/Piano'
import type { IChord } from '@/assets/guitarChordsInterface'
import PianoChord from './PianoChord.vue'

const props = defineProps<{
  chords: IChord[]
}>()

const pianoSound = new Piano({
  velocities: 5,
})

// connect it to the speaker output
pianoSound.toDestination()

const loading = ref(true)

let keyboard: QwertyHancock | null = null
const options: QwertyOptions = {
  id: 'keyboard',
  width: 250,
  height: 150,
  octaves: 1,
  startNote: 'C4',
  whiteNotesColour: 'white',
  blackNotesColour: 'black',
  hoverColour: '#f3e939',
}

const keys = ref<ChildNode | null>(null)

onMounted(async () => {
  await pianoSound.load()
  keyboard = new QwertyHancock(options)

  const keyboardEl = document.getElementById('keyboard')
  if (!keyboardEl) return
  keys.value = keyboardEl.firstChild

  loading.value = false
})

function cleanKeyboard() {
  if (!keys.value) return
  keys.value.childNodes.forEach((n) => {
    // key id is always sharp find enharmonic in case is flat
    const el = n as HTMLElement
    el.classList.toggle('active', false)
  })
}

let timeout = 0
function handleChordPlay(name: string) {
  clearTimeout(timeout)
  cleanKeyboard()
  const duration = 1.5
  timeout = setTimeout(() => cleanKeyboard(), duration * 1000)
}
</script>

<template>
  <div v-show="loading === false" class="flex flex-col text-center items-center justify-center">
    <div class="playButtons flex">
      <div v-for="chord in chords" class="w-40">
        <PianoChord
          :pianoSound="pianoSound"
          :chord="chord.key + ' ' + chord.suffix"
          class="my-2"
          @chord-play="handleChordPlay"
        />
      </div>
    </div>
    <div id="keyboard"></div>
  </div>
</template>
