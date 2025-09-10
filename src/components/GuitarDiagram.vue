<script setup lang="ts">
import type { IChord } from '@/assets/guitarChordsInterface'
import GuitarChord from './GuitarChord.vue'

defineProps<{
  chords: IChord[]
  fullChords: IChord[]
  fullChordsToggle: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div v-if="fullChordsToggle" class="flex min-h-20 bg-white justify-center p-2">
      <div v-for="chord in fullChords" class="w-1/6 flex flex-col justify-center h-full">
        <GuitarChord :chord="chord" />
      </div>
    </div>
    <div class="flex min-h-20 bg-white justify-center p-2">
      <div v-for="chord in chords" class="min-w-1/6 flex flex-col justify-center h-full">
        <GuitarChord :chord="chord" />
      </div>
    </div>
  </div>
</template>
