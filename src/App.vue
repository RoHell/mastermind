<script setup lang="ts">
import { ref } from 'vue'

import BaseButton from './components/atoms/BaseButton.vue'
import TopBar from './components/molecules/TopBar.vue'
import NumberHits from './components/organisms/NumberHits.vue'
import NumberPicker from './components/organisms/NumberPicker.vue'
import MenuDrawer from './components/organisms/MenuDrawer.vue'

import { useNumbers } from './composables'

const {
  numbersCount,
  SLIDES_PER_VIEW,
  hitsList,
  resetPickedNumbers,
  generateTargetNumber,
  gameNumber,
  isWin,
  calculatePoints,
 } = useNumbers()

const isMenuDrawerOpen = ref(false)

const startGame = () => {
  hitsList.value = []
  resetPickedNumbers()
  gameNumber.value++
  generateTargetNumber()
}

generateTargetNumber()
</script>

<template>
  <header class="mastermind__header">
    <TopBar>
      <span class="mastermind__logo">
        <b>Master</b>
        <i>mind</i>
      </span>

      <template #right>
        <button
          type="button"
          @click="isMenuDrawerOpen = true"
        >
          <img
            src="./assets/icons/more.svg"
            width="24"
            height="24"
            alt="three dots icon"
          />
        </button>
      </template>
    </TopBar>
  </header>

  <main>
    <TransitionGroup
      name="list"
      appear
      mode="out-in"
      tag="div"
      class="mastermind__game"
    >

      <TransitionGroup
        key="number-hits"
        name="list"
        tag="div"
        class="mastermind__rounds"
      >
        <NumberHits
          v-for="(hit, index) in hitsList"
          :key="hitsList.length - index"
          :hit="hit"
          :round="hitsList.length - index"
        />
      </TransitionGroup>

      <Transition
        name="fade"
        key="target-picker"
        mode="out-in"
        tag="div"
        class="mastermind__target-picker"
      >
        <div class="mastermind__win" v-if="isWin">
          <BaseButton
            label="Play again"
            @click="startGame"
          />
        </div>
        <NumberPicker
          v-else
          :key="numbersCount"
          @submit="calculatePoints"
        />
      </Transition>
    </TransitionGroup>
  </main>

  <MenuDrawer
    :show="isMenuDrawerOpen"
    @close="isMenuDrawerOpen = false"
    @change="startGame"
    @play="startGame"
  />
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.mastermind {
  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
    height: var(--top-bar-height);
    transition: 0.2s ease-in;
    box-shadow: 0 1px 4px 1px rgba(#012162, 0.2);
  }

  &__game {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--number-box-height);
    width: 100%;
    height: calc(100% - var(--top-bar-height));
    margin: var(--top-bar-height) 0 1rem;
  }

  &__rounds {
    display: flex;
    flex-direction: column-reverse;
    flex: 1;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    margin-bottom: calc(var(--number-box-height) * -1);
    overflow: auto;
    padding: 0.5rem 0 0.2rem;
    width: 100%;
  }

  &__logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: 1.5rem;
  }

  &__win {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__target-picker {
    width: 100%;
    height: calc(v-bind(SLIDES_PER_VIEW)*2.3rem);
  }
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(4rem);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
