import { reactive } from 'vue'

// estado compartilhado do modal de test drive (aberto pelo header, hero e menu)
export const testDrive = reactive({
  aberto: false,
  modelo: 'v2',
  abrir(modelo) {
    if (modelo) this.modelo = modelo
    this.aberto = true
  },
  fechar() {
    this.aberto = false
  },
})
