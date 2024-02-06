<script setup lang="ts">
import NumberWrapper from './NumberWrapper.vue'

interface Props {
  numbers: number[]
}

defineProps<Props>()
</script>

<template>
  <NumberWrapper :numbers="numbers">
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