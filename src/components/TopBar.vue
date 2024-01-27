<script setup lang="ts">
interface Props {
  digits: number[]
}

defineProps<Props>()
const emit = defineEmits(['new'])
</script>

<template>
  <div class="top-bar">
    <slot name="left" />
    <div class="top-bar__digits">
      <span
        v-for="digit in digits"
        class="top-bar__digit"
      >
        {{ digit }}
      </span>
    </div>

    <div v-if="$slots['right']" class="top-bar__right">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  gap: 2rem;

  &__logo, &__digits {
    font-weight: 700;
  }

  &__digits {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 2rem;
    font-size: 1.5rem;
  }

  &__right {
    margin-left: auto;
  }
}
</style>