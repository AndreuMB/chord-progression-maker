<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ProgressionMaker from './components/ProgressionMaker.vue'
import Welcome from './components/Welcome.vue'
import InfoButton from './components/InfoButton.vue'

const progressionMaker = ref<HTMLDivElement | null>(null)

function scrollToPM() {
  if (progressionMaker.value) {
    progressionMaker.value.scrollIntoView({
      behavior: 'instant',
    })
  }
}

onMounted(() => {
  scrollToPM()
  window.addEventListener('resize', scrollToPM)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', scrollToPM)
})
</script>

<template>
  <div class="scroll-smooth h-dvh w-dvw">
    <Welcome v-if="progressionMaker" :scrollTo="progressionMaker" />
    <div ref="progressionMaker" class="relative overflow-hidden">
      <InfoButton class="absolute top-2 right-2 z-10" />
      <h2 class="text-6xl opacity-20 rotateTitle text-nowrap">CHORD PROGRESSION MAKER</h2>
      <ProgressionMaker />
    </div>
  </div>
</template>

<style scoped>
.rotateTitle {
  position: absolute;
  right: -14px;
  bottom: 0px;
  transform: translate(100%, 0) rotate(-90deg);
  transform-origin: bottom left;
}
</style>
