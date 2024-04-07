<script setup lang="ts">
import NumberWrapper from '../molecules/NumberWrapper.vue'
import { HitInterface } from '../../types';
import { useNumbers } from '../../composables/useNumbers';

interface Props {
  hit: HitInterface
  round: number
}

const props = defineProps<Props>()

const {
  targetNumbers,
  isWin,
} = useNumbers()

const isExactHitted = (index: number) => {
  if (!isWin.value) return
  return props.hit.numbers[index] === targetNumbers.value[index]
}

const isHalfHit = (index: number) => {
  if (!isWin.value || isExactHitted(index)) return
  return targetNumbers.value.includes(props.hit.numbers[index])
}

const isMissHit = (index: number) => {
  return isWin.value && !(isExactHitted(index) || isHalfHit(index))
  // return !targetNumbers.value.includes(number)
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
          'number-hits__number--hitted': isExactHitted(index),
          'number-hits__number--not-exact': isHalfHit(index),
          'number-hits__number--missed': isMissHit(index),
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
  color: var(--text-color);
  &--hitted {
    font-weight: 600;
  }
  &--not-exact {
    font-weight: 600;
    opacity: 0.6;
  }
  &--missed {
    opacity: 0.6;
  }
}
.number-wrapper {
  &:deep(.number-wrapper__digit) {
    font-size: 1em;
    aspect-ratio: 1;
    height: 100% !important;
    box-shadow: var(--box-shadow);

    &:has(.number-hits__number--hitted) {
      box-shadow: var(--box-shadow-inset);
    }

    &:has(.number-hits__number--missed) {
      box-shadow: var(--box-shadow);
    }
  }
}
</style>