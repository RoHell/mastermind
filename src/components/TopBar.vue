<template>
  <div class="top-bar">
    <slot name="left" />

    <slot />

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

  &__right {
    margin-left: auto;
  }
}
</style>