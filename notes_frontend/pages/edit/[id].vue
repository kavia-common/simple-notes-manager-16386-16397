<template>
  <section v-if="note">
    <header class="section-header">
      <h2>Edit Note</h2>
    </header>
    <NoteForm :initial="note" @submit="onSubmit" submit-label="Save" />
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Note updated!</p>
  </section>
  <div v-else-if="loading" class="centerpad"><span class="loader" /></div>
  <div v-else>
    <p class="error">Note not found</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNotes } from '~/composables/useNotes'
import type { Note } from '~/types/Note'
import NoteForm from '~/components/NoteForm.vue'

const { getNote, updateNote, error, loading } = useNotes()
const note = ref<Note|null>(null)
const route = useRoute()
const router = useRouter()
const success = ref(false)

onMounted(async () => {
  const id = route.params.id
  note.value = await getNote(id as string)
})

async function onSubmit(data: { title: string, content: string }) {
  if (!note.value) return
  const updated = await updateNote(note.value.id, data)
  if (updated) {
    success.value = true
    setTimeout(() => router.push('/'), 700)
  }
}
</script>

<style scoped>
.section-header {
  margin-bottom: 18px;
}
.error {
  color: #e53935;
  margin-top: 10px;
}
.success {
  color: #388e3c;
  margin-top: 8px;
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
