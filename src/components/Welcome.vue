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
  <div class="h-full w-[80%] flex flex-col justify-center gap-20 p-10">
    <h1 class="text-8xl">WELCOME TO CHORD PROGRESSION MAKER</h1>
    <h2 class="ml-5 text-4xl">Start making your perfect sounds</h2>
    <PlayButton @click="scrollTo" />
  </div>
</template>
