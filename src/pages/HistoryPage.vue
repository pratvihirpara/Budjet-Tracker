<template>
  <div class="history-container">
    <div class="history-header">
      <h2 class="history-title">Transaction History</h2>
      <div class="history-controls">
        <button class="filter-btn" @click="showFilter = !showFilter">
          <i class="fas fa-filter"></i> Filter
        </button>
        <button class="export-btn" @click="exportData">
          <i class="fas fa-file-export"></i> Export
        </button>
      </div>
    </div>
    
    <div v-if="showFilter" class="filter-panel">
      <label>
        Type:
        <select v-model="filterType">
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="transfer">Transfer</option>
        </select>
      </label>
      <label>
        Category:
        <select v-model="filterCategory">
          <option value="">All</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
        </select>
      </label>
      <label>
        Date:
        <input type="date" v-model="filterDate" />
      </label>
      <button @click="clearFilters" class="filter-btn">Clear</button>
    </div>

    <div class="history-content">
      <div class="history-section">
        <div class="section-header">
          <h3><i class="fas fa-exchange-alt"></i> Recent Transactions</h3>
        </div>
        <TransactionList :filterType="filterType" :filterCategory="filterCategory" :filterDate="filterDate" />
      </div>
      
      <div class="history-section">
        <div class="section-header">
          <h3><i class="fas fa-history"></i> Activity Log</h3>
        </div>
        <ActivityLogList />
      </div>
    </div>
  </div>
</template>

<script>
import TransactionList from '../components/TransactionList.vue'
import ActivityLogList from '../components/ActivityLogList.vue'
import { useBudgetStore } from '../store/useBudgetStore'

export default {
  name: 'HistoryPage',
  components: {
    TransactionList,
    ActivityLogList
  },
  data() {
    return {
      showFilter: false,
      filterType: '',
      filterCategory: '',
      filterDate: '',
    }
  },
  computed: {
    categories() {
      const store = useBudgetStore()
      return store.categories
    }
  },
  methods: {
    clearFilters() {
      this.filterType = ''
      this.filterCategory = ''
      this.filterDate = ''
    },
    exportData() {
      const store = useBudgetStore()
      const data = store.transactions.map(t => ({
        date: t.date,
        type: t.type,
        category: t.category,
        amount: t.amount,
        description: t.description || ''
      }))
      const csv = [
        ['Date', 'Type', 'Category', 'Amount', 'Description'],
        ...data.map(row => [
          row.date,
          row.type,
          row.category,
          row.amount,
          row.description
        ])
      ].map(e => e.join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'transactions.csv'
      a.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.history-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.history-title {
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}

.history-controls {
  display: flex;
  gap: 15px;
}

.filter-btn, .export-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-btn {
  background-color: #e1f0ff;
  color: #1976d2;
}

.filter-btn:hover {
  background-color: #d0e5ff;
}

.export-btn {
  background-color: #1976d2;
  color: white;
}

.export-btn:hover {
  background-color: #1565c0;
}

.filter-panel {
  background-color: #f9f9f9;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.filter-panel label {
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-weight: 500;
}

.filter-panel select, .filter-panel input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
  margin-right: 10px;
}

.filter-panel button {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background-color: #1976d2;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-panel button:hover {
  background-color: #1565c0;
}

.history-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.history-section {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #f5f9ff;
  border-bottom: 1px solid #e0e9f5;
}

.section-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-header h3 i {
  color: #1976d2;
}

.view-all {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s;
}

.view-all:hover {
  color: #1565c0;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .history-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .history-title {
    font-size: 24px;
  }
  
  .history-controls {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>