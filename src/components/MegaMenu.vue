<script setup>
import { modelos } from '../data/modelos'
import { testDrive } from '../data/testDrive'

const emit = defineEmits(['fechar'])

// duas fileiras: vista lateral e vista de detalhe de cada modelo
const cards = [
  ...modelos.map((m) => ({ modelo: m, img: m.imagem })),
  ...modelos.map((m) => ({ modelo: m, img: m.detalhe })),
]

function agendar(id) {
  emit('fechar')
  testDrive.abrir(id)
}
</script>

<template>
  <div class="mega" @keydown.esc="emit('fechar')">
    <div class="mega__inner container">
      <ul class="mega__grid">
        <li v-for="(card, i) in cards" :key="i" class="mega__card">
          <RouterLink :to="`/modelo/${card.modelo.id}`" class="mega__img" @click="emit('fechar')">
            <img :src="card.img" :alt="card.modelo.nome" loading="lazy" />
          </RouterLink>
          <p class="mega__name">{{ card.modelo.curto }}</p>
          <div class="mega__links">
            <RouterLink :to="`/modelo/${card.modelo.id}`" @click="emit('fechar')">Ver mais</RouterLink>
            <button type="button" @click="agendar(card.modelo.id)">Comprar</button>
          </div>
        </li>
      </ul>

      <nav class="mega__side" aria-label="Navegue">
        <p class="mega__label">NAVEGUE</p>
        <ul>
          <li><RouterLink to="/#ofertas" @click="emit('fechar')">OFERTAS</RouterLink></li>
          <li><button type="button" @click="agendar()">TEST DRIVE</button></li>
          <li><RouterLink to="/#lojas" @click="emit('fechar')">LOJAS</RouterLink></li>
          <li><RouterLink to="/#servicos" @click="emit('fechar')">SERVIÇOS</RouterLink></li>
          <li><RouterLink to="/#sac" @click="emit('fechar')">SAC</RouterLink></li>
          <li><RouterLink to="/#sobre" @click="emit('fechar')">PRIVACIDADE</RouterLink></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.mega {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  box-shadow: 0 7px 27px -9px rgba(0, 0, 0, 0.13);
}

.mega__inner {
  display: grid;
  grid-template-columns: 1fr 453px;
  gap: 40px;
  padding-top: 26px;
  padding-bottom: 26px;
}

.mega__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 36px;
}

.mega__card {
  text-align: center;
}

.mega__img {
  display: block;
  aspect-ratio: 295 / 144;
  overflow: hidden;
}

.mega__img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s;
}

.mega__img:hover img {
  transform: scale(1.05);
}

.mega__name {
  margin-top: 8px;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: var(--ink);
}

.mega__links {
  display: flex;
  justify-content: center;
  gap: 27px;
  font-size: 16px;
  color: var(--ink);
}

.mega__links a:hover,
.mega__links button:hover,
.mega__side a:hover,
.mega__side button:hover {
  color: var(--red);
}

.mega__side {
  border-top: 1px solid #d8d8d8;
  padding: 8px 0 0 22px;
}

.mega__label {
  font-weight: 500;
  font-size: 14px;
  line-height: 48px;
  color: var(--gray-light);
  border-bottom: 1px solid #d8d8d8;
  max-width: 275px;
  margin-bottom: 12px;
}

.mega__side li {
  font-weight: 500;
  font-size: 14px;
  line-height: 42px;
}

@media (max-width: 1100px) {
  .mega__inner {
    grid-template-columns: 1fr 220px;
  }
}
</style>
