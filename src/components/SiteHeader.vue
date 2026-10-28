<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import VinciLogo from './VinciLogo.vue'
import MegaMenu from './MegaMenu.vue'
import { modelos } from '../data/modelos'
import { testDrive } from '../data/testDrive'

const route = useRoute()
const megaAberto = ref(false)
const mobileAberto = ref(false)
let timer = null

function abrirMega() {
  clearTimeout(timer)
  megaAberto.value = true
}

function fecharMega(atraso = 0) {
  clearTimeout(timer)
  timer = setTimeout(() => (megaAberto.value = false), atraso)
}

function agendar() {
  mobileAberto.value = false
  testDrive.abrir()
}

watch(
  () => route.fullPath,
  () => {
    megaAberto.value = false
    mobileAberto.value = false
  },
)

watch(mobileAberto, (aberto) => {
  document.body.style.overflow = aberto ? 'hidden' : ''
})
</script>

<template>
  <header class="header" @mouseleave="fecharMega(150)">
    <div class="header__inner container">
      <VinciLogo />

      <nav class="nav" aria-label="Principal">
        <RouterLink to="/" class="nav__link">Home</RouterLink>
        <RouterLink to="/#sobre" class="nav__link">Sobre</RouterLink>
        <button
          type="button"
          class="nav__link"
          :class="{ 'nav__link--active': megaAberto }"
          :aria-expanded="megaAberto"
          aria-haspopup="true"
          @mouseenter="abrirMega"
          @click="megaAberto ? fecharMega() : abrirMega()"
        >
          Veículos
        </button>
        <RouterLink to="/#servicos" class="nav__link">Serviços</RouterLink>
        <button type="button" class="nav__link" @click="agendar">Test Drive</button>
      </nav>

      <button
        type="button"
        class="burger"
        :class="{ 'burger--open': mobileAberto }"
        :aria-expanded="mobileAberto"
        aria-label="Abrir menu"
        @click="mobileAberto = !mobileAberto"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <Transition name="drop">
      <MegaMenu v-if="megaAberto" @mouseenter="abrirMega" @fechar="fecharMega()" />
    </Transition>

    <Transition name="fade">
      <nav v-if="mobileAberto" class="mobile" aria-label="Menu mobile">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/#sobre">Sobre</RouterLink>
        <p class="mobile__label">Veículos</p>
        <RouterLink v-for="m in modelos" :key="m.id" :to="`/modelo/${m.id}`" class="mobile__modelo">
          <img :src="m.imagem" :alt="''" />
          {{ m.curto }}
        </RouterLink>
        <RouterLink to="/#servicos">Serviços</RouterLink>
        <button type="button" @click="agendar">Test Drive</button>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #fff;
  height: var(--header-h);
}

.header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav {
  display: flex;
  align-items: center;
  gap: clamp(32px, 6vw, 100px);
  height: 100%;
}

.nav__link {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: var(--ink);
  transition: color 0.2s;
}

.nav__link:hover {
  color: var(--red);
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 2px;
  background: var(--ink);
  transform: translateX(-50%);
  transition: width 0.25s;
}

.nav__link--active::after {
  width: 100%;
}

.burger {
  display: none;
  width: 32px;
  height: 24px;
  position: relative;
}

.burger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--ink);
  transition: transform 0.25s, opacity 0.25s, top 0.25s;
}

.burger span:nth-child(1) { top: 2px; }
.burger span:nth-child(2) { top: 11px; }
.burger span:nth-child(3) { top: 20px; }

.burger--open span:nth-child(1) { top: 11px; transform: rotate(45deg); }
.burger--open span:nth-child(2) { opacity: 0; }
.burger--open span:nth-child(3) { top: 11px; transform: rotate(-45deg); }

.mobile {
  position: fixed;
  inset: var(--header-h) 0 0 0;
  background: #fff;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 16px var(--gutter) 40px;
  border-top: 1px solid var(--line);
}

.mobile > a,
.mobile > button {
  font-size: 32px;
  line-height: 1;
  padding: 16px 0;
  text-align: left;
  border-bottom: 1px solid var(--line);
}

.mobile__label {
  font-size: 14px;
  color: var(--gray-light);
  padding-top: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mobile > .mobile__modelo {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
  padding: 8px 0;
}

.mobile__modelo img {
  width: 110px;
  height: 56px;
  object-fit: contain;
}

.drop-enter-active,
.drop-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .nav,
  .header :deep(.mega) {
    display: none;
  }

  .burger {
    display: block;
  }

  .header :deep(.logo) {
    transform: scale(0.85);
    transform-origin: left center;
  }
}
</style>
