import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ModeloView from './views/ModeloView.vue'

export default createRouter({
  // hash history: o GitHub Pages não tem fallback para rotas do SPA
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/modelo/:id', name: 'modelo', component: ModeloView, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 90 }
    return { top: 0 }
  },
})
