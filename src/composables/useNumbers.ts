import { ref } from "vue"
import { HitInterface } from '../types'

const NUMBERS_COUNT = 4
const NUMBERS_RANGE = 10
const MIN = 0
const MAX = NUMBERS_RANGE - 1
const SLIDES_PER_VIEW = 3


const numbersCount = ref<number>(NUMBERS_COUNT)
const pickedNumbers = ref<number[]>(Array(numbersCount.value).fill(0))
const gameNumber = ref(0)
const targetNumbers = ref<number[]>([])
const hitsList = ref<HitInterface[]>([])

export const useNumbers = () => {

  const generateTargetNumber = () => {
    targetNumbers.value = Array.from({ length: numbersCount.value }, () => Math.floor(Math.random() * NUMBERS_RANGE))
  };

  const numbersRange = (start = 1, stop = MAX, step = 1) => [0 , ...Array.from({ length: (stop - start) / 1 + step }, (_,index) => stop - index * step)];
  // const numbersRange = (start = MAX, stop = MIN, step = 1) => Array.from({ length: (s - start) / 1 + step }, (_,index) => start + index * step);

  const resetPickedNumbers = () => {
    pickedNumbers.value = Array(numbersCount.value).fill(0)
  }

  const setNumbersCount = (count: number) => {
    console.log('count', +count)
    if ((+count < 1) || (+count > 10)) return
    numbersCount.value = +count
  }

  return {
    numbersCount,
    NUMBERS_RANGE,
    MIN,
    MAX,
    SLIDES_PER_VIEW,
    hitsList,
    targetNumbers,
    pickedNumbers,
    gameNumber,
    generateTargetNumber,
    numbersRange,
    resetPickedNumbers,
    setNumbersCount
  }
}