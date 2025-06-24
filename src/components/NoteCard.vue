<template>
  <div class="note-card" :class="note.status">
    <div class="note-header">
      <span class="status-ball" :class="note.status"></span>
      <span class="note-status">{{ note.status }}</span>
      <span class="note-date">{{ formattedDate }}</span>
      <div class="note-actions">
        <button @click.stop="$emit('edit', note)" title="Edit" class="action-btn edit">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button @click.stop="$emit('delete', note.id)" title="Delete" class="action-btn delete">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
    <div class="note-body">{{ note.text }}</div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({ note: Object })
const formattedDate = computed(() =>
  new Date(props.note.createdAt).toLocaleDateString()
)
</script>

<style scoped>
.note-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(37,99,235,0.07);
  padding: 1.25rem 1rem;
  margin-bottom: 1rem;
  position: relative;
  transition: box-shadow 0.2s;
}
.note-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}
.status-ball {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
}
.status-ball.pending { background: #facc15; }
.status-ball.done { background: #22c55e; }
.status-ball.urgent { background: #ef4444; }
.note-status {
  font-size: 0.95rem;
  text-transform: capitalize;
  color: #64748b;
}
.note-date {
  margin-left: auto;
  font-size: 0.85rem;
  color: #93c5fd;
}
.note-actions {
  display: flex;
  gap: 0.5rem;
}
.action-btn {
  background: none;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: background 0.2s, color 0.2s;
}
.action-btn.edit { color: #2563eb; }
.action-btn.delete { color: #ef4444; }
.action-btn.edit:hover { background: #e0e7ff; }
.action-btn.delete:hover { background: #fee2e2; }
.note-body {
  font-size: 1.1rem;
  color: #1e3a8a;
  word-break: break-word;
}
.note-card.urgent { border-left: 4px solid #ef4444; }
.note-card.pending { border-left: 4px solid #facc15; }
.note-card.done { border-left: 4px solid #22c55e; }
</style>