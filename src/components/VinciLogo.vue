<script setup>
defineProps({
  light: { type: Boolean, default: false },
})
</script>

<template>
  <RouterLink to="/" class="logo" :class="{ 'logo--light': light }" aria-label="VINCI — página inicial">
    <svg class="logo__mark" viewBox="0 0 41 34" aria-hidden="true">
      <path
        d="M35.471 14.811L20.269 27.824L5.067 14.811L5.067 10.526L16.707 20.506L20.269 23.56L23.831 20.506L35.471 10.526L35.471 14.811ZM40.538 16.649L40.538 0L20.269 17.38L0 0L0 16.649L20.269 34L40.538 16.649Z"
      />
    </svg>
    <span class="logo__text">VINCI</span>
  </RouterLink>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 27px;
}

.logo__mark {
  width: 41px;
  height: 34px;
  fill: var(--red);
  flex-shrink: 0;
}

.logo__text {
  font-size: 41.66px;
  line-height: 1;
  letter-spacing: 0.42em;
  margin-right: -0.42em;
}

.logo--light .logo__text {
  color: #fff;
}
</style>
