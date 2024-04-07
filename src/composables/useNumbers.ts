import { computed, ref } from "vue"

import { HitInterface } from '../types'

import { useVibrate } from '@vueuse/core'

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
  const hitResults = ref<number[]>(Array(numbersCount.value).fill(0))
  
  const pickedNumbers = ref<number[]>(Array(numbersCount.value).fill(0))

  const isWin = computed(() => hitsList.value[0]?.points && (hitsList.value[0].points >= numbersCount.value))
  
  const { vibrate } = useVibrate({ pattern: [300, 100, 300] })

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

  const calculatePoints = (pickedNumbers: number[]) => {
    findExactHits(pickedNumbers)
    findHalfHits(pickedNumbers)
    
    const points = hitResults.value.reduce((a, b) => a + b, 0)
    addResult({ numbers: pickedNumbers, points, matchPoints: hitResults.value })
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
    hitResults.value = Array(numbersCount.value).fill(0)
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
    setNumbersCount,
    isWin,
    calculatePoints,
    hitResults,
  }
}