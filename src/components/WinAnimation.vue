<template>
  <div class="win-animation">
    <img
      src="https://gifdb.com/images/high/happy-win-trophy-with-confetti-tb52kqiyvytfvobs.gif"
      alt="confetti cup"
      class="win-animation__cup"
    />
    <!-- <img
      src="../assets/confetti.gif"
      alt="confetti"
      class="win-animation__confetti"
    /> -->
  </div>
</template>

<style lang="scss" scoped>
.win-animation {
  position: fixed;
  align-items: center;
  justify-content: center;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  

  &__cup {
    position: absolute;
    width: 8rem;
    bottom: 2rem;
  }

  &__confetti {
    position: absolute;
    top: var(--top-bar-height);
    height: 100%;
    object-fit: cover;
  }
}
</style>