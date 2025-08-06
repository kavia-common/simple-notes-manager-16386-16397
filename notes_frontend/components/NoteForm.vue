<template>
  <form class="note-form" @submit.prevent="onSubmit">
    <label>
      Title:
      <input
        type="text"
        v-model="form.title"
        maxlength="64"
        :class="{ invalid: errors.title }"
        required
        placeholder="Title"
        autocomplete="off"
      />
    </label>
    <div class="field-error" v-if="errors.title">{{ errors.title }}</div>

    <label style="margin-top:18px;">
      Content:
      <textarea
        v-model="form.content"
        rows="7"
        maxlength="2048"
        :class="{ invalid: errors.content }"
        required
        placeholder="Note content"
      ></textarea>
    </label>
    <div class="field-error" v-if="errors.content">{{ errors.content }}</div>

    <button class="btn-submit" :disabled="submitting" type="submit">
      <span v-if="submitting" class="spinner" /> {{ submitLabel || 'Save' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, toRef } from 'vue'

const props = defineProps<{
  initial?: { title?: string; content?: string }
  submitLabel?: string
}>()

const emit = defineEmits(['submit'])

const submitting = ref(false)
const form = ref({
  title: props.initial?.title || '',
  content: props.initial?.content || ''
})
watch(() => props.initial, (val) => {
  if (val) {
    form.value.title = val.title || ''
    form.value.content = val.content || ''
  }
})

const errors = ref<{ title?: string; content?: string }>({})

function validate() {
  const errs: typeof errors.value = {}
  if (!form.value.title || form.value.title.trim().length < 3)
    errs.title = 'Title is required (3+ chars).'
  if (!form.value.content || form.value.content.trim().length < 3)
    errs.content = 'Content is required (3+ chars).'
  return errs
}
async function onSubmit() {
  errors.value = validate()
  if (Object.keys(errors.value).length > 0)
    return
  submitting.value = true
  await emit('submit', {
    title: form.value.title.trim(),
    content: form.value.content.trim()
  })
  submitting.value = false
}
</script>

<style scoped>
.note-form {
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  background: #f8fbff;
  padding: 18px 22px;
  border-radius: 9px;
  box-shadow: 0 1px 7px rgba(33,150,243,0.07);
  border: 1px solid #e3e8ee;
  max-width: 520px;
  margin: 0 auto;
}
.note-form label {
  display: block;
  font-weight: 500;
  color: #222;
  margin-bottom: 2px;
}
.note-form input,
.note-form textarea {
  width: 100%;
  font-size: 1.08em;
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid #b5b7c0;
  background: #fff;
  margin-top: 5px;
  margin-bottom: 2px;
  font-family: inherit;
  outline: none;
  resize: none;
  transition: border .16s;
}
.note-form input:focus, .note-form textarea:focus {
  border: 1.5px solid #2196F3;
}
.btn-submit {
  background: #2196F3;
  color: #fff;
  border: none;
  padding: 11px 0;
  border-radius: 5px;
  font-weight: 500;
  margin-top: 16px;
  font-size: 1.01em;
  cursor: pointer;
  transition: background .14s;
}
.btn-submit:disabled {
  background: #90caf9;
  cursor: not-allowed;
}
.btn-submit:hover:not(:disabled),
.btn-submit:focus:not(:disabled) {
  background: #1976D2;
}
.field-error {
  color: #e53935;
  font-size: 0.93em;
  margin: 0 0 0.4em 0;
}
.invalid {
  border: 1.5px solid #ff5252 !important;
}
.spinner {
  display: inline-block;
  width: 19px;
  height: 19px;
  border: 2.5px solid #90caf9;
  border-bottom-color: #FFEB3B;
  border-radius: 50%;
  margin-right: 7px;
  animation: spin .9s linear infinite;
  vertical-align: middle;
}
@keyframes spin { 100% { transform: rotate(360deg)} }
</style>
