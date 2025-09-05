<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['click'])
const btn = ref<HTMLButtonElement | null>(null)
defineExpose({
  trigger: () => trigger(),
})

const trigger = () => {
  if (btn.value) {
    btn.value.click()
    const span = btn.value.querySelector('span')
    if (!span) return
    span.classList.add('button_active')
    setTimeout(() => span.classList.remove('button_active'), 100)
  }
}
</script>
<template>
  <button ref="btn" @click="$emit('click')">
    <span class="button_top"> <slot></slot> </span>
  </button>
</template>
<style scoped>
button {
  /* Variables */
  --button_radius: 0.2em;
  --button_color: #000000;
  --button_outline_color: #e8e8e8;
  padding: 0;
  font-size: 17px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
}

.button_top {
  display: block;
  box-sizing: border-box;
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  padding: 0.1em 1em;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
}

button:hover .button_top {
  transform: translateY(-2.5px);
}

button:active .button_top,
.button_active {
  /* Push the button downwards when pressed */
  transform: translateY(0);
}
</style>
