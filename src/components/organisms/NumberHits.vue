<script setup lang="ts">
import { HitInterface } from '../../types'

import { useNumbers } from '../../composables/useNumbers'

import NumberWrapper from '../molecules/NumberWrapper.vue'

interface Props {
  hit: HitInterface
  round: number
}

defineProps<Props>()

const { isWin } = useNumbers()

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
          'number-hits__number--match number-hits__number--hit': isWin && hit.matchPoints[index] === 1,
          'number-hits__number--match': isWin && hit.matchPoints[index] === 0.5,
          'number-hits__number--missed': isWin && hit.matchPoints[index] === 0,
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
  &--match {
    font-weight: 600;
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

    &:has(.number-hits__number--match) {
      box-shadow: var(--box-shadow-inset);
    }

    &:has(.number-hits__number--hit) {
      background-color: white;
    }

    &:has(.number-hits__number--missed) {
      box-shadow: var(--box-shadow);
    }
  }
}
</style>