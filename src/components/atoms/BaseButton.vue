<script setup lang="ts">
interface Props {
  label: string
}

defineProps<Props>()

const emit = defineEmits(['click'])

</script>

<template>
  <button
    type="button"
    class="base-button"
    @click="emit('click')"
  >
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
.base-button {
  display: flex;
  justify-content: center;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--text-color);
  color: var(--background-color);
  width: fit-content;
}
</style>