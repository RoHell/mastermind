<script setup lang="ts">
interface Props {
  numbers: number[]
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

        <slot name="number" :number="number" :index="index" />
    </div>
    </div>
    <div class="number-wrapper__right">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.number-wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;

  &__digits {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    :slotted(input) {
      font-size: 1.5rem;
      text-align: center;
      width: 2.3rem;
      height: 2.3rem;
      border: 1px solid;
    }
  }

  &__digit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__left {
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    place-content: center;
    align-items: center;
  }

  &__right {
    left: 100%;
    font-size: 1.5rem;
    width: 2.3rem;
    height: 2.3rem;
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