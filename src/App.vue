<script setup lang="ts">
import { ref } from 'vue'
import ProgressionMaker from './components/ProgressionMaker.vue'
import Welcome from './components/Welcome.vue'
import InfoButton from './components/InfoButton.vue'

const progressionMaker = ref<HTMLDivElement>()
</script>

<template>
  <div class="scroll-smooth h-dvh w-dvw">
    <!-- <div class="bg-gray-900"> -->
    <Welcome class="" v-if="progressionMaker" :scrollTo="progressionMaker" />
    <div ref="progressionMaker" class="relative">
      <InfoButton class="absolute top-2 right-2" />
      <ProgressionMaker />
    </div>
  </div>
</template>

<style scoped></style>
