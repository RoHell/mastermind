import { ref } from "vue"
import { HitInterface } from '../types'

const NUMBERS_COUNT = 4
const NUMBERS_RANGE = 10
const MIN = 0
const MAX = NUMBERS_RANGE - 1

const pickedNumbers = ref<number[]>(Array(NUMBERS_COUNT).fill(0))

const gameNumber = ref(0)

export const useNumbers = () => {
  const hitsList = ref<HitInterface[]>([])
  const targetNumbers = ref<number[]>([])
  
  const generateTargetNumber = () => {
    targetNumbers.value = Array.from({ length: NUMBERS_COUNT }, () => Math.floor(Math.random() * NUMBERS_RANGE))
  };

  const numbersRange = (start = 1, stop = MAX, step = 1) => [0 , ...Array.from({ length: (stop - start) / 1 + step }, (_,index) => stop - index * step)];
  // const numbersRange = (start = MAX, stop = MIN, step = 1) => Array.from({ length: (s - start) / 1 + step }, (_,index) => start + index * step);

  const resetPickedNumbers = () => {
    pickedNumbers.value = Array(NUMBERS_COUNT).fill(0)
  }

  return {
    NUMBERS_COUNT,
    NUMBERS_RANGE,
    MIN,
    MAX,
    hitsList,
    targetNumbers,
    pickedNumbers,
    gameNumber,
    generateTargetNumber,
    numbersRange,
    resetPickedNumbers
  }
}