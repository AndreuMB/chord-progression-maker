<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { SVGuitarChord, type Finger } from 'svguitar'
import type { IChord } from '@/assets/guitarChordsInterface'

const props = defineProps<{
  chord: IChord
}>()

const svgRef = ref<HTMLElement | null>(null)

onMounted(() => draw(props.chord))

watch(
  () => props,
  () => draw(props.chord),
  { deep: true },
)

function draw(chord: IChord) {
  if (!svgRef.value) return

  const fingers = chordToFingers(chord)
  svgRef.value.innerHTML = ''

  new SVGuitarChord(svgRef.value)
    .chord({
      fingers: fingers,

      // optional: barres for barre chords
      barres: [],

      // title of the chart (optional)
      title: chord.key + ' ' + chord.suffix,
    })
    .draw()
}

const chordToFingers = (chord: IChord) => {
  const STRING_QUANTITY = 6

  const position = chord.positions[0]

  const fingers: Finger[] = []

  for (let index = 0; index < STRING_QUANTITY; index++) {
    const string = STRING_QUANTITY - index
    const fret = position.frets[index]
    const fingerName = position.fingers[index]

    const finger: Finger = [string, fret == -1 ? 'x' : fret, fingerName.toString()]

    fingers.push(finger)
  }

  return fingers
}
</script>

<template>
  <!-- **:fill-primary **:stroke-primary  -->
  <div class="guitar-chord **:stroke-primary **:fill-primary h-full" ref="svgRef"></div>
</template>

<style scoped>
:deep(.finger-text) {
  stroke: var(--color-secondary);
  fill: var(--color-secondary);
  font-size: 2.2em;
  font-weight: 900;
}
</style>
