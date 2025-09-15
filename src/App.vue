<script setup lang="ts">
import { ref } from 'vue'
import ProgressionMaker from './components/ProgressionMaker.vue'
import Welcome from './components/Welcome.vue'
import InfoButton from './components/InfoButton.vue'

const progressionMaker = ref<HTMLDivElement>()
</script>

<template>
  <div class="scroll-smooth h-dvh w-dvw">
    <Welcome class="" v-if="progressionMaker" :scrollTo="progressionMaker" />
    <div ref="progressionMaker" class="relative">
      <InfoButton class="absolute top-2 right-2" />
      <h1 class="text-6xl opacity-20 rotateTitle">CHORD PROGESSION MAKER</h1>
      <ProgressionMaker />
    </div>
  </div>
</template>

<style scoped>
.rotateTitle {
  position: absolute;
  right: 0;
  bottom: 10px;
  transform: translate(100%, 0) rotate(-90deg);
  transform-origin: bottom left;
}
</style>
