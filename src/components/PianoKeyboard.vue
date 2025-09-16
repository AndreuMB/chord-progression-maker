<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { QwertyOptions } from '@/types/qwerty-hancock'
import { Piano } from '@tonejs/piano/build/piano/Piano'
import type { IChord } from '@/assets/guitarChordsInterface'
import PianoChord from './PianoChord.vue'
import * as Tone from 'tone'

defineProps<{
  chords: IChord[]
  fullChords: IChord[]
  fullChordsToggle: boolean
}>()

const volume = ref<number>(50)

const pianoSound = new Piano()

const volumeNode = new Tone.Volume(volume.value / 10).toDestination()

// connect it to the speaker output
pianoSound.connect(volumeNode)

const loading = ref(true)

const keys = ref<ChildNode | null>(null)

onMounted(async () => {
  await pianoSound.load()

  const computedStyle = window.getComputedStyle(document.body)

  const MAX_WIDTH = 1200
  const WIDTH_PIANO = 56
  const pianoWidth = (document.body.offsetWidth * WIDTH_PIANO) / 100

  const MAX_HEIGHT = 380
  const HEIGHT_PIANO = 36
  const pianoHeight = (document.body.offsetHeight * HEIGHT_PIANO) / 100

  const options: QwertyOptions = {
    id: 'keyboard',
    width: pianoWidth > MAX_WIDTH ? MAX_WIDTH : pianoWidth,
    height: pianoHeight > MAX_HEIGHT ? MAX_HEIGHT : pianoHeight,
    octaves: 2,
    startNote: 'C4',
    whiteKeyColour: 'white',
    blackKeyColour: 'black',
    activeColour: computedStyle.getPropertyValue('--terciary'),
  }
  const keyboard = new QwertyHancock(options)

  keyboard.keyDown = (note) => {
    pianoSound.keyDown({ note })
  }
  keyboard.keyUp = (note) => {
    pianoSound.keyUp({ note })
  }

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

const handleChangeVolume = () => {
  const gain = volume.value / 100
  pianoSound.strings.value = volume.value / 10
  volumeNode.volume.value = Tone.gainToDb(gain)
}
</script>

<template>
  <div class="w-10 flex justify-between gap-4 absolute top-2 left-2 p-2">
    <i class="pi pi-volume-up"></i>
    <input
      type="range"
      min="1"
      max="100"
      value="50"
      class="slider"
      v-model="volume"
      @change="handleChangeVolume"
    />
  </div>
  <div v-show="loading === false" class="flex gap-12 text-center items-center justify-center">
    <!-- chord progression and piano -->
    <div class="flex flex-col gap-10 items-center">
      <div class="playButtons flex flex-wrap justify-around w-full">
        <div v-for="(chord, index) in chords">
          <PianoChord
            :pianoSound="pianoSound"
            :chord="chord.key + ' ' + chord.suffix"
            :keyBinding="index + 1 + ''"
            @chord-play="handleChordPlay"
          />
        </div>
      </div>
      <div id="keyboard"></div>
    </div>
    <div v-if="fullChordsToggle" class="border-2 rounded h-full"></div>
    <!-- full chords -->
    <div v-if="fullChordsToggle" class="playButtons flex flex-col justify-between h-full">
      <div v-for="chord in fullChords">
        <PianoChord
          :pianoSound="pianoSound"
          :chord="chord.key + ' ' + chord.suffix"
          @chord-play="handleChordPlay"
        />
      </div>
    </div>
  </div>
  <div v-if="loading !== false">
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-secondary animate-spin fill-primary"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
