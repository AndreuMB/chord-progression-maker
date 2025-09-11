<script setup lang="ts">
import PlayButton from './PlayButton.vue'

const props = defineProps<{
  scrollTo: HTMLDivElement
}>()

function scrollTo() {
  props.scrollTo.scrollIntoView({ behavior: 'smooth' })
}
</script>
<template>
  <div class="h-full w-full flex flex-col justify-center gap-4 p-10">
    <h1 class="text-9xl">WELCOME TO CHORD PROGRESSION MAKER</h1>
    <h2 class="text-4xl">Start making your perfect sounds</h2>
    <PlayButton @click="scrollTo" />
  </div>
</template>
