<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useNumbers } from '../composables'

const emit = defineEmits(['close'])
const { numbersCount, setNumbersCount, NUMBERS_COUNT } = useNumbers()

const showContent = ref(false)

const handleClose = () => {
  showContent.value = false
  setTimeout(() => emit('close'), 500)
}

onMounted(() => {
  showContent.value = true
})

</script>

<template>
  <div class="drawer">
    <Transition name="fade">
      <div
        v-if="showContent"
        class="drawer__overlay"
        @click="handleClose"
      />
    </Transition>
    <Transition name="slide-right">
      <div
        v-if="showContent"
        class="drawer__main"
      >
        <button class="drawer__close" @click="handleClose">
          close
        </button>
        <form>
          <label for="numbers-count">
            numbers count:
          </label>
          <input
            id="numbers-count"
            :value="numbersCount"
            type="number"
            @change="setNumbersCount($event.target?.value || NUMBERS_COUNT)"
          >
        </form>
      </div>
    </Transition>
  </div>
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
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 18rem;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 1rem;
    background-color: white;
  }

  &__close {
    margin-left: auto;
    margin-bottom: 2rem;
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