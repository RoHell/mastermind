<script setup lang="ts">
import NumberWrapper from './NumberWrapper.vue'
import { HitInterface } from '../types';

interface Props {
  hit: HitInterface
  round: number
}

defineProps<Props>()
</script>

<template>
  <NumberWrapper :numbers="hit.numbers">
    <template #left>
      <span>{{ round }}.</span>
    </template>

    <template #number="{ number }">
      <input
        :value="number"
        type="number"
        disabled
      />
    </template>

    <template #right>
      {{ hit.points?.toFixed(1) }}
    </template>
  </NumberWrapper>
</template>

<style lang="scss" scoped>
.number-wrapper {
  &:deep(.number-wrapper__digit) {
    height: auto;
    aspect-ratio: 1;
  }
}
</style>