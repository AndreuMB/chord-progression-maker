<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  label: string
}>()

defineEmits(['click'])

const toggle = ref(false)
</script>
<template>
  <label class="items-center cursor-pointer flex w-full gap-4">
    <div>
      <input
        type="checkbox"
        class="sr-only peer"
        v-model="toggle"
        @click="
          () => {
            toggle = !toggle
            $emit('click', toggle)
          }
        "
      />
      <div
        class="relative w-11 h-6 rounded-full peer bg-primary peer-checked:after:translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terciary"
      ></div>
    </div>

    <span class="">{{ label }}</span>
  </label>
</template>
