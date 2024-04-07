<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useNumbers } from '../../composables'
import BaseButton from '../atoms/BaseButton.vue';

const emit = defineEmits(['close', 'play'])
const {
  numbersCount,
  setNumbersCount,
  MIN,
  MAX,
  targetNumbers,
  hitsList,
  isWin,
  
} = useNumbers()

const showContent = ref(false)

const handleClose = () => {
  showContent.value = false
  setTimeout(() => emit('close'), 500)
}

onMounted(() => {
  showContent.value = true
})

const onNumbersCountChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const count = +target?.value
  setNumbersCount(count)

}
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
        <form class="drawer__numbers-count">
          <label for="numbers-count">
            {{ `numbers count: ${numbersCount}` }}
          </label>
          <input
            id="numbers-count"
            :value="numbersCount"
            type="range"
            :min="MIN"
            :max="MAX"
            @input="onNumbersCountChange"
          >
        </form>
        <BaseButton
          v-if="(targetNumbers.length && hitsList.length) || isWin"
          label="Play again"
          class="drawer__play-again"
          @click="emit('play')"
        />
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
    gap:2rem;
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
  }

  &__numbers-count {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: start;
  }

  &__play-again {
    display: flex;
    justify-content: center;
    margin: auto;
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