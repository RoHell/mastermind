<script setup lang="ts">
import { computed, ref } from 'vue'
import TopBar from './components/TopBar.vue'
import GuessField from './components/GuessField.vue'

import useNumbers from './composables/useNumbers'

interface FieldInterface {
  id?: string
  numbers: number[] | null[]
  points: number | null
}

const { NUMBERS_COUNT, NUMBERS_RANGE } = useNumbers()

const showAnswer = ref(false)

const blankField = {
  numbers: Array(NUMBERS_COUNT).fill(null),
  points: null
}

const targetNumbers = ref<number[]>([])

const guessFields = ref<FieldInterface[]>([])

const current = computed<FieldInterface>({
  get: () => guessFields.value[guessFields.value.length - 1],
  set: (value) => value
})

const generateRandomDigits = () => {
  targetNumbers.value = Array.from({ length: NUMBERS_COUNT }, () => Math.floor(Math.random() * NUMBERS_RANGE))
};

const addBlankField = () => guessFields.value.push({...blankField})

const startGame = () => {
  guessFields.value = []
  showAnswer.value = false
  generateRandomDigits()
  addBlankField()
}

const calculatePoints = (shotNumbers: number[]) => {
  let hits: number[] = Array(NUMBERS_COUNT).fill(0)

  targetNumbers.value?.forEach((targetNumber: number, index: number) => {
    if (shotNumbers[index] === targetNumbers.value[index]) return hits[index] = 1

    const dI = shotNumbers.findIndex(shotNumber => shotNumber === targetNumber)
    if (dI > -1 && hits[dI] === 0) hits[dI] = 0.5
  })

  const points = hits.reduce((a, b) => a + b, 0)
  current.value.numbers = shotNumbers
  current.value.points = points
  addBlankField()
}
</script>

<template>
  <header>
    <TopBar class="mastermind__top-bar">

      <div v-if="targetNumbers.length" class="mastermind__target">
        <span
        v-if="current.points"
          v-for="number in targetNumbers"
          class="top-bar__digit"
        >
          {{ number }}
        </span>
        <span
          v-else
          v-for="_ in NUMBERS_COUNT"
          class="top-bar__digit"
        >*</span>
      </div>
      <template #right>
        <button
          v-if="targetNumbers.length"
          class="top-bar__action"
          @click="startGame"
        >
          <img src="./assets/icons/reload.svg" width="24" height="24" />
        </button>
      </template>
    </TopBar>
  </header>
  <main>
    <div v-if="targetNumbers.length" class="mastermind__fields">
      <div class="mastermind__rounds">
        <GuessField
          v-for="(field, index) in guessFields"
          :field="field"
          :round="index + 1"
          @submit="calculatePoints"
        />
      </div>
    </div>
    <button v-else class="mastermind__play" @click="startGame">Play</button>
  </main>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--top-bar-height);
  width: 100%;
  background-color: gray;
  padding: 0 1rem;
  box-sizing: border-box;
}

main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  top: var(--top-bar-height);
  height: calc(100vh - var(--top-bar-height));
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.mastermind {
  &__fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  &__rounds {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    overflow: auto;
  }
  &__play {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
    margin: auto;
    &:hover {
      border-color: #646cff;
    }
    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }

  &__top-bar {
    position: relative;
  }

  &__target {
    font-weight: 700;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 2rem;
    font-size: 1.5rem;
  }
}
</style>
