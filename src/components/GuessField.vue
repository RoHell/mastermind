<script setup lang="ts">
import { HitInterface } from '../types';

interface Props {
  field: HitInterface
  round: number
}

defineProps<Props>()

const emit = defineEmits(['submit'])

</script>

<template>
  <div class="number-picker">
    <div class="number-picker__round">
      <span>{{ round }}.</span>
    </div>
    <div class="number-picker__digits">
      <div
        v-for="(number, index) in field.numbers"
        :key="index"
        class="number-picker__digit"
      >
        <input
          :value="number"
          type="number"
          disabled
        />
      </div>
    </div>
    <div class="number-picker__action">
      <div class="number-picker__points">{{ field.points?.toFixed(1) }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.number-picker {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;

  &__digits {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      font-size: 1.5rem;
      text-align: center;
      width: 2rem;
      height: 2rem;
    }
  }

  &__digit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__round {
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    place-content: center;
    align-items: center;
  }

  &__points {
    font-size: 1.5rem;
    width: 2.3rem;
    height: 2.3rem;
  }

  &__action {
    left: 100%;
  }
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>