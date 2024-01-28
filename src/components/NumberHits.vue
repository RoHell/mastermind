<script setup lang="ts">
import NumberWrapper from './NumberWrapper.vue'
import { HitInterface } from '../types';

interface Props {
  field: HitInterface
  round: number
}

defineProps<Props>()
</script>

<template>
  <NumberWrapper :numbers="field.numbers">
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
      {{ field.points?.toFixed(1) }}
    </template>
  </NumberWrapper>
</template>