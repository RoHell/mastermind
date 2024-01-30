<script setup lang="ts">
import { computed, ref } from 'vue';
import { useNumbers } from '../composables'

import NumberWrapper from './NumberWrapper.vue'
import { PickedNumbersType } from '../types';

const emit = defineEmits(['submit'])

const {
  MIN,
  MAX,
  NUMBERS_COUNT,
} = useNumbers()

const inputFieldRef = ref<{[key: string]: HTMLElement | null}>({})
const isDeleting = ref(false)
const pickedNumbers = ref<PickedNumbersType>(Array(NUMBERS_COUNT).fill(null))

const isDisabled = computed(() => pickedNumbers.value.some(number => !number === null || number === ''))

const resetPickedNumbers = () => pickedNumbers.value = Array(NUMBERS_COUNT).fill(null)

const onSubmit = () => {
  emit('submit', pickedNumbers.value)
  resetPickedNumbers()
  inputFieldRef.value?.[0]?.focus()
}

const validate = (event: Event, index: number) => {
  setTimeout(() => {
    const target = event.target as HTMLInputElement
    if (Number(target.value) > MAX) pickedNumbers.value[index] = Number(String(pickedNumbers.value[index]).slice(-1))
    if (Number(target.value) < MIN) pickedNumbers.value[index] = MIN
    if (index < (NUMBERS_COUNT - 1) && !isDeleting.value) inputFieldRef.value?.[index + 1]?.focus()
    if (index === 0) isDeleting.value = false
  }, 0)
}

const onDeleteKeyPress = (index: number) => {
  inputFieldRef.value?.[index - 1]?.focus()
  isDeleting.value = true
}

const onUpArrowClick = (index: number) => {
  (pickedNumbers.value[index] >= MAX) ? pickedNumbers.value[index] = MIN : pickedNumbers.value[index]++
}

const onDownArrowClick = (index: number) => {
  if (pickedNumbers.value[index] === null) {
    return pickedNumbers.value[index] = 0
  }
  pickedNumbers.value[index] <= MIN ? pickedNumbers.value[index] = MAX : pickedNumbers.value[index]--
}

</script>

<template>
  <form @submit.prevent="onSubmit">
    <NumberWrapper class="number-picker" :numbers="pickedNumbers">
      <template #number="{ index }">
        <button
          type="button"
          class="number-picker__chevron number-picker__chevron--up"
          @click="onUpArrowClick(index)"
        >
          <img
            src="../assets/icons/chevron-up.svg"
            class="number-picker__chevron"
          />
        </button>
        <input
          :ref="(el) => (inputFieldRef[index] = el as HTMLElement)"
          v-model="pickedNumbers[index]"
          type="number"
          :max="MAX"
          :min="MIN"
          :tabindex="index"
          class="number-picker__input"
          @keydown="validate($event, index)"
          @keyup.delete="onDeleteKeyPress(index)"
        />
        <button
          type="button"
          class="number-picker__chevron number-picker__chevron--down"
          @click="onDownArrowClick(index)"
        >
          <img
            src="../assets/icons/chevron-down.svg"
            class="number-picker__chevron"
          />
        </button>
      </template>

    <template #right>
      <button
        type="submit"
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
  </form>
  
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
    transition: 0.2s ease-in;
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
      background-image: linear-gradient(transparent, var(--background-color) 40%);
    }
    &--down {
      background-image: linear-gradient(var(--background-color), transparent 40%);
    }
  }
}
</style>