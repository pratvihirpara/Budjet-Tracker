<template>
  <div class="settings-container">
    <div class="settings-header">
      <h2>Application Settings</h2>
      <p class="subtitle">Customize your budget tracker experience</p>
    </div>
    
    <div class="settings-grid">
      <!-- Currency Setting -->
      <div class="setting-card">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h3>Currency</h3>
        </div>
        <div class="card-content">
          <div class="select-wrapper">
            <select v-model="budgetStore.currency" @change="budgetStore.setCurrency($event.target.value)">
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
              <option value="JPY">Japanese Yen (¥)</option>
            </select>
            <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
      
      
      
      <!-- Data Management -->
      <div class="setting-card">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3>Data Management</h3>
        </div>
        <div class="card-content">
          <div class="button-group">
            <button @click="exportData" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export Data
            </button>
            
            <button @click="importData" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Import Data
            </button>
            
            <button @click="resetData" class="btn btn-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useBudgetStore } from '../store/useBudgetStore'

const budgetStore = useBudgetStore()

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'light') {
    root.classList.remove('dark')
    root.classList.add('light')
  } else if (theme === 'dark') {
    root.classList.remove('light')
    root.classList.add('dark')
  }
}

// Watch for theme changes
watch(
  () => budgetStore.theme,
  (theme) => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  },
  { immediate: true }
)

// On mount, apply saved theme
onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    budgetStore.theme = saved
  }
  applyTheme(budgetStore.theme)
})



const exportData = () => {
  const data = {
    transactions: budgetStore.transactions,
    categories: budgetStore.categories
  }
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'budget-tracker-data.json'
  a.click()
  URL.revokeObjectURL(url)
}

const importData = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  
  input.onchange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    
    reader.onload = event => {
      try {
        const data = JSON.parse(event.target.result)
        budgetStore.transactions = data.transactions || []
        budgetStore.categories = data.categories || []
        alert('Data imported successfully!')
      } catch (error) {
        alert('Error importing data: ' + error.message)
      }
    }
    
    reader.readAsText(file)
  }
  
  input.click()
}

const resetData = () => {
  if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
    budgetStore.transactions = []
    budgetStore.categories = [
      { id: 1, name: 'Food', type: 'expense' },
      { id: 2, name: 'Transport', type: 'expense' },
      { id: 3, name: 'Shopping', type: 'expense' },
      { id: 4, name: 'Entertainment', type: 'expense' },
      { id: 5, name: 'Salary', type: 'income' },
      { id: 6, name: 'Freelance', type: 'income' }
    ]
  }
}
</script>

<style scoped>
.settings-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;         /* was 2rem, reduce to 1rem */
  margin-top: 1.5rem;    /* add or reduce this value as needed */
}

.settings-header {
  margin-bottom: 2rem;
}

.settings-header h2 {
  font-size: 1.8rem;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.setting-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.setting-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1e293b;
}

.icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
}

.card-content {
  padding: 1.25rem;
}

.select-wrapper {
  position: relative;
}

select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  appearance: none;
  background-color: white;
  color: #334155;
  transition: border-color 0.2s;
}

select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #94a3b8;
}

.theme-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.theme-options label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.theme-options label:hover {
  background: #f1f5f9;
}

.theme-options label.active {
  background: #e0e7ff;
  border: 1px solid #3b82f6;
}

.theme-preview {
  width: 100%;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.preview-header {
  height: 20px;
  background: #3b82f6;
}

.light .preview-content {
  height: 60px;
  background: white;
}

.dark .preview-content {
  height: 60px;
  background: #1e293b;
}

.system .preview-content {
  display: none;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-secondary {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .theme-options {
    grid-template-columns: 1fr;
  }
}
</style>