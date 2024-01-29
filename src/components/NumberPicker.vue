<script setup lang="ts">
import { computed } from 'vue';
import { useNumbers } from '../composables'

import NumberWrapper from './NumberWrapper.vue'

const emit = defineEmits(['submit'])

const { MIN, MAX, pickedNumbers, resetPickedNumbers } = useNumbers()

const isDisabled = computed(() => pickedNumbers.value.some(number => number === null))

const onSubmit = () => {
  emit('submit', pickedNumbers.value)
  resetPickedNumbers()
}

const validate = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  if (Number(target.value) > MAX) pickedNumbers.value[index] = Number(String(pickedNumbers.value[index]).slice(-1))
  if (Number(target.value) < MIN) pickedNumbers.value[index] = MIN
}

</script>

<template>
  <NumberWrapper class="number-picker" :numbers="pickedNumbers">
    <template #number="{ index }">
      <button
        :disabled="pickedNumbers[index] >= MAX"
        class="number-picker__chevron number-picker__chevron--up"
        @click="pickedNumbers[index]++"
      >
        <img
          src="../assets/icons/chevron-up.svg"
          class="number-picker__chevron"
        />
      </button>
      <input
        v-model="pickedNumbers[index]"
        type="number"
        :max="MAX"
        :min="MIN"
        :tabindex="index"
        class="number-picker__input"
        @input="validate($event, index)"
      />
      <button
        :disabled="pickedNumbers[index] <= MIN && pickedNumbers[index] !== null"
        class="number-picker__chevron number-picker__chevron--down"
        @click="pickedNumbers[index] === null ? pickedNumbers[index] = MIN : pickedNumbers[index]--"
      >
        <img
          src="../assets/icons/chevron-down.svg"
          class="number-picker__chevron"
        />
      </button>
    </template>

    <template #right>
      <button
        @click="onSubmit"
        :disabled="isDisabled"
        class="number-picker__submit"
      >
        <img
          src="../assets/icons/play.svg"
          class="number-picker__submit-icon"
        >
      </button>
    </template>
  </NumberWrapper>
</template>

<style lang="scss" scoped>
.number-wrapper {
  &:deep(.number-wrapper__digit) {
    background-color: rgba(white, 0.5);
  }
}
.number-picker {
  &__submit {
    background-color: var(--background-color);
    &:disabled {
      pointer-events: none;
      opacity: 0.3;
    }
  }

  &__submit-icon {
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
  }

  &__chevron {
    width: calc(100% + 2px);
    height: 100%;
    padding: 1px transparent;
    &:disabled {
      pointer-events: none;
      opacity: 0.3;
    }
    &--up {
      background-image: linear-gradient(transparent, var(--background-color));
    }
    &--down {
      background-image: linear-gradient(var(--background-color transparent));
    }
  }
}
</style>