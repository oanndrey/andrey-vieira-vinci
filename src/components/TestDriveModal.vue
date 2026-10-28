<script setup>
import { reactive, ref, watch, nextTick } from 'vue'
import { modelos } from '../data/modelos'
import { testDrive } from '../data/testDrive'

const form = reactive({ nome: '', email: '', telefone: '', data: '' })
const enviado = ref(false)
const primeiroCampo = ref(null)
const hoje = new Date().toISOString().slice(0, 10)

watch(
  () => testDrive.aberto,
  async (aberto) => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    if (aberto) {
      enviado.value = false
      await nextTick()
      primeiroCampo.value?.focus()
    }
  },
)

function enviar() {
  enviado.value = true
  Object.assign(form, { nome: '', email: '', telefone: '', data: '' })
}
</script>

<template>
  <Transition name="modal">
    <div v-if="testDrive.aberto" class="overlay" @click.self="testDrive.fechar()" @keydown.esc="testDrive.fechar()">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="td-titulo">
        <button type="button" class="modal__close" aria-label="Fechar" @click="testDrive.fechar()">×</button>

        <template v-if="!enviado">
          <h2 id="td-titulo">Agende um test drive</h2>
          <p class="modal__sub">Escolha o modelo e entraremos em contato para confirmar.</p>

          <form @submit.prevent="enviar">
            <fieldset class="modelos">
              <legend class="sr-only">Modelo</legend>
              <label v-for="m in modelos" :key="m.id" :class="{ ativo: testDrive.modelo === m.id }">
                <input v-model="testDrive.modelo" type="radio" name="modelo" :value="m.id" class="sr-only" />
                <img :src="m.imagem" alt="" />
                <span>{{ m.curto }}</span>
              </label>
            </fieldset>

            <label class="campo">
              Nome
              <input ref="primeiroCampo" v-model.trim="form.nome" type="text" required autocomplete="name" />
            </label>
            <div class="linha">
              <label class="campo">
                E-mail
                <input v-model.trim="form.email" type="email" required autocomplete="email" />
              </label>
              <label class="campo">
                Telefone
                <input v-model.trim="form.telefone" type="tel" required autocomplete="tel" />
              </label>
            </div>
            <label class="campo">
              Data preferida
              <input v-model="form.data" type="date" :min="hoje" required />
            </label>

            <button type="submit" class="btn btn--red modal__submit">Agendar</button>
          </form>
        </template>

        <div v-else class="sucesso">
          <svg viewBox="0 0 41 34" aria-hidden="true">
            <path
              d="M35.471 14.811L20.269 27.824L5.067 14.811L5.067 10.526L16.707 20.506L20.269 23.56L23.831 20.506L35.471 10.526L35.471 14.811ZM40.538 16.649L40.538 0L20.269 17.38L0 0L0 16.649L20.269 34L40.538 16.649Z"
            />
          </svg>
          <h2 id="td-titulo">Pedido recebido!</h2>
          <p class="modal__sub">Em breve um consultor VINCI vai falar com você.</p>
          <button type="button" class="btn btn--outline-dark" @click="testDrive.fechar()">Fechar</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  padding: 16px;
}

.modal {
  position: relative;
  width: min(560px, 100%);
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  background: #fff;
  border-radius: 12px;
  padding: 40px clamp(20px, 5vw, 40px) 32px;
}

.modal h2 {
  font-size: 40px;
  line-height: 1;
}

.modal__sub {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 24px;
  color: var(--gray);
  margin: 10px 0 24px;
}

.modal__close {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 32px;
  line-height: 1;
  color: var(--gray);
}

.modelos {
  border: 0;
  padding: 0;
  margin: 0 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.modelos label {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s;
}

.modelos label.ativo {
  border-color: var(--red);
  box-shadow: inset 0 0 0 1px var(--red);
}

.modelos img {
  height: 54px;
  width: 100%;
  object-fit: contain;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 16px;
  margin-bottom: 14px;
  flex: 1;
}

.campo input {
  height: 44px;
  border: 1px solid #d3d0d0;
  border-radius: 4px;
  padding: 0 12px;
  font-family: var(--font-body);
  font-size: 15px;
}

.campo input:focus {
  outline: 2px solid var(--red);
  outline-offset: -1px;
  border-color: transparent;
}

.linha {
  display: flex;
  gap: 12px;
}

.modal__submit {
  width: 100%;
  margin-top: 8px;
}

.sucesso {
  text-align: center;
  padding: 20px 0;
}

.sucesso svg {
  width: 56px;
  fill: var(--red);
  margin: 0 auto 20px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 520px) {
  .linha {
    flex-direction: column;
    gap: 0;
  }
}
</style>
