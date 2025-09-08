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
  <div class="flex flex-col gap-4">
    <div v-if="fullChordsToggle" class="flex justify-center">
      <div v-for="chord in fullChords" class="w-40">
        <GuitarChord class="bg-white h-50" :chord="chord" />
      </div>
    </div>
    <div class="flex justify-center">
      <div v-for="chord in chords" class="w-40">
        <GuitarChord class="bg-white h-50" :chord="chord" />
      </div>
    </div>
  </div>
</template>
