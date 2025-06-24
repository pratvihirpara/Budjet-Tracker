<template>
  <div class="noteballs-page">
    <div class="header-container">
      <div class="header">
        <div class="title-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
          </svg>
          <h1 class="page-title">Noteballs</h1>
        </div>
        <div class="notes-stats-container">
          <div class="notes-stats">
            <div class="stat">
              <span class="stat-number">{{ noteCount }}</span>
              <span class="stat-label">Notes</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">{{ charCount }}</span>
              <span class="stat-label">Characters</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <NoteForm
      v-if="showForm"
      :modelValue="editingNote"
      :editMode="!!editingNote"
      @submit="handleSubmit"
      @cancel="cancelEdit"
      @delete="deleteNote"
    />

    <button v-else class="fab" @click="showForm = true" title="Add Note">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>

    <div v-if="notes.length === 0" class="empty-state">
      <div class="empty-state-illustration">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
      </div>
      <h3>Your notes will appear here</h3>
      <p>Start organizing your thoughts by creating your first note</p>
      <button class="empty-state-button" @click="showForm = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Create First Note
      </button>
    </div>

    <div v-else class="notes-grid">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit="editNote"
        @delete="deleteNote"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNotesStore } from '../store/notesStore'
import NoteCard from '../components/NoteCard.vue'
import NoteForm from '../components/NoteForm.vue'

const notesStore = useNotesStore()
const showForm = ref(false)
const editingNote = ref(null)
const notes = notesStore.notes

const noteCount = computed(() => notes.length)
const charCount = computed(() =>
  notes.reduce((sum, note) => sum + (note.text ? note.text.length : 0), 0)
)

function handleSubmit(note) {
  if (editingNote.value) {
    notesStore.updateNote(note)
  } else {
    notesStore.addNote(note)
  }
  showForm.value = false
  editingNote.value = null
}
function editNote(note) {
  editingNote.value = { ...note }
  showForm.value = true
}
function deleteNote(id) {
  if (confirm('Are you sure you want to delete this note?')) {
    notesStore.deleteNote(id)
    showForm.value = false
    editingNote.value = null
  }
}
function cancelEdit() {
  showForm.value = false
  editingNote.value = null
}
</script>

<style scoped>
.noteballs-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-container {
  background: linear-gradient(135deg, #f8fafc 0%, #f0f7ff 100%);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 2.5rem;
  border: 1px solid #e0e7ff;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.notes-stats-container {
  width: 100%;
}

.notes-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
  border: 1px solid #e0e7ff;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  padding: 0 1rem;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #e0e7ff;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e40af;
  font-feature-settings: "tnum";
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
  font-weight: 500;
}

.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.fab:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
}

.fab:active {
  transform: translateY(0) scale(0.98);
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  margin-top: 2rem;
  background: white;
  border-radius: 16px;
  border: 1px dashed #bfdbfe;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.empty-state-illustration {
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin: 0 0 0.75rem;
  font-weight: 600;
}

.empty-state p {
  color: #64748b;
  margin-bottom: 1.75rem;
  font-size: 1.0625rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.empty-state-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.empty-state-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.75rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .noteballs-page {
    padding: 1.5rem;
  }
  
  .header {
    gap: 1.25rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .notes-stats {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
  }
  
  .stat-divider {
    width: 80px;
    height: 1px;
  }
  
  .notes-grid {
    grid-template-columns: 1fr;
  }
  
  .fab {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 56px;
    height: 56px;
  }
}
</style>