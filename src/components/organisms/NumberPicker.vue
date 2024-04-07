<script setup lang="ts">
import { useNumbers } from '../../composables'

import NumberWrapper from '../molecules/NumberWrapper.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

const emit = defineEmits(['submit'])

const {
  DEFAULT_NUMBERS_RANGE,
  numbersRange,
  pickedNumbers,
  gameNumber,
  SLIDES_PER_VIEW
} = useNumbers()

const onSubmit = () => {
  emit('submit', pickedNumbers.value)
  pickedNumbers.value = [...pickedNumbers.value]
}

const onActiveIndexChange = (event: any, index: number) => {
  pickedNumbers.value[index] = event.realIndex ? DEFAULT_NUMBERS_RANGE - event.realIndex : event.realIndex
}

const onSlideClick = (number: number, index: number) => {
  pickedNumbers.value[index] = number
}
</script>

<template>
  <div class="swipers">
    <NumberWrapper
      :key="gameNumber"
      :numbers="pickedNumbers"
      class="number-picker"
    >
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
            v-for="number in numbersRange"
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
            src="../../assets/icons/play.svg"
            class="number-picker__submit-icon"
            alt="icon"
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
  height: 100%;
}

.swiper {
  width: 100%;
}

.swiper-slide {
  font-size: 0.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, font-size 0.1s ease;

  &-prev, &-next {
    font-size: 0.6em;
    opacity: 0.5;
  }
  &-active {
    font-size: 1em;
    opacity: 1;
  }
}
.number-wrapper {
  height: 100%;
  &:deep(.number-wrapper__digit) {
    background-color: transparent;
    border: none;
    position: relative;
    &:before, &:after {
      content: '';
      position: absolute;
      box-shadow: var(--box-shadow);
      width: 100%;
      aspect-ratio: 1;
    }
  }
}
.number-picker {
  &__submit {
    max-width: var(--number-box-height);
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
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