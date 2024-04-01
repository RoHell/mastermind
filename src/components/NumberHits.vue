<script setup lang="ts">
import NumberWrapper from './NumberWrapper.vue'
import { HitInterface } from '../types';
import { useNumbers } from '../composables/useNumbers';

interface Props {
  hit: HitInterface
  round: number
  index: number
}

const {
  targetNumbers,
  isWin,
} = useNumbers()

const props = defineProps<Props>()

const isHitted = (index: number) => {
  if (!isWin.value) return
  return props.hit.numbers[index] === targetNumbers.value[index]
}

</script>

<template>
  <NumberWrapper :numbers="hit.numbers">
    <template #left>
      <span>{{ round }}.</span>
    </template>

    <template #number="{ number, index }">
      <input
        :value="number"
        type="number"
        disabled
        class="number-hits__number"
        :class="{
          'number-hits__number--hitted': isHitted(index)
        }"
      />
    </template>

    <template #right>
      {{ hit.points?.toFixed(1) }}
    </template>
  </NumberWrapper>
</template>

<style lang="scss" scoped>
.number-hits__number {
  box-sizing: border-box;
  &--hitted {
    background-color: white !important;
  }
}
.number-wrapper {
  &:deep(.number-wrapper__digit) {
    font-size: 1em;
    aspect-ratio: 1;
    height: 100% !important;
  }
}
</style>