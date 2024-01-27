<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface FieldInterface {
  id?: string
  digits: number[] | null[]
  points: number | null
}

interface Props {
  field: FieldInterface
  round: number
}

const props = defineProps<Props>()

const MAX = 9
const MIN = 0

const emit = defineEmits(['submit'])

const digits = ref<number[] | null[]>([null, null, null, null])

const isDisabled = computed(() => digits.value.some(digit => digit === null))

const isCurrentField = computed(() => props.field.points !== null)

const onSubmit = () => {
  emit('submit', digits.value)
}

const validate = (value: number, index: number) => {
  if (value > MAX) digits.value[index] = Number(String(digits.value[index]).slice(-1))
  if (value < MIN) digits.value[index] = MIN
}

watch(() => props.field.digits, (value) => {
  if (value.every(v => v === null)) {
    digits.value = [null, null, null, null]
  }
})

</script>

<template>
  <div class="number-picker">
    <div class="number-picker__round">
      <span v-if="isCurrentField">{{ round }}.</span>
    </div>
    <div class="number-picker__digits">
      <div
        v-for="(_, index) in field.digits"
        :key="index"
        class="number-picker__digit"
      >
        <button
          v-if="!isCurrentField"
          :disabled="digits[index] >= MAX"
          @click="digits[index]++"
        >
          <img
            src="../assets/icons/chevron-up.svg"
            class="number-picker__chevron"
            :class="{
              'number-picker__chevron--disabled': digits[index] >= MAX
            }"
          />
        </button>
        <input
          v-model="digits[index]"
          type="number"
          :max="MAX"
          :min="MIN"
          :disabled="isCurrentField"
          :tabindex="index"
          @input="validate($event.target.value, index)"
        />
        <button
          v-if="!isCurrentField"
          :disabled="digits[index] <= MIN && digits[index] !== null"
          @click="digits[index] === null ? digits[index] = MIN : digits[index]--"
        >
          <img
            src="../assets/icons/chevron-down.svg"
            class="number-picker__chevron"
            :class="{
              'number-picker__chevron--disabled': digits[index] <= MIN && digits[index] !== null
            }"
          />
        </button>
      </div>
    </div>
    <div class="number-picker__action">
      <div v-if="isCurrentField" class="number-picker__points">{{ field.points?.toFixed(1) }}</div>
      <button
        v-else
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