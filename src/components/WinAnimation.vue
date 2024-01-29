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
  position: absolute;
  display: flex;
  bottom: 0;
  width: 8rem;
  bottom: -1rem;

  &__cup {
    width: 8rem;
  }

  // &__confetti {
  //   position: absolute;
  //   top: var(--top-bar-height);
  //   height: 100%;
  //   object-fit: cover;
  // }
}
</style>