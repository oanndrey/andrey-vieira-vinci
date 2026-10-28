<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import TestDriveModal from './components/TestDriveModal.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <RouterView :key="$route.params.id || $route.name" />
  </main>
  <SiteFooter />
  <TestDriveModal />
</template>
