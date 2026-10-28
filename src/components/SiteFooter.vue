<script setup>
import VinciLogo from './VinciLogo.vue'

const colunas = [
  { id: 'sobre', titulo: 'SOBRE', links: ['A Marca', 'História', 'Qualidade', 'Onde estamos', 'Investidores'] },
  { id: 'contato', titulo: 'CONTATO', links: ['Fale Conosco', 'Atendimento', 'SAC'] },
  { id: 'sac', titulo: 'SAC', links: ['Canais Oficiais', 'Redes Sociais', 'Suporte'] },
]
</script>

<template>
  <footer class="footer container">
    <div class="footer__top">
      <VinciLogo />
      <div class="footer__cols">
        <div v-for="col in colunas" :id="col.id" :key="col.id" class="footer__col">
          <h3>{{ col.titulo }}</h3>
          <ul>
            <li v-for="link in col.links" :key="link"><a href="#" @click.prevent>{{ link }}</a></li>
          </ul>
        </div>
      </div>
    </div>
    <p class="footer__copy">©Copyright {{ new Date().getFullYear() }}.<br />Todos os Direitos Reservados.</p>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: 61px;
  padding-bottom: 64px;
}

.footer__top {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.footer__cols {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: clamp(40px, 7vw, 98px);
  width: min(672px, 100%);
  justify-content: space-between;
}

.footer__col h3 {
  font-size: 24px;
  line-height: 1;
  letter-spacing: 0.1em;
  margin-bottom: 30px;
}

.footer__col li {
  font-size: 20px;
  line-height: 42px;
  color: var(--gray);
}

.footer__col a:hover {
  color: var(--red);
}

.footer__copy {
  margin-top: 45px;
  font-size: 16px;
  line-height: 24px;
  color: var(--gray);
}

@media (max-width: 900px) {
  .footer__top {
    flex-direction: column;
  }

  .footer__cols {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 32px;
  }
}
</style>
