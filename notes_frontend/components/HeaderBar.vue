<template>
  <header class="header-bar">
    <span class="logo">📝 Notes Manager</span>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header-bar {
  background: #2196F3;
  color: #fff;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 28px;
  font-weight: 500;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px 0 rgb(33 150 243 / 6%);
  z-index: 2;
}
.logo {
  font-size: 1.25rem;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
