<script setup lang="ts">
import { ref } from 'vue'
import ProgressionMaker from './components/ProgressionMaker.vue'
import Welcome from './components/Welcome.vue'

const progressionMaker = ref<HTMLDivElement>()
</script>

<template>
  <div class="scroll-smooth h-dvh w-dvw">
    <!-- <div class="bg-gray-900"> -->
    <Welcome class="" v-if="progressionMaker" :scrollTo="progressionMaker" />
    <div ref="progressionMaker">
      <ProgressionMaker />
    </div>
  </div>
</template>

<style scoped></style>
