import { ref } from 'vue'

/**
 * Notes API composable for CRUD operations.
 * Assumes the backend API base URL is set in the runtime config as 'public.apiBase'.
 */

const apiBase = useRuntimeConfig().public?.apiBase || '/api'

export function useNotes() {
  const loading = ref(false)
  const error = ref<string|null>(null)

  // PUBLIC_INTERFACE
  async function listNotes() {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch(`${apiBase}/notes`)
      return res as Note[]
    } catch (e: any) {
      error.value = e?.data?.message || e.message
      return []
    } finally {
      loading.value = false
    }
  }
  // PUBLIC_INTERFACE
  async function getNote(id: number|string) {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch(`${apiBase}/notes/${id}`)
      return res as Note
    } catch (e: any) {
      error.value = e?.data?.message || e.message
      return null
    } finally {
      loading.value = false
    }
  }
  // PUBLIC_INTERFACE
  async function createNote(data: { title: string; content: string }) {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch(`${apiBase}/notes`, {
        method: 'POST',
        body: data,
      })
      return res as Note
    } catch (e: any) {
      error.value = e?.data?.message || e.message
      return null
    } finally {
      loading.value = false
    }
  }
  // PUBLIC_INTERFACE
  async function updateNote(id: number|string, data: { title: string; content: string }) {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch(`${apiBase}/notes/${id}`, {
        method: 'PUT',
        body: data,
      })
      return res as Note
    } catch (e: any) {
      error.value = e?.data?.message || e.message
      return null
    } finally {
      loading.value = false
    }
  }
  // PUBLIC_INTERFACE
  async function deleteNote(id: number|string) {
    loading.value = true
    error.value = null
    try {
      await $fetch(`${apiBase}/notes/${id}`, {
        method: 'DELETE'
      })
      return true
    } catch (e: any) {
      error.value = e?.data?.message || e.message
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    listNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
  }
}


