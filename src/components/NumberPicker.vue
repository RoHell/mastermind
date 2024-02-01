<script setup lang="ts">
import { useNumbers } from '../composables'

import NumberWrapper from './NumberWrapper.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation'

const emit = defineEmits(['submit'])

const {
  NUMBERS_RANGE,
  numbersRange,
  pickedNumbers,
  gameNumber,
} = useNumbers()

const SLIDES_PER_VIEW = 3

const onSubmit = () => {
  emit('submit', pickedNumbers.value)
  pickedNumbers.value = [...pickedNumbers.value]
}

const onActiveIndexChange = (event: any, index: number) => {
  pickedNumbers.value[index] = event.realIndex ? NUMBERS_RANGE - event.realIndex : event.realIndex
}

const onSlideClick = (number: number, index: number) => {
  pickedNumbers.value[index] = number
}

</script>

<template>
  <div class="swipers">
    <NumberWrapper class="number-picker" :numbers="pickedNumbers">
      <template #number="{ index }">
        <swiper
          :key="gameNumber"
          direction="vertical"
          :slides-per-view="SLIDES_PER_VIEW"
          centeredSlides
          @active-index-change="onActiveIndexChange($event, index)"
          watch-slides-progress
          loop
        >
          <swiper-slide
            v-for="number in numbersRange()"
            @click="onSlideClick(number, index)"
          >
            {{ number  }}
          </swiper-slide>
        </swiper>
      </template>
      <template #right>
        <button
          type="button"
          class="number-picker__submit"
          @click="onSubmit"
        >
          <img
            src="../assets/icons/play.svg"
            class="number-picker__submit-icon"
          >
        </button>
      </template>
    </NumberWrapper>
  </div>
  
</template>

<style lang="scss" scoped>

.swipers {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.swiper {
  width: 2.3rem;
  height: calc(v-bind(SLIDES_PER_VIEW)*2.3rem);
}

.swiper-slide {
  font-size: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  box-sizing: border-box;
  transition: opacity 0.3s ease-in-out, font-size 0.1s ease;

  &-prev, &-next {
    font-size: 1rem;
    opacity: 0.5;
  }
  &-active {
    font-size: 1.5rem;
    opacity: 1;
  }
}
.number-wrapper {
  &:deep(.number-wrapper__digit) {
    height: auto;
    background-color: transparent;
    border: none;
    position: relative;
    &:before, &:after {
      content: '';
      position: absolute;
      top: 33.33%;
      height: 2.3rem;
      border: 1px solid;
      width: 100%;
      box-sizing: border-box;
    }
  }
}
.number-picker {
  &__submit {
    width: 2.3rem;
    height: 2.3rem;
    background-color: var(--background-color);
    transition: 0.2s ease-in;
    &:disabled {
      pointer-events: none;
      opacity: 0.3;
    }
  }

  &__submit-icon {
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
  }
}
</style>