<template>
  <div class="categories-container">
    <header class="categories-header">
      <h1 class="title">Categories</h1>
      <p class="subtitle">Organize your financial transactions with custom categories</p>
    </header>
    
    <div class="content-grid">
      <!-- Add Category Card -->
      <div class="card add-category-card">
        <div class="card-header">
          <h2 class="card-title">
            <FontAwesomeIcon :icon="['fas', 'plus-circle']" class="icon" />
            Add New Category
          </h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleSubmit" class="category-form">
            <div class="form-group">
              <label class="form-label">Category Name</label>
              <input 
                type="text" 
                v-model="name" 
                required
                class="form-input"
                placeholder="e.g. Groceries, Salary"
              >
            </div>
            <div class="form-group">
              <label class="form-label">Transaction Type</label>
              <select 
                v-model="type" 
                required
                class="form-select"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
                <option value="savings">Savings</option>
              </select>
            </div>
            <button type="submit" class="submit-button">
              <FontAwesomeIcon :icon="['fas', 'save']" /> Add Category
            </button>
          </form>
        </div>
      </div>
      
      <!-- Category List Card -->
      <div class="card category-list-card">
        <div class="card-header">
          <h2 class="card-title">
            <FontAwesomeIcon :icon="['fas', 'list-ul']" class="icon" />
            Your Categories
          </h2>
        </div>
        <div class="card-body">
          <div v-if="categories.length === 0" class="empty-state">
            <FontAwesomeIcon :icon="['far', 'folder-open']" class="empty-icon" />
            <p>No categories created yet</p>
            <p class="hint">Add your first category using the form</p>
          </div>
          <ul v-else class="category-list">
            <li 
              v-for="category in categories" 
              :key="category.id" 
              :class="['category-item', category.type]"
            >
              <div class="category-info">
                <span class="category-name">{{ category.name }}</span>
                <span class="category-type">{{ category.type }}</span>
              </div>
              <div class="category-actions">
                <button class="action-button edit">
                  <FontAwesomeIcon :icon="['fas', 'edit']" />
                </button>
                <button class="action-button delete">
                  <FontAwesomeIcon :icon="['fas', 'trash-alt']" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Drag and Drop Component -->
    <CategoryDragDrop :categories="categories" @update:categories="updateCategories" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBudgetStore } from '../store/useBudgetStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlusCircle, 
  faListUl, 
  faSave, 
  faEdit, 
  faTrashAlt,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import CategoryDragDrop from '../components/CategoryDragDrop.vue'

library.add(faPlusCircle, faListUl, faSave, faEdit, faTrashAlt, faFolderOpen, far)

const budgetStore = useBudgetStore()
const name = ref('')
const type = ref('expense')

const categories = computed(() => budgetStore.categories)

const handleSubmit = () => {
  budgetStore.addCategory({
    name: name.value,
    type: type.value
  })
  
  // Reset form
  name.value = ''
  type.value = 'expense'
}

const updateCategories = (newCategories) => {
  budgetStore.setCategories(newCategories)
}
</script>

<style scoped>
/* Base Styles */
.categories-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.categories-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 400;
}

/* Grid Layout */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* Card Styles */
.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e0e7ff;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e7ff;
  background: #f8fafc;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #1e40af;
}

.card-body {
  padding: 1.5rem;
}

.icon {
  color: #3b82f6;
}

/* Form Styles */
.category-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: #334155;
  font-size: 0.95rem;
}

.form-input, .form-select {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: #f8fafc;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #94a3b8;
}

.submit-button {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.submit-button:hover {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Category List Styles */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: #94a3b8;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #93c5fd;
}

.hint {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: #cbd5e1;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.2s ease;
  border-left: 4px solid;
}

.category-item:hover {
  background: #f1f5f9;
  transform: translateX(5px);
}

.category-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.category-name {
  font-weight: 500;
  color: #1e293b;
}

.category-type {
  font-size: 0.75rem;
  text-transform: capitalize;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  width: fit-content;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: #94a3b8;
}

.action-button:hover {
  transform: scale(1.1);
}

.action-button.edit:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.action-button.delete:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* Type-specific Styles */
.income {
  border-left-color: #10b981;
}

.income .category-type {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.expense {
  border-left-color: #ef4444;
}

.expense .category-type {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.savings {
  border-left-color: #f59e0b;
}

.savings .category-type {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}
</style>