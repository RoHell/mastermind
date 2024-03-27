<script setup lang="ts">
interface Props {
  numbers: number[] | string[]
}

defineProps<Props>()
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
    height: 100%;
    flex-grow: 1;

    :slotted(input) {
      width: 100%;
      min-height: 100%;
      text-align: center;
      background-color: transparent;
      border: none;
      font-size: 1.5rem;
      aspect-ratio: 1;
    }
  }

  &__digit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    width: 100%;
    height: 100%;
    max-width: var(--number-box-height);
    border: 1px solid;
    box-sizing: border-box;
  }

  &__left {
    min-width: var(--number-box-height);
    height: var(--number-box-height);
    display: flex;
    place-content: center;
    align-items: center;
    padding-left: 1rem;
  }

  &__right {
    left: 100%;
    font-size: 1.5rem;
    min-width: var(--number-box-height);
    height: var(--number-box-height);
    padding-right: 1rem;
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