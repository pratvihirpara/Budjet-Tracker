<template>
  <div class="transaction-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Transaction Management</h1>
        <p class="page-subtitle">Track and manage your financial activities</p>
      </div>
      <div class="header-gradient"></div>
    </div>
    
    <div class="transaction-container">
      <div class="transaction-options">
        <h3 class="section-title">Add New Transaction</h3>
        <div class="transaction-cards">
          <div 
            class="transaction-card income" 
            @click="show = 'income'"
            :class="{active: show === 'income'}"
          >
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"/>
              </svg>
            </div>
            <div class="card-content">
              <h3 class="card-title">Income</h3>
              <p class="card-description">Add money received</p>
            </div>
            <div class="active-indicator"></div>
          </div>
          
          <div 
            class="transaction-card expense" 
            @click="show = 'expense'"
            :class="{active: show === 'expense'}"
          >
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-5h-2v-5h2v5z"/>
              </svg>
            </div>
            <div class="card-content">
              <h3 class="card-title">Expense</h3>
              <p class="card-description">Add money spent</p>
            </div>
            <div class="active-indicator"></div>
          </div>
          
          <div 
            class="transaction-card transfer" 
            @click="show = 'transfer'"
            :class="{active: show === 'transfer'}"
          >
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/>
              </svg>
            </div>
            <div class="card-content">
              <h3 class="card-title">Transfer</h3>
              <p class="card-description">Move between accounts</p>
            </div>
            <div class="active-indicator"></div>
          </div>
        </div>
      </div>

      <div class="transaction-form-container glass-card">
        <AddIncome 
          v-if="show === 'income'" 
          @add-income="handleAddIncome" 
          @close="show = null" 
        />
        <AddExpense 
          v-if="show === 'expense'" 
          @add-expense="handleAddExpense" 
          @close="show = null" 
        />
        <AddTransfer 
          v-if="show === 'transfer'" 
          @add-transfer="handleAddTransfer" 
          @close="show = null" 
        />
        
        <div v-if="!show" class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </div>
          <h3>Select a transaction type</h3>
          <p>Choose from income, expense or transfer to get started</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBudgetStore } from '../store/useBudgetStore'
import AddIncome from '../components/AddIncome.vue'
import AddExpense from '../components/AddExpense.vue'
import AddTransfer from '../components/AddTransfer.vue'

const show = ref(null)
const budgetStore = useBudgetStore()

function handleAddIncome(income) {
  budgetStore.addIncome(income)
  show.value = null
}
function handleAddExpense(expense) {
  budgetStore.addExpense(expense)
  show.value = null
}
function handleAddTransfer(transfer) {
  budgetStore.addTransfer(transfer)
  show.value = null
}
</script>

<style scoped>
.transaction-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.page-header {
  position: relative;
  margin-bottom: 3rem;
  padding: 2rem 0;
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.header-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, #4533ed 0%, #a4d4ed 100%);
  clip-path: ellipse(100% 100% at 50% 0%);
  z-index: 1;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
}

.transaction-container {
  position: relative;
  z-index: 2;
  margin-top: -1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1.75rem;
  text-align: center;
}

.transaction-cards {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.transaction-card {
  background: white;
  border-radius: 16px;
  padding: 1.75rem;
  width: 220px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.transaction-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.transaction-card.active {
  border-color: transparent;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.transaction-card.income {
  color: #10b981;
}

.transaction-card.expense {
  color: #ef4444;
}

.transaction-card.transfer {
  color: #3b82f6;
}

.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  transition: all 0.3s ease;
}

.transaction-card.active .card-icon {
  transform: scale(1.1);
}

.income .card-icon {
  background-color: rgba(16, 185, 129, 0.1);
}

.expense .card-icon {
  background-color: rgba(239, 68, 68, 0.1);
}

.transfer .card-icon {
  background-color: rgba(59, 130, 246, 0.1);
}

.card-icon svg {
  width: 28px;
  height: 28px;
}

.card-content {
  text-align: center;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.card-description {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.transaction-card.active .active-indicator {
  transform: scaleX(1);
}

.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.transaction-form-container {
  padding: 2.5rem;
  min-height: 400px;
  transition: all 0.3s ease;
}

.transaction-form-container:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #94a3b8;
  text-align: center;
  padding: 2rem;
}

.empty-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background-color: #f1f5f9;
}

.empty-icon svg {
  width: 36px;
  height: 36px;
  color: #cbd5e1;
}

.empty-state h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #64748b;
}

.empty-state p {
  font-size: 1rem;
  margin: 0;
  max-width: 300px;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .transaction-page {
    padding: 0 1rem 2rem;
  }
  
  .page-title {
    font-size: 1.8rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .transaction-cards {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .transaction-card {
    width: 100%;
    max-width: 300px;
    padding: 1.5rem;
  }
  
  .transaction-form-container {
    padding: 1.5rem;
  }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

.transaction-card:hover {
  animation: float 2s ease-in-out infinite;
}
</style>