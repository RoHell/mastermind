<script setup lang="ts">
import { useNumbers } from '../../composables'
import BaseButton from '../atoms/BaseButton.vue';
import Drawer from '../molecules/Drawer.vue';

interface Props {
  show: boolean
}

defineProps<Props>()

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

const onClose = () => {
  emit('close')
}

const onNumbersCountChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const count = +target?.value
  setNumbersCount(count)
}
</script>

<template>
  <Drawer :show="show" @close="onClose">
    <div class="menu-drawer">
      <button class="menu-drawer__close" @click="onClose">
        close
      </button>
      <form class="menu-drawer__numbers-count">
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
        class="menu-drawer__play-again"
        @click="emit('play')"
      />
    </div>
  </Drawer>
</template>

<style lang="scss" scoped>
.menu-drawer {
  display: flex;
  flex-direction: column;
  gap:2rem;
  height: 100%;
  padding: 1rem;
  background-color: white;

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
}
</style>
