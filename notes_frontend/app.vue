<template>
  <div class="app-root">
    <HeaderBar />
    <div class="body-grid">
      <SidebarNav />
      <main class="main-content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import layout components
import HeaderBar from './components/HeaderBar.vue'
import SidebarNav from './components/SidebarNav.vue'
</script>

<style scoped>
.app-root {
  background: #fafbfc;
  color: #212121;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

.body-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  flex: 1;
  min-height: 0;
}

.main-content {
  padding: 32px 32px 32px 16px;
  background: #fff;
  box-sizing: border-box;
  min-height: 0;
  height: 100%;
}
@media (max-width: 900px) {
  .body-grid {
    grid-template-columns: 1fr;
  }
  .main-content {
    padding: 16px;
  }
}
</style>
