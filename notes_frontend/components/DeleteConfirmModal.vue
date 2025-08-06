<template>
  <div class="modal-backdrop" @click.self="onCancel" tabindex="-1">
    <div class="modal">
      <div>
        <span class="warning material-symbols-outlined">warning</span>
        <p>Delete note <b>{{ note.title }}</b>? This cannot be undone.</p>
      </div>
      <div class="actions">
        <button @click="onCancel" class="btn-cancel">Cancel</button>
        <button @click="onConfirm" class="btn-delete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ note: { title: string } }>()
const emit = defineEmits(['confirm', 'cancel'])
function onCancel() { emit('cancel') }
function onConfirm() { emit('confirm') }
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  z-index: 1111;
  inset: 0;
  background: rgba(33, 33, 33, 0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadein 0.19s;
}
@keyframes fadein { from {opacity: 0} }
.modal {
  background: #fff;
  padding: 30px 24px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 24px rgba(33,33,33,0.10);
  max-width: 340px;
  text-align: center;
  outline: none;
}
.warning {
  color: #FFEB3B;
  font-size: 2.5em;
  line-height: 1em;
  display: block;
  margin-bottom: 8px;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  gap: 15px;
}
.btn-cancel {
  padding: 8px 0;
  flex: 1 1 0;
  background: #e6e6e6;
  border: none;
  color: #757575;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1em;
  cursor: pointer;
  transition: background .13s;
}
.btn-cancel:hover, .btn-cancel:focus {
  background: #d2d2d2;
}
.btn-delete {
  padding: 8px 0;
  flex: 1 1 0;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  transition: background .13s;
}
.btn-delete:hover, .btn-delete:focus {
  background: #c62828;
}
</style>
