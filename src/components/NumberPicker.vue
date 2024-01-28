<script setup lang="ts">
import { computed } from 'vue';
import { useNumbers } from '../composables'

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
  <div class="number-picker">
    <div class="number-picker__round" />

    <div class="number-picker__digits">
      <div
        v-for="(_, index) in pickedNumbers"
        :key="index"
        class="number-picker__digit"
      >
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
      </div>
    </div>
    <div class="number-picker__action">
      <button
        @click="onSubmit"
        :disabled="isDisabled"
      >
        <img
          src="../assets/icons/play.svg"
          class="number-picker__submit"
          :class="{
            'number-picker__submit--disabled': isDisabled
          }"
        >
      </button>
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
    background-image: linear-gradient(transparent, var(--background-color) 20%, var(--background-color) 80%, transparent);
  }

  &__round {
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    place-content: center;
    align-items: center;
  }

  &__submit {
    width: 2.3rem;
    height: 2.3rem;
  }

  &__chevron {
    width: 2rem;
    height: 2rem;
  }

  &__chevron, &__submit {
    &--disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &__points {
    font-size: 1.5rem;
    width: 2.3rem;
    height: 2.3rem;
  }

  &__action {
    left: 100%;
    background-color: var(--background-color);
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