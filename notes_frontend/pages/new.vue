<template>
  <section>
    <header class="section-header">
      <h2>New Note</h2>
    </header>
    <NoteForm :initial="emptyNote" @submit="onSubmit" submit-label="Create" />
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Note created!</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotes } from '~/composables/useNotes'
import type { Note } from '~/types/Note'
import NoteForm from '~/components/NoteForm.vue'

const emptyNote: Partial<Note> = { title: '', content: '' }
const { createNote, error } = useNotes()
const router = useRouter()
const success = ref(false)

async function onSubmit(data: { title: string, content: string }) {
  const created = await createNote(data)
  if (created) {
    success.value = true
    setTimeout(() => router.push(`/`), 700)
  }
}
</script>

<style scoped>
.section-header {
  margin-bottom: 18px;
}
.error {
  color: #e53935;
  margin-top: 8px;
}
.success {
  color: #388e3c;
  margin-top: 8px;
}
</style>
