import { ref } from "vue"
import { HitInterface } from '../types'

const NUMBERS_COUNT = 4
const NUMBERS_RANGE = 10
const MIN = 0
const MAX = NUMBERS_RANGE - 1

export const useNumbers = () => {
  const hitsList = ref<HitInterface[]>([])
  const targetNumbers = ref<number[]>([])
  
  const generateTargetNumber = () => {
    targetNumbers.value = Array.from({ length: NUMBERS_COUNT }, () => Math.floor(Math.random() * NUMBERS_RANGE))
  };
  return {
    NUMBERS_COUNT,
    NUMBERS_RANGE,
    MIN,
    MAX,
    hitsList,
    targetNumbers,
    generateTargetNumber,
  }
}