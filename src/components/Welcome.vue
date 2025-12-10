<script setup lang="ts">
import { onMounted } from 'vue'
import AudioWave from './AudioWave.vue'
import PlayButton from './PlayButton.vue'

const props = defineProps<{
  scrollTo: HTMLDivElement
}>()

const scrollToApp = () => {
  props.scrollTo.scrollIntoView({ behavior: 'smooth' })
}

function checkSmallScreenSize() {
  if (window.innerWidth < 1300) return true
  return false
}
</script>
<template>
  <!-- <img
    src="/src/assets/bgCCC.png"
    alt="backgroundDec"
    class="absolute top-0 left-0 w-full h-full -z-10 opacity-32"
  /> -->
  <div
    class="h-full flex flex-col justify-center gap-20 p-10"
    @wheel="scrollToApp"
    @touchstart="scrollToApp"
  >
    <!-- change title font -->
    <div>
      <h2 class="text-2xl md:text-4xl">WELCOME TO</h2>
      <h1 class="text-4xl md:text-6xl lg:text-8xl text-primary">CHORD PROGRESSION MAKER</h1>
    </div>
    <h2 class="text-2xl md:text-4xl text-terciary">Start making your perfect sounds</h2>
    <PlayButton v-if="!checkSmallScreenSize()" @click="scrollToApp" />
    <div
      v-else
      class="simple-font text-2xl animate-pulse absolute bottom-5 left-0 text-primary z-10 w-full text-center"
    >
      Swipe down <i class="pi pi-arrow-down"></i>
    </div>

    <AudioWave class="absolute bottom-0 w-full left-0" />
  </div>
</template>
