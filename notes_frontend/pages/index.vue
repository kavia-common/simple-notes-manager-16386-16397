<template>
  <section>
    <div class="section-header">
      <h2>All Notes</h2>
      <NuxtLink class="new" to="/new">
        <span class="material-symbols-outlined">add</span>New Note
      </NuxtLink>
    </div>
    <div v-if="loading" class="centerpad">
      <span class="loader" />
    </div>
    <div v-else>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="!notes.length && !error" class="empty">No notes found.</p>
      <ul class="notes-list">
        <li v-for="note in notes" :key="note.id" class="note-item">
          <div class="main">
            <strong>{{ note.title }}</strong>
            <span class="snippet">{{ note.content.slice(0, 96) }}<span v-if="note.content.length>96">…</span></span>
          </div>
          <div class="actions">
            <NuxtLink :to="`/edit/${note.id}`" title="Edit">
              <span class="material-symbols-outlined">edit</span>
            </NuxtLink>
            <button class="delete" @click="askDelete(note)" title="Delete">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </li>
      </ul>
      <DeleteConfirmModal
        v-if="showDelete"
        :note="toDelete"
        @confirm="confirmDelete"
        @cancel="showDelete=false"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNotes } from '~/composables/useNotes'
import type { Note } from '~/types/Note'
import DeleteConfirmModal from '~/components/DeleteConfirmModal.vue'

const { loading, error, listNotes, deleteNote } = useNotes()
const notes = ref<Note[]>([])
const showDelete = ref(false)
const toDelete = ref<Note|null>(null)

const loadNotes = async () => {
  notes.value = await listNotes()
}
onMounted(loadNotes)

function askDelete(note: Note) {
  toDelete.value = note
  showDelete.value = true
}
async function confirmDelete() {
  if (!toDelete.value) return
  const id = toDelete.value.id
  await deleteNote(id)
  showDelete.value = false
  toDelete.value = null
  await loadNotes()
}
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}

.section-header .new {
  background: #2196F3;
  color: #fff;
  padding: 6px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.99rem;
  box-shadow: 0 0.4px 2px rgba(39,150,243,0.10);
  display: flex;
  align-items: center;
  gap: 2px;
}
.section-header .new:hover, .section-header .new:focus {
  background: #1976D2;
}

.notes-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.note-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7fbff;
  border: 1px solid #e1e8ee;
  border-radius: 6px;
  padding: 16px 18px;
  margin-bottom: 14px;
  transition: box-shadow .13s;
  min-height: 56px;
}
.note-item .main {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.note-item strong {
  font-weight: 600;
  color: #1976D2;
  font-size: 1.12em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.note-item .snippet {
  color: #757575;
  font-size: 0.99em;
  margin-top: 0.2em;
}
.note-item .actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 18px;
}
.note-item .actions .material-symbols-outlined {
  font-size: 22px;
  color: #757575;
}
.note-item .delete {
  border: none;
  background: transparent;
  color: #ff5252;
  cursor: pointer;
  padding: 0;
  margin-left: 0;
}
.error {
  color: #e53935;
  font-size: 1.07em;
}
.empty {
  color: #aaa;
  padding: 18px;
}
.centerpad {
  padding: 32px 0 0 0;
  text-align: center;
}
.loader {
  width: 27px;
  height: 27px;
  display: inline-block;
  border: 3px solid #2196F3;
  border-bottom-color: #FFEB3B;
  border-radius: 50%;
  animation: spin .9s linear infinite;
  margin: auto;
}
@keyframes spin { 100% { transform: rotate(360deg)} }
</style>
