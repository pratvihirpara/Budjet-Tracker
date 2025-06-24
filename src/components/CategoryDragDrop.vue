<template>
  <div class="dragdrop-container">
    <div class="draggable-list">
      <h3 class="section-title">Predefined Categories</h3>
      <p class="section-description">Drag these to your custom list</p>
      <draggable
        :list="predefinedItems"
        :group="{ name: 'categories', pull: 'clone', put: false }"
        item-key="id"
        :clone="cloneItem"
      >
        <template #item="{ element }">
          <div class="draggable-item">
            <span class="drag-handle">☰</span>
            <span class="item-name">{{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>
    
    <div class="dropzone-list">
      <div class="list-header">
        <h3 class="section-title">Your Categories</h3>
        <button @click="addNewCategory" class="add-button">
          <span>+</span> Add New
        </button>
      </div>
      <p class="section-description">Drag to reorder or edit names</p>
      
      <draggable
        v-model="customCategories"
        :group="{ name: 'categories', pull: true, put: true }"
        item-key="id"
        handle=".drag-handle"
      >
        <template #item="{ element, index }">
          <div class="dropzone-item">
            <span class="drag-handle">☰</span>
            <input
              v-model="element.name"
              class="category-input"
              :placeholder="'Category ' + (index + 1)"
            />
            <button @click="removeCategory(index)" class="delete-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </template>
      </draggable>
      
      <div v-if="customCategories.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <p>Drag categories here or click "Add New"</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const predefinedItems = ref([
  { id: 1, name: 'Groceries' },
  { id: 2, name: 'Rent' },
  { id: 3, name: 'Travel' },
  { id: 4, name: 'Utilities' },
  { id: 5, name: 'Dining Out' },
  { id: 6, name: 'Entertainment' },
  { id: 7, name: 'Healthcare' },
  { id: 8, name: 'Savings' }
])

const customCategories = ref([])

function removeCategory(index) {
  customCategories.value.splice(index, 1)
}

function addNewCategory() {
  customCategories.value.push({
    id: Date.now() + Math.random(),
    name: ''
  })
}

function cloneItem(item) {
  return { ...item, id: Date.now() + Math.random() }
}
</script>

<style scoped>
.dragdrop-container {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.draggable-list, .dropzone-list {
  flex: 1;
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  min-height: 350px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.section-description {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.draggable-item, .dropzone-item {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;
  cursor: grab;
}

.draggable-item {
  background-color: #f8fafc;
  border: 1px dashed #cbd5e1;
}

.draggable-item:hover {
  background-color: #f1f5f9;
  transform: translateX(2px);
}

.dropzone-item {
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.dropzone-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.drag-handle {
  color: #94a3b8;
  cursor: grab;
  user-select: none;
  padding: 0 0.5rem;
}

.category-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
  color: #1e293b;
  padding: 0.5rem 0;
}

.category-input::placeholder {
  color: #94a3b8;
}

.delete-button {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.delete-button:hover {
  color: #ef4444;
  background: #fee2e2;
}

.add-button {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
}

.add-button:hover {
  background: #2563eb;
}

.add-button span {
  font-size: 1.1rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #94a3b8;
  border: 1px dashed #e2e8f0;
  border-radius: 8px;
  margin-top: 1rem;
}

.empty-state svg {
  margin-bottom: 1rem;
  color: #cbd5e1;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .dragdrop-container {
    flex-direction: column;
  }
}
</style>