<script setup lang="ts">
import { computed, ref } from 'vue'

import TopBar from './components/TopBar.vue'
import NumberHits from './components/NumberHits.vue'
import NumberPicker from './components/NumberPicker.vue'
import WinAnimation from './components/WinAnimation.vue'
import NumberTarget from './components/NumberTarget.vue'

import { useNumbers } from './composables'
import { HitInterface } from './types'

import { useVibrate } from '@vueuse/core'

const {
  NUMBERS_COUNT,
  hitsList,
  targetNumbers,
  resetPickedNumbers,
  generateTargetNumber,
  gameNumber,
 } = useNumbers()

const { vibrate } = useVibrate({ pattern: [300, 100, 300] })

const hitResults = ref<number[]>(Array(NUMBERS_COUNT).fill(0))

const isWin = computed(() => hitsList.value[0]?.points && (hitsList.value[0].points >= NUMBERS_COUNT))

const startGame = () => {
  hitsList.value = []
  resetPickedNumbers()
  gameNumber.value++
  generateTargetNumber()
}

const calculatePoints = (pickedNumbers: number[]) => {
  findExactHits(pickedNumbers)
  findHalfHits(pickedNumbers)
  
  const points = hitResults.value.reduce((a, b) => a + b, 0)
  addResult({ numbers: pickedNumbers, points})
  if (isWin.value) vibrate()
}

const findExactHits = (pickedNumbers: number[]) => {
  targetNumbers.value?.forEach((targetNumber: number, targetIndex: number) => {
    if (targetNumber === pickedNumbers[targetIndex]) hitResults.value[targetIndex] = 1
  })
}

const findHalfHits = (pickedNumbers: number[]) => {
  targetNumbers.value?.forEach((targetNumber: number, targetIndex: number) => {
    const pickIndex = pickedNumbers.findIndex((pickedNumber, pickedIndex) => {
      const isMatch = pickedNumber === targetNumber
      const isNotExactMatch = targetNumber !== pickedNumbers[targetIndex]
      const isResultIndexFree = !hitResults.value[pickedIndex]
      return isMatch && isNotExactMatch && isResultIndexFree
    })
    if (pickIndex > -1) hitResults.value[pickIndex] = 0.5
  })
}

const addResult = (hit: HitInterface) => {
  hitsList.value.unshift(hit)
  hitResults.value = Array(NUMBERS_COUNT).fill(0)
}
</script>

<template>
  <header class="mastermind__header">
    <TopBar>
      <template #left>
        <button
          v-if="(targetNumbers.length && hitsList.length) || isWin"
          type="button"
          @click="startGame"
        >
          <img
            src="./assets/icons/reload.svg"
            width="18"
            height="18"
          />
        </button>
      </template>

      <span class="mastermind__logo">
        <b>Master</b>
        <i>mind</i>
      </span>

      <template #right>
        <button
          type="button"
          @click=""
        >
          <img
            src="./assets/icons/more.svg"
            width="24"
            height="24"
          />
        </button>
      </template>
    </TopBar>
  </header>

  <main>
    <TransitionGroup
      v-if="targetNumbers.length"
      name="list"
      appear
      mode="out-in"
      tag="div"
      class="mastermind__game"
    >

      <TransitionGroup
        key="number-hits"
        name="list"
        tag="div"
        class="mastermind__rounds"
      >
        <NumberHits
          v-for="(hit, index) in hitsList"
          :key="hitsList.length - index"
          :hit="hit"
          :round="hitsList.length - index"
        />
      </TransitionGroup>

      <Transition
        name="fade"
        key="target-picker"
        mode="out-in"
        tag="div"
      >
        <div class="mastermind__win" v-if="isWin">
          <NumberTarget :numbers="targetNumbers" key="number-target" />
          <WinAnimation key="win-animation" />
        </div>
        <NumberPicker
          v-else
          @submit="calculatePoints"
        />
      </Transition>
    </TransitionGroup>
    <div v-else class="mastermind__intro">
      v 0.01
      <button
        type="button"
        class="mastermind__play"
        @click="startGame"
      >Play</button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.mastermind {
  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
    height: var(--top-bar-height);
    transition: 0.2s ease-in;
    box-shadow: 0 1px 4px 1px rgba(#012162, 0.2);
  }

  &__game {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.3rem;
    height: calc(100% - 2*var(--top-bar-height));
    margin: var(--top-bar-height) 0;
  }

  &__rounds {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 0.5rem;
    margin: auto 0 -2.3rem;
    overflow: auto;
    padding: 0.5rem 1rem 0;
  }

  &__intro {
    margin: auto;
  }

  &__play {
    border-radius: 8px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--text-color);
    color: var(--background-color);
  }

  &__logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: 1.5rem;
  }

  &__win {
    display: flex;
    justify-content: center;
    margin-top: 2.3rem;
  }
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(4rem);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
