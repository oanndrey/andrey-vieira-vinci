<script setup>
import IconChevron from './IconChevron.vue'

defineProps({
  pergunta: { type: String, required: true },
  resposta: { type: String, required: true },
  aberto: { type: Boolean, default: false },
})
defineEmits(['alternar'])
</script>

<template>
  <div class="faq-item" :class="{ 'faq-item--open': aberto }">
    <button type="button" class="faq-item__q" :aria-expanded="aberto" @click="$emit('alternar')">
      <span>{{ pergunta }}</span>
      <IconChevron :dir="aberto ? 'up' : 'down'" class="faq-item__icon" />
    </button>
    <div class="faq-item__a">
      <div>
        <p>{{ resposta }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-item {
  border-bottom: 1px solid var(--line);
}

.faq-item__q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  padding: 26px 0;
  text-align: left;
  font-size: clamp(20px, 2vw, 26px);
  line-height: 32px;
  color: var(--ink);
}

.faq-item__q:hover {
  color: var(--red);
}

.faq-item__icon {
  width: 24px;
  height: 16px;
}

/* animação de altura com grid 0fr -> 1fr */
.faq-item__a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.faq-item__a > div {
  overflow: hidden;
}

.faq-item--open .faq-item__a {
  grid-template-rows: 1fr;
}

.faq-item__a p {
  padding: 0 56px 26px 0;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 28px;
  color: var(--gray);
}
</style>
