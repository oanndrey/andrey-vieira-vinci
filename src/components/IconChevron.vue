<script setup>
// seta do design (Figma): aponta para cima por padrão
defineProps({
  dir: { type: String, default: 'up' },
})
</script>

<template>
  <svg class="chevron" :class="`chevron--${dir}`" viewBox="0 0 35 23" aria-hidden="true">
    <path d="M17.5 0L0 17.685L5.259 23L17.5 10.626L29.741 23L35 17.685L17.5 0Z" />
  </svg>
</template>

<style scoped>
.chevron {
  fill: currentColor;
  flex-shrink: 0;
  transition: transform 0.25s;
}

.chevron--right {
  transform: rotate(90deg);
}

.chevron--down {
  transform: rotate(180deg);
}
</style>
