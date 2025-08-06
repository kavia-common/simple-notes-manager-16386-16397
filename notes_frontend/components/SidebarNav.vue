<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li>
          <NuxtLink to="/" class="nav-link" exact-active-class="active">
            <i class="icon material-symbols-outlined">notes</i>
            <span>All Notes</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <NuxtLink class="new-note-btn" to="/new">
      <span class="material-symbols-outlined">add</span> New Note
    </NuxtLink>
  </aside>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sidebar {
  background: #f6f8fa;
  border-right: 1px solid #e0e0e0;
  min-width: 220px;
  height: calc(100vh - 56px);
  padding: 24px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: sticky;
  top: 56px;
}

nav ul {
  list-style: none;
  padding: 0 6px;
  margin: 0 0 16px 0;
}
.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 18px;
  border-radius: 7px;
  color: #222;
  text-decoration: none;
  font-weight: 400;
  transition: background 0.16s;
  margin-bottom: 2px;
}
.nav-link .icon {
  font-size: 20px;
  margin-right: 12px;
}
.active {
  background: #e3f2fd;
  color: #1976D2;
}
.new-note-btn {
  margin: 30px 16px 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: 5px;
  background: #2196F3;
  color: #fff;
  font-weight: 500;
  padding: 10px 0;
  text-decoration: none;
  font-size: 1.07rem;
  box-shadow: 0 0.2px 1.5px rgba(33,150,243,0.08);
  transition: background 0.17s;
}
.new-note-btn:hover, .new-note-btn:focus {
  background: #1976D2;
}
.material-symbols-outlined {
  font-variation-settings: 
    'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 20px;
}
@media (max-width: 900px) {
  .sidebar {
    min-width: 100%;
    max-width: 100vw;
    flex-direction: row;
    align-items: center;
    height: unset;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 0;
    position: static;
  }
  nav ul {
    margin: 0;
    flex-direction: row;
    display: flex;
    width: 100%;
  }
  .nav-link, .new-note-btn {
    margin: 0;
    padding: 10px;
    flex: 1 1 0;
    justify-content: center;
    font-size: 1em;
  }
  .new-note-btn {
    border-radius: 0;
    margin-left: 0;
  }
}
</style>

<!-- Google Material Icons CDN - to be loaded in nuxt.config.ts via app.head -->
