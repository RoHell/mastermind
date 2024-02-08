<script setup lang="ts">
import NumberWrapper from './NumberWrapper.vue'

import { useNumbers } from '../composables'

const { targetNumbers } = useNumbers()
</script>

<template>
  <NumberWrapper :numbers="targetNumbers">
    <template #number="{ number }">
      <span class="target-numbers">{{ number }}</span>
    </template>
  </NumberWrapper>
</template>

<style lang="scss" scoped>
.target-numbers {
  font-weight: 700;
  background-color: white;
  width: 100%;
  height: 100%;
}
</style>