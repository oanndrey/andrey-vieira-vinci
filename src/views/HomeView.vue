<script setup>
import IconChevron from '../components/IconChevron.vue'
import { buscarModelo } from '../data/modelos'
import { testDrive } from '../data/testDrive'
import heroImg from '../assets/img/hero-home.webp'
import estrada1 from '../assets/img/estrada-1.webp'
import estrada2 from '../assets/img/estrada-2.webp'

const destaques = [buscarModelo('v2'), buscarModelo('v1')]

const menu = [
  { id: 'servicos', texto: 'Agende um test drive', acao: () => testDrive.abrir() },
  { id: 'ofertas', texto: 'veja ofertas', to: '/modelo/v3' },
  { id: 'lojas', texto: 'encontre uma loja', to: '/#contato' },
]
</script>

<template>
  <section class="hero">
    <img :src="heroImg" alt="VINCI Model V3 recarregando em um ponto de recarga" class="hero__bg" fetchpriority="high" />
    <div class="hero__overlay"></div>
    <div class="hero__content container">
      <h1>VINCI MODEL V3</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever.
      </p>
      <div class="hero__actions">
        <RouterLink to="/modelo/v3" class="btn btn--red">Modelos</RouterLink>
        <button type="button" class="btn btn--outline-light" @click="testDrive.abrir('v3')">Test Drive</button>
      </div>
    </div>
  </section>

  <section class="modelos container" aria-label="Modelos">
    <article v-for="m in destaques" :key="m.id" class="modelo">
      <header class="modelo__top">
        <h2>VINCI<br />{{ m.nome.replace('VINCI ', '') }}</h2>
        <dl class="ficha">
          <template v-for="(valor, chave) in m.ficha" :key="chave">
            <dt>{{ chave }}</dt>
            <dd>{{ valor }}</dd>
          </template>
        </dl>
      </header>
      <RouterLink :to="`/modelo/${m.id}`" class="modelo__img">
        <img :src="m.detalhe" :alt="m.nome" loading="lazy" />
      </RouterLink>
      <footer class="modelo__bottom">
        <p>{{ m.chamada }}</p>
        <RouterLink :to="`/modelo/${m.id}`" class="conheca">CONHEÇA</RouterLink>
      </footer>
    </article>
  </section>

  <img :src="estrada1" alt="Carro elétrico em uma estrada na floresta" class="faixa" loading="lazy" />

  <section class="menu container" aria-label="Atalhos">
    <template v-for="item in menu" :key="item.id">
      <button v-if="item.acao" :id="item.id" type="button" class="menu__item" @click="item.acao">
        <span>{{ item.texto }}</span>
        <IconChevron dir="right" class="menu__seta" />
      </button>
      <RouterLink v-else :id="item.id" :to="item.to" class="menu__item">
        <span>{{ item.texto }}</span>
        <IconChevron dir="right" class="menu__seta" />
      </RouterLink>
    </template>
  </section>

  <img :src="estrada2" alt="Carro elétrico em uma rodovia ao entardecer" class="faixa" loading="lazy" />
</template>

<style scoped>
.hero {
  position: relative;
  height: clamp(520px, 44.2vw, 637px);
  color: #fff;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  width: 78%;
  background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.48));
}

.hero__content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 74px;
}

.hero h1 {
  font-size: clamp(44px, 5vw, 72px);
  line-height: 1;
}

.hero p {
  max-width: 706px;
  margin-top: 30px;
  font-family: var(--font-body);
  font-size: clamp(16px, 1.4vw, 20px);
  line-height: 1.8;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  margin-top: 40px;
}

.modelos {
  display: grid;
  grid-template-columns: 623fr 640fr;
  gap: 97px;
  padding-top: 74px;
  padding-bottom: 74px;
}

.modelo {
  display: flex;
  flex-direction: column;
}

.modelo__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.modelo__top h2 {
  font-size: 24px;
  line-height: 1;
}

.ficha {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 32px;
  margin: 0;
  font-size: 18px;
  line-height: 24px;
}

.ficha dd {
  margin: 0;
  color: var(--gray-light);
}

.modelo__img {
  display: block;
  aspect-ratio: 529 / 425;
  width: 85%;
  margin: -16px auto 0;
}

.modelo__img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s;
}

.modelo__img:hover img {
  transform: scale(1.03);
}

.modelo__bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  font-size: 20px;
  line-height: 1;
}

.modelo__bottom p {
  color: #685757;
}

.conheca {
  position: relative;
  color: var(--ink);
  padding-bottom: 4px;
}

.conheca::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s;
}

.conheca:hover::after {
  transform: scaleX(1);
}

.faixa {
  width: 100%;
  height: clamp(280px, 41.2vw, 593px);
  object-fit: cover;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 43px;
  padding-top: 74px;
  padding-bottom: 74px;
}

.menu__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  text-align: left;
  font-size: clamp(36px, 5vw, 72px);
  line-height: 1;
  transition: color 0.2s;
}

.menu__seta {
  width: 35px;
  height: 23px;
}

.menu__item:hover {
  color: var(--red);
}

.menu__item:hover .menu__seta {
  transform: rotate(90deg) translateY(-8px);
}

@media (max-width: 900px) {
  .modelos {
    grid-template-columns: 1fr;
    gap: 64px;
  }

  .menu {
    gap: 32px;
  }

  .menu__seta {
    width: 24px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .ficha {
    font-size: 15px;
    column-gap: 14px;
  }

  .modelo__bottom {
    font-size: 17px;
  }
}
</style>
