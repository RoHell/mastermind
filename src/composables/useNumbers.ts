import { computed, ref } from "vue"
import { HitInterface } from '../types'

const DEFAULT_NUMBERS_COUNT = 4
const DEFAULT_NUMBERS_RANGE = 10
const MIN = 1
const MAX = DEFAULT_NUMBERS_RANGE - 1
const SLIDES_PER_VIEW = 3

const gameNumber = ref(0)
const targetNumbers = ref<number[]>([])
const hitsList = ref<HitInterface[]>([])
const numbersCount = ref<number>(DEFAULT_NUMBERS_COUNT)

export const useNumbers = () => {
  
  const pickedNumbers = ref<number[]>(Array(numbersCount.value).fill(0))
  const generateTargetNumber = () => {
    targetNumbers.value = Array.from({ length: numbersCount.value }, () => Math.floor(Math.random() * DEFAULT_NUMBERS_RANGE))
  };

  const numbersRange = computed(() => {
    const start = 1
    const stop = MAX
    const step = 1
    const rangeLength = (stop - start) / 1 + step
    const numbers = Array.from({ length: rangeLength }, (_,index) => stop - index * step)
    return [0 , ...numbers]
  });
  const resetPickedNumbers = () => {
    pickedNumbers.value = Array(numbersCount.value).fill(0)
  }

  const setNumbersCount = (count: number = DEFAULT_NUMBERS_COUNT) => {
    if ((+count < 1) || (+count > 10)) return
    numbersCount.value = +count
  }

  return {
    numbersCount,
    DEFAULT_NUMBERS_COUNT,
    DEFAULT_NUMBERS_RANGE,
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