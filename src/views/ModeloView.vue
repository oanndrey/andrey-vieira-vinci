<script setup>
import { computed, ref } from 'vue'
import FaqItem from '../components/FaqItem.vue'
import { buscarModelo, modelos } from '../data/modelos'
import { testDrive } from '../data/testDrive'
import banner from '../assets/img/banner-modelo.webp'
import recargaRapida from '../assets/img/recarga-rapida.webp'
import painel from '../assets/img/painel.webp'
import pontosRecarga from '../assets/img/pontos-recarga.webp'
import designImg from '../assets/img/design.webp'

const props = defineProps({ id: { type: String, required: true } })

const modelo = computed(() => buscarModelo(props.id) ?? modelos[1])

const texto =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."

const caracteristicas = [
  { titulo: 'recarga rápida', img: recargaRapida },
  { titulo: 'painel de instrumentos', img: painel },
  { titulo: 'pontos de recarga', img: pontosRecarga },
  { titulo: 'design premiado', img: designImg },
]

// posições (%) dos marcadores sobre a imagem de detalhe, tiradas do Figma
const pontos = [
  { letra: 'A', nome: 'Retrovisores inteligentes', x: 16.4, y: 32.1 },
  { letra: 'B', nome: 'Rodas de liga leve', x: 11.6, y: 67.5 },
  { letra: 'C', nome: 'Reconhecimento de digital', x: 31.1, y: 40.4 },
  { letra: 'D', nome: 'Sensor de proximidade', x: 55.3, y: 36.6 },
  { letra: 'E', nome: 'Antena 5G', x: 66.5, y: 14.9 },
  { letra: 'F', nome: 'Design sofisticado', x: 64.8, y: 59.6 },
  { letra: 'G', nome: 'Abertura automática', x: 79.2, y: 35.1 },
  { letra: 'H', nome: 'Câmera de estacionamento', x: 93.9, y: 70.4 },
]
const pontoAtivo = ref(null)

const faq = [
  {
    pergunta: 'Qual é a autonomia real da bateria em diferentes condições de condução?',
    resposta:
      'Em uso urbano a autonomia fica próxima do valor homologado. Em rodovia, acima de 110 km/h, ou em dias muito frios, a redução pode chegar a 20%.',
  },
  {
    pergunta: 'Quanto tempo o carro leva para carregar em tomadas residenciais e em carregadores rápidos?',
    resposta:
      'Em um wallbox residencial de 7 kW a carga completa leva cerca de 8 horas. Em carregadores rápidos DC, de 10% a 80% em aproximadamente 30 minutos.',
  },
  {
    pergunta: 'Como funciona a infraestrutura de recarga para viagens de longa distância?',
    resposta:
      'O planejador de rotas do painel indica as paradas ideais na rede de recarga parceira VINCI e mostra a disponibilidade dos pontos em tempo real.',
  },
  {
    pergunta: 'Qual é o tempo de garantia da bateria e qual a sua vida útil estimada?',
    resposta:
      'A bateria tem garantia de até 10 anos ou 200.000 km. A vida útil estimada passa de 15 anos mantendo mais de 70% da capacidade original.',
  },
  {
    pergunta: 'Quais são as principais economias em manutenção e impostos comparado a um carro a combustão?',
    resposta:
      'Sem troca de óleo, filtros e embreagem, a manutenção fica até 60% mais barata. Vários estados também oferecem isenção ou desconto no IPVA.',
  },
]
const faqAberto = ref(0)
</script>

<template>
  <section class="hero container">
    <img :src="modelo.imagem" :alt="modelo.nome" class="hero__img" fetchpriority="high" />
    <h1>{{ modelo.nome }}</h1>
    <p>{{ modelo.descricao }}</p>
    <div class="hero__actions">
      <RouterLink :to="`/modelo/${modelos[(modelos.indexOf(modelo) + 1) % modelos.length].id}`" class="btn btn--red">
        Modelos
      </RouterLink>
      <button type="button" class="btn btn--outline-dark" @click="testDrive.abrir(modelo.id)">Test Drive</button>
    </div>
  </section>

  <section class="numeros container" aria-label="Destaques">
    <p class="numeros__titulo">tecnologia aliada ao futuro</p>
    <ul>
      <template v-for="(d, i) in modelo.destaques" :key="d.rotulo">
        <li v-if="i" class="numeros__sep" aria-hidden="true"></li>
        <li>
          <strong>{{ d.valor }}</strong>
          <span>{{ d.rotulo }}</span>
        </li>
      </template>
    </ul>
  </section>

  <div class="container">
    <img :src="banner" alt="SUV elétrico na estrada ao pôr do sol" class="banner" loading="lazy" />
  </div>

  <section class="caracteristicas" aria-label="Características">
    <article v-for="c in caracteristicas" :key="c.titulo" class="carac">
      <h2>{{ c.titulo }}</h2>
      <p>{{ texto }}</p>
      <div class="carac__img">
        <img :src="c.img" :alt="c.titulo" loading="lazy" />
      </div>
    </article>
  </section>

  <section class="detalhes container" aria-labelledby="detalhes-titulo">
    <div class="detalhes__top">
      <div class="detalhes__intro">
        <h2 id="detalhes-titulo">{{ modelo.nome }}</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever.
        </p>
      </div>
      <ol class="legenda">
        <li
          v-for="p in pontos"
          :key="p.letra"
          :class="{ ativo: pontoAtivo === p.letra }"
          @mouseenter="pontoAtivo = p.letra"
          @mouseleave="pontoAtivo = null"
        >
          <span class="bolinha bolinha--dark">{{ p.letra }}</span>
          {{ p.nome }}
        </li>
      </ol>
    </div>

    <div class="detalhes__img">
      <img :src="modelo.detalhe" :alt="`${modelo.nome} — detalhes`" loading="lazy" />
      <button
        v-for="p in pontos"
        :key="p.letra"
        type="button"
        class="bolinha bolinha--ponto"
        :class="{ ativo: pontoAtivo === p.letra }"
        :style="{ left: `${p.x}%`, top: `${p.y}%` }"
        :aria-label="p.nome"
        @mouseenter="pontoAtivo = p.letra"
        @mouseleave="pontoAtivo = null"
        @focus="pontoAtivo = p.letra"
        @blur="pontoAtivo = null"
      >
        {{ p.letra }}
        <span class="tooltip">{{ p.nome }}</span>
      </button>
    </div>
  </section>

  <section class="faq container" aria-labelledby="faq-titulo">
    <h2 id="faq-titulo">FAQ</h2>
    <p class="faq__sub">PERGUNTAS FREQUENTES</p>
    <div class="faq__lista">
      <FaqItem
        v-for="(item, i) in faq"
        :key="i"
        :pergunta="item.pergunta"
        :resposta="item.resposta"
        :aberto="faqAberto === i"
        @alternar="faqAberto = faqAberto === i ? null : i"
      />
    </div>
  </section>

  <hr class="divisor" />
</template>

<style scoped>
.hero {
  text-align: center;
  padding-top: 0;
}

.hero__img {
  width: min(947px, 100%);
  aspect-ratio: 947 / 533;
  object-fit: contain;
  margin: -23px auto 0;
}

.hero h1 {
  font-size: clamp(44px, 5vw, 72px);
  line-height: 1;
  margin-top: 4px;
}

.hero p {
  max-width: 911px;
  margin: 39px auto 0;
  font-family: var(--font-body);
  font-size: clamp(16px, 1.4vw, 20px);
  line-height: 1.8;
  color: var(--gray);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 17px;
  margin-top: 39px;
}

.numeros {
  padding-top: 81px;
  padding-bottom: 81px;
  text-align: center;
}

.numeros__titulo {
  font-weight: 300;
  font-size: 24px;
  line-height: 1;
  color: var(--gray);
}

.numeros ul {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
}

.numeros li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  font-weight: 300;
}

.numeros li.numeros__sep {
  width: clamp(24px, 6.4vw, 92px);
  height: 1px;
  background: #d3d0d0;
  margin: 0 clamp(16px, 2.5vw, 34px);
}

.numeros strong {
  font-weight: 300;
  font-size: clamp(36px, 5vw, 72px);
  line-height: 1;
  white-space: nowrap;
}

.numeros span {
  font-size: 24px;
  line-height: 1;
  text-transform: uppercase;
}

.banner {
  width: 100%;
  height: clamp(240px, 36vw, 520px);
  object-fit: cover;
  border-radius: 12px;
}

.caracteristicas {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1440px;
  margin: 36px auto 0;
}

.carac {
  display: flex;
  flex-direction: column;
  padding-top: 37px;
}

.carac {
  position: relative;
}

.carac + .carac::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 53%;
  height: 1px;
  background: var(--line);
}

.carac h2,
.carac p {
  padding: 0 26px;
}

.carac h2 {
  font-size: 26px;
  line-height: 1;
}

.carac p {
  margin-top: 30px;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 28px;
  color: var(--gray-light);
}

.carac__img {
  margin-top: auto;
  padding-top: 45px;
  overflow: hidden;
}

.carac__img img {
  width: 100%;
  aspect-ratio: 360 / 272;
  object-fit: cover;
  transition: transform 0.5s;
}

.carac:hover .carac__img img {
  transform: scale(1.05);
}

.detalhes {
  padding-top: 61px;
}

.detalhes__top {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.detalhes__intro {
  max-width: 379px;
}

.detalhes__intro h2 {
  font-size: 42px;
  line-height: 1;
  margin-top: 8px;
}

.detalhes__intro p {
  margin-top: 36px;
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 32px;
  color: var(--gray);
}

.legenda {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-auto-flow: column;
  gap: 17px 36px;
}

.legenda li {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 16px;
  line-height: 1;
  color: var(--gray);
  text-transform: uppercase;
  cursor: default;
  transition: color 0.2s;
}

.legenda li.ativo {
  color: var(--red);
}

.legenda li.ativo .bolinha {
  background: var(--red);
}

.bolinha {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-family: var(--font-body);
  font-size: 11px;
  line-height: 1;
  color: #fff;
  flex-shrink: 0;
  transition: background-color 0.2s, transform 0.2s;
}

.bolinha--dark {
  background: var(--ink);
}

.detalhes__img {
  position: relative;
  width: min(1074px, 100%);
  margin: 26px auto 0;
}

.detalhes__img img {
  width: 100%;
  aspect-ratio: 1074 / 604;
  object-fit: contain;
}

.bolinha--ponto {
  position: absolute;
  background: var(--red);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 0 rgba(229, 24, 55, 0.5);
  animation: pulso 2.4s infinite;
}

.bolinha--ponto.ativo {
  transform: translate(-50%, -50%) scale(1.5);
  animation: none;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  color: #fff;
  font-family: var(--font-display);
  font-size: 9px;
  white-space: nowrap;
  padding: 4px 6px;
  border-radius: 3px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.bolinha--ponto.ativo .tooltip {
  opacity: 1;
}

@keyframes pulso {
  0% { box-shadow: 0 0 0 0 rgba(229, 24, 55, 0.5); }
  70% { box-shadow: 0 0 0 10px rgba(229, 24, 55, 0); }
  100% { box-shadow: 0 0 0 0 rgba(229, 24, 55, 0); }
}

.faq {
  max-width: calc(1064px + 2 * var(--gutter));
  padding-top: 44px;
  text-align: center;
}

.faq h2 {
  font-size: 42px;
  line-height: 32px;
}

.faq__sub {
  margin-top: 24px;
  font-size: 22px;
  line-height: 32px;
  color: var(--gray-light);
}

.faq__lista {
  margin-top: 30px;
  text-align: left;
}

.divisor {
  border: 0;
  border-top: 1px solid #bcbcbc;
  margin: 94px 0 0;
}

@media (max-width: 1100px) {
  .caracteristicas {
    grid-template-columns: repeat(2, 1fr);
  }

  .detalhes__top {
    flex-direction: column;
  }
}

@media (max-width: 700px) {
  .numeros ul {
    flex-direction: column;
    gap: 32px;
  }

  .numeros li {
    align-items: center;
    gap: 14px;
  }

  .numeros li.numeros__sep {
    display: none;
  }

  .caracteristicas {
    grid-template-columns: 1fr;
  }

  .legenda {
    grid-auto-flow: row;
    grid-template-rows: none;
  }

  .bolinha--ponto {
    width: 14px;
    height: 14px;
    font-size: 8px;
  }
}
</style>
