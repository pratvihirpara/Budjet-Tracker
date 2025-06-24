<template>
  <form @submit.prevent="onSubmit" class="note-form">
    <textarea v-model="text" placeholder="Enter your note..." required />
    <select v-model="status" required>
      <option value="pending">Pending</option>
      <option value="done">Done</option>
      <option value="urgent">Urgent</option>
    </select>
    <div class="form-actions">
      <button class="btn btn-primary" type="submit">{{ editMode ? 'Update' : 'Add' }} Note</button>
      <button v-if="editMode" class="btn btn-secondary" type="button" @click="onCancel">Cancel</button>
      <button
        v-if="editMode"
        class="btn btn-danger"
        type="button"
        @click="onDelete"
      >Delete</button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
const props = defineProps({
  modelValue: Object,
  editMode: Boolean
})
const emit = defineEmits(['submit', 'cancel', 'delete'])

const text = ref('')
const status = ref('pending')

watch(() => props.modelValue, (val) => {
  if (val) {
    text.value = val.text
    status.value = val.status
  } else {
    text.value = ''
    status.value = 'pending'
  }
}, { immediate: true })

function onSubmit() {
  emit('submit', {
    ...props.modelValue,
    text: text.value,
    status: status.value,
    createdAt: props.modelValue?.createdAt || new Date().toISOString(),
    id: props.modelValue?.id || Math.random().toString(36).slice(2)
  })
  text.value = ''
  status.value = 'pending'
}

function onCancel() {
  emit('cancel')
}

function onDelete() {
  if (props.modelValue?.id) {
    if (confirm('Are you sure you want to delete this note?')) {
      emit('delete', props.modelValue.id)
    }
  }
}
</script>

<style scoped>
.note-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #e0f2fe;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}
textarea {
  border-radius: 8px;
  border: 1px solid #93c5fd;
  padding: 0.75rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 60px;
}
select {
  border-radius: 8px;
  border: 1px solid #93c5fd;
  padding: 0.5rem;
  font-size: 1rem;
}
.form-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.btn {
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary {
  background: #2563eb;
  color: #fff;
}
.btn-secondary {
  background: #93c5fd;
  color: #1e3a8a;
}
.btn-danger {
  background: #ef4444;
  color: #fff;
}
.btn-primary:hover { background: #1e40af; }
.btn-secondary:hover { background: #60a5fa; color: #fff; }
.btn-danger:hover { background: #b91c1c; }
</style>