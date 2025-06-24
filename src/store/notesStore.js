import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: JSON.parse(localStorage.getItem('noteballs') || '[]')
  }),
  actions: {
    addNote(note) {
      this.notes.push(note)
      this.saveNotes()
    },
    updateNote(updatedNote) {
      const idx = this.notes.findIndex(n => n.id === updatedNote.id)
      if (idx !== -1) {
        this.notes[idx] = updatedNote
        this.saveNotes()
      }
    },
    deleteNote(id) {
      this.notes = this.notes.filter(n => n.id !== id)
      this.saveNotes()
    },
    saveNotes() {
      localStorage.setItem('noteballs', JSON.stringify(this.notes))
    }
  }
})