<script setup lang="ts">
interface Props {
  show: boolean
}

defineProps<Props>()

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="drawer">
      <Transition name="fade">
        <div
          v-if="show"
          class="drawer__overlay"
          @click="handleClose"
        />
      </Transition>
      <Transition name="slide-right">
        <div
          v-if="show"
          class="drawer__main"
        >
          <slot />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.drawer {
  position: relative;
  z-index: 20;

  &__overlay {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(black, 0.3);
  }

  &__main {
    position: fixed;
    width: 100%;
    max-width: 18rem;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-right-enter-from,
  .slide-right-leave-to {
    transform: translateX(100%);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
