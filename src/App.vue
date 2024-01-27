<script setup lang="ts">
import { computed, ref } from 'vue'
import TopBar from './components/TopBar.vue'
import GuessField from './components/GuessField.vue'

interface FieldInterface {
  id?: string
  digits: number[] | null[]
  points: number | null
}

const NUMBERS_COUNT = 4

const blankField = {
  digits: [null, null, null, null],
  points: null
}

const randomDigits = ref<number[]>([])

const guessFields = ref<FieldInterface[]>([])

const current = computed<FieldInterface>({
  get: () => guessFields.value[guessFields.value.length - 1],
  set: (value) => value
})

const generateRandomDigits = () => {
  randomDigits.value = Array.from({ length: NUMBERS_COUNT }, () => Math.floor(Math.random() * 10))
};

const addBlankField = () => guessFields.value.push({...blankField})

const startGame = () => {
  guessFields.value = []
  generateRandomDigits()
  addBlankField()
}

const calculatePoints = (digits: number[]) => {
  current.value.digits = digits
  let points = 0
  randomDigits.value?.forEach((digit: number, index: number) => {
    if (digits.includes(digit)) points += 0.5
    if (digits[index] === randomDigits.value[index]) points += 0.5
  })

  current.value.points = points
  addBlankField()
}
</script>

<template>
  <header>
    <TopBar :digits="current?.points !== 4 ? randomDigits : []">
      <template #right>
        <button
          v-if="randomDigits.length"
          class="top-bar__action"
          @click="startGame"
        >
          <img src="./assets/icons/reload.svg" width="24" height="24" />
        </button>
      </template>
    </TopBar>
  </header>
  <main>
    <div v-if="randomDigits.length" class="mastermind__fields">
      <GuessField
        v-for="(field, index) in guessFields"
        :field="field"
        :round="index + 1"
        :reset="!guessFields.length"
        @submit="calculatePoints"
      />
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

.mastermind__fields {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.mastermind__play {
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
</style>
