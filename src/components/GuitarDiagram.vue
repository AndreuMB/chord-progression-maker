<script setup lang="ts">
import type { IChord } from '@/assets/guitarChordsInterface'
import GuitarChord from './GuitarChord.vue'

defineProps<{
  chords: IChord[]
}>()
</script>

<template>
  <div class="flex">
    <div v-for="chord in chords" class="w-40">
      <p>{{ chord.key }}</p>
      <GuitarChord class="bg-white h-50" :chord="chord" />
    </div>
  </div>
</template>
