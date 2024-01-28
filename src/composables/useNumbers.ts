import { ref } from "vue"
import { HitInterface, PickedNumbersType } from '../types'

const NUMBERS_COUNT = 4
const NUMBERS_RANGE = 10
const MIN = 0
const MAX = NUMBERS_RANGE - 1

export const useNumbers = () => {
  const hits = ref<HitInterface[]>([])
  
  const pickedNumbers = ref<PickedNumbersType>(Array(NUMBERS_COUNT).fill(null))
  const resetPickedNumbers = () => pickedNumbers.value = Array(NUMBERS_COUNT).fill(null)

  return {
    NUMBERS_COUNT,
    NUMBERS_RANGE,
    MIN,
    MAX,
    pickedNumbers,
    resetPickedNumbers,
    hits
  }
}