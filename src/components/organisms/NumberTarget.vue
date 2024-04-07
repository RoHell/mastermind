<script setup lang="ts">
import NumberWrapper from '../molecules/NumberWrapper.vue'

import { useNumbers } from '../../composables'

const { targetNumbers } = useNumbers()
</script>

<template>
  <NumberWrapper class="number-target" :numbers="targetNumbers">
    <template #number="{ number }">
      <span class="number-target__numbers">{{ number }}</span>
    </template>
  </NumberWrapper>
</template>

<style lang="scss" scoped>
.number-target {
  &:deep(.number-wrapper__digits) {
    height: auto;
  }
  &__numbers {
    font-weight: 700;
    background-color: white;
    width: 100%;
    height: 100%;
  }
}
</style>