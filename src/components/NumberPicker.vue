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
        @click="pickedNumbers[index]++"
      >
        <img
          src="../assets/icons/chevron-up.svg"
          class="number-picker__chevron"
          :class="{
            'number-picker__chevron--disabled': pickedNumbers[index] >= MAX
          }"
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
        @click="pickedNumbers[index] === null ? pickedNumbers[index] = MIN : pickedNumbers[index]--"
      >
        <img
          src="../assets/icons/chevron-down.svg"
          class="number-picker__chevron"
          :class="{
            'number-picker__chevron--disabled': pickedNumbers[index] <= MIN && pickedNumbers[index] !== null
          }"
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
          :class="{
            'number-picker__submit-icon--disabled': isDisabled
          }"
        >
      </button>
    </template>
  </NumberWrapper>
</template>

<style lang="scss" scoped>

.number-wrapper::v-deep {
  .number-wrapper__digits {
    background-image: linear-gradient(transparent, var(--background-color) 20%, var(--background-color) 80%, transparent);
  }
}
.number-picker {
  &__submit {
    background-color: var(--background-color);
  }

  &__submit-icon {
    width: 2.3rem;
    height: 2.3rem;
    background-color: var(--background-color);
  }

  &__chevron {
    width: 2rem;
    height: 2rem;
  }

  &__chevron, &__submit-icon {
    &--disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &__input {
    background-color: rgba(white, 0.5);
  }
}
</style>