<script setup lang="ts">
import { computed, ref } from 'vue'
import TopBar from './components/TopBar.vue'
import NumberHits from './components/NumberHits.vue'
import NumberPicker from './components/NumberPicker.vue'
import NumberWrapper from './components/NumberWrapper.vue'

import { useNumbers } from './composables'
import { HitInterface } from './types'

const { NUMBERS_COUNT, NUMBERS_RANGE, hits } = useNumbers()

const targetNumbers = ref<number[]>([])

const showTargetNumber = computed(() => hits.value[0]?.points && (hits.value[0].points >= NUMBERS_COUNT))

const generateTargetNumber = () => {
  targetNumbers.value = Array.from({ length: NUMBERS_COUNT }, () => Math.floor(Math.random() * NUMBERS_RANGE))
};
const startGame = () => {
  hits.value = []
  generateTargetNumber()
}

const calculatePoints = async (numbers: number[]) => {
  let hitResults: number[] = Array(NUMBERS_COUNT).fill(0)

  targetNumbers.value?.forEach((targetNumber: number, index: number) => {
    if (numbers[index] === targetNumbers.value[index]) return hitResults[index] = 1

    const hitIndex = numbers.findIndex(shotNumber => shotNumber === targetNumber)
    if (hitIndex > -1 && hitResults[hitIndex] === 0) hitResults[hitIndex] = 0.5
  })

  const points = hitResults.reduce((a, b) => a + b, 0)
  await addHit({ numbers, points})
}

const addHit = (hit: HitInterface) => hits.value.unshift(hit)
</script>

<template>
  <header
    class="mastermind__header"
    :class="{
      'mastermind__header--active': targetNumbers.length
    }"
  >
    <TopBar class="mastermind__top-bar">
      <template #left>
        <button
          v-if="targetNumbers.length && hits.length"
          class="top-bar__action"
          @click="startGame"
        >
          <img src="./assets/icons/reload.svg" width="18" height="18" />
        </button>
      </template>

      <div v-if="targetNumbers.length" class="mastermind__target">
        <NumberWrapper
          class="mastermind__target-numbers"
          :numbers="showTargetNumber ? targetNumbers : Array(NUMBERS_COUNT)"
        >
          <template #number="{ number }">
            <span v-if="showTargetNumber">{{ number }}</span>
            <span v-else>?</span>
          </template>
        </NumberWrapper>
      </div>

      <template #right>
        <button
          class="top-bar__action"
          @click=""
        >
          <img src="./assets/icons/more.svg" width="24" height="24" />
        </button>
      </template>
    </TopBar>
  </header>

  <main>
    <div v-if="targetNumbers.length" class="mastermind__fields">
      <TransitionGroup name="list" tag="div" class="mastermind__rounds">
        <NumberHits
          v-for="(field, index) in hits"
          :key="hits.length - index"
          :field="field"
          :round="hits.length - index"
        />
      </TransitionGroup>
      
      <NumberPicker @submit="calculatePoints" />
    </div>
    <button v-else class="mastermind__play" @click="startGame">Play</button>
  </main>
</template>

<style lang="scss" scoped>


main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  top: var(--top-bar-height);
  height: calc(100vh - var(--top-bar-height));
  width: 100%;
  padding: 0 0 1rem;
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
    opacity: 0;
    height: var(--top-bar-height);
    transition: 0.2s ease-in;
    box-shadow: 0 1px 4px 1px rgba(#012162, 0.2);
    &--active {
      opacity: 1;
    }
  }

  &__fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  &__rounds {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 0.5rem;
    margin: auto 0 -2rem;
    overflow: auto;
    padding: 0.5rem 1rem 2rem;
  }
  &__play {
    border-radius: 8px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--text-color);
    color: var(--background-color);
    margin: auto;
  }

  &__target {
    font-weight: 700;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 0.5rem;
    font-size: 1.5rem;
  }
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  // opacity: 0;
  transform: translateY(4rem);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.mastermind__target-numbers::v-deep .number-wrapper__digit {
  border: 1px solid;
  background-color: rgba(white, 0.5);
  width: 2.4rem;
  height: 2.3rem;
  display: flex;
  place-content: center;
  align-items: center;
}
</style>
