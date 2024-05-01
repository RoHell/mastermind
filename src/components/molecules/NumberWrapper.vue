<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';

interface Props {
  numbers: number[] | string[]
}

defineProps<Props>()

const setFontSize = () => {
  const digitContainers = computed(() => document.querySelectorAll('.number-wrapper__digit') || []) as any
  if (!digitContainers.value) return
  digitContainers.value.forEach((digit: any) => {
    const relFonSize = digit.offsetWidth*0.05
    digit.style.fontSize = relFonSize + 'rem'
    digit.style.height = digit.offsetWidth * 3 + 'px'

  })
}

onMounted(() => {
  setFontSize()
  document.addEventListener('resize', setFontSize)
})

onBeforeUnmount(() => document.removeEventListener('resize', setFontSize))

</script>

<template>
  <div class="number-wrapper">
    <div class="number-wrapper__left">
      <slot name="left" />
    </div>
    <div class="number-wrapper__digits">
      <div
        v-for="(number, index) in numbers"
        :key="index"
        ref="digitRef"
        class="number-wrapper__digit"
      >

        <slot
          name="number"
          :number="number"
          :index="index"
        />
      </div>
    </div>
    <div class="number-wrapper__right">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.number-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &__digits {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-grow: 1;

    :slotted(input) {
      width: 100%;
      min-height: 100%;
      text-align: center;
      background-color: transparent;
      border: none;
      font-size: 1em;
      aspect-ratio: 1;
    }
  }

  &__digit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: var(--number-box-height);
    border-radius: 0.2rem;
    box-sizing: border-box;
    background-color: transparent;
    transition: background-color 0.3s ease-in-out;
  }

  &__left {
    display: flex;
    place-content: center;
    align-items: center;
    padding-left: 1rem;
    width: 100%;
    height: 100%;
    max-width: var(--number-box-height);
    max-height: var(--number-box-height);
  }

  &__right {
    display: flex;
    place-content: center;
    align-items: center;
    left: 100%;
    padding-right: 1rem;
    width: 100%;
    height: 100%;
    max-width: var(--number-box-height);
    max-height: var(--number-box-height);
    font-size: 1.5em;
  }
}
/* Chrome, Safari, Edge, Opera */
:slotted(input::-webkit-outer-spin-button),
:slotted(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
:slotted(input[type=number]) {
  -moz-appearance: textfield;
}
</style>