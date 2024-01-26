<script setup lang="ts">
import TopBar from './components/TopBar.vue'
</script>

<template>
  <header>
    <TopBar />
  </header>
  <main>
    
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--top-bar-height);
  width: 100%;
  background-color: gray;
  padding: 0 2rem;
  box-sizing: border-box;
}

main {
  position: relative;
  top: var(--top-bar-height);
  height: calc(100% - var(--top-bar-height));
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
}
</style>
