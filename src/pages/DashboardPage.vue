<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Financial Dashboard</h1>
      <div class="header-controls">
        <div class="currency-selector">
          <label>Currency:</label>
          <select v-model="budgetStore.currency" class="currency-dropdown">
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="INR">₹ INR</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Alert Notification -->
    <transition name="slide-down">
      <div v-if="showLimitAlert" class="alert-notification">
        <span class="alert-icon">⚠️</span>
        <span>{{ alertMessage }}</span>
        <button @click="showLimitAlert = false" class="close-alert">✕</button>
      </div>
    </transition>

    <!-- Spending Limit Control -->
    <div class="limit-control glass-card">
      <div class="limit-input">
        <label>Monthly Spending Limit</label>
        <div class="input-group">
          <span class="currency-prefix">{{ currencySymbol }}</span>
          <input 
            type="number" 
            v-model="spendingLimit" 
            min="0" 
            class="limit-field"
            @change="saveLimitToLocalStorage"
          />
        </div>
      </div>
      <div class="limit-progress">
        <div class="progress-container">
          <div 
            class="progress-bar" 
            :style="{ width: expensePercentage + '%' }"
            :class="{ 
              'safe': expensePercentage <= 70, 
              'warning': expensePercentage > 70 && expensePercentage <= 90, 
              'danger': expensePercentage > 90 
            }"
          ></div>
        </div>
        <span class="progress-text">
          {{ Math.min(expensePercentage, 100).toFixed(0) }}% of limit used
          <span v-if="expensePercentage > 100" class="over-limit">(Over limit!)</span>
        </span>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-cards">
      <div class="card balance glass-card" @click="toggleCard('balance')" :class="{ 'expanded': expandedCard === 'balance' }">
        <div class="card-content">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
            </svg>
          </div>
          <h4>Current Balance</h4>
          <p>{{ formatCurrency(totalBalance) }}</p>
          <div class="card-trend" v-if="balanceTrend !== 0">
            <span :class="{ 'positive': balanceTrend > 0, 'negative': balanceTrend < 0 }">
              {{ balanceTrend > 0 ? '↑' : '↓' }} {{ Math.abs(balanceTrend).toFixed(2) }}%
              <span class="trend-label">vs last month</span>
            </span>
          </div>
        </div>
        <div class="card-details" v-if="expandedCard === 'balance'">
          <p>Available funds after all expenses</p>
        </div>
      </div>

      <div class="card income glass-card" @click="toggleCard('income')" :class="{ 'expanded': expandedCard === 'income' }">
        <div class="card-content">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"/>
            </svg>
          </div>
          <h4>Total Income</h4>
          <p>{{ formatCurrency(totalIncome) }}</p>
          <div class="card-trend" v-if="incomeTrend !== 0">
            <span class="positive">
              ↑ {{ incomeTrend.toFixed(2) }}%
              <span class="trend-label">vs last month</span>
            </span>
          </div>
        </div>
        <div class="card-details" v-if="expandedCard === 'income'">
          <p>This month's total income</p>
        </div>
      </div>

      <div class="card expense glass-card" @click="toggleCard('expense')" :class="{ 'expanded': expandedCard === 'expense' }">
        <div class="card-content">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-5h-2v-5h2v5z"/>
            </svg>
          </div>
          <h4>Total Expenses</h4>
          <p>{{ formatCurrency(totalExpense) }}</p>
          <div class="card-trend" v-if="expenseTrend !== 0">
            <span class="negative">
              ↑ {{ expenseTrend.toFixed(2) }}%
              <span class="trend-label">vs last month</span>
            </span>
          </div>
        </div>
        <div class="card-details" v-if="expandedCard === 'expense'">
          <p>This month's total expenses</p>
          <p v-if="spendingLimit > 0">
            {{ ((totalExpense / spendingLimit) * 100).toFixed(0) }}% of your spending limit
          </p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button class="btn btn-primary" @click="showAddTransaction = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Transaction
      </button>
      <button class="btn btn-secondary" @click="showRecurringForm = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Recurring
      </button>
      <button class="btn btn-tertiary" @click="showCalendar = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Calendar
      </button>
    </div>

    <!-- Modals -->
    <AddTransaction 
      v-if="showAddTransaction"
      :spendingLimit="spendingLimit"
      @limitExceeded="handleLimitExceeded"
      @close="showAddTransaction = false"
    />  
    
    <RecurringTransactionForm 
      v-if="showRecurringForm"
      @close="showRecurringForm = false"
    />
    
    <RecurringCalendar 
      v-if="showCalendar"
      @close="showCalendar = false"
    />

    <!-- Recent Transactions -->
    <div class="recent-transactions glass-card">
      <div class="section-header">
        <h3>Recent Transactions</h3>
        <router-link to="/history" class="view-all">View All →</router-link>
      </div>
      <TransactionList :limit="5" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBudgetStore } from '../store/useBudgetStore'
import TransactionList from '../components/TransactionList.vue'

const budgetStore = useBudgetStore()

// State
const spendingLimit = ref(10000)
const showLimitAlert = ref(false)
const alertMessage = ref('')
const expandedCard = ref(null)
const showAddTransaction = ref(false)
const showRecurringForm = ref(false)
const showCalendar = ref(false)

// Load limit from localStorage on component mount
onMounted(() => {
  const savedLimit = localStorage.getItem('spendingLimit')
  if (savedLimit) {
    spendingLimit.value = parseFloat(savedLimit)                        
  }
})

// Computed properties
const totalBalance = computed(() => budgetStore.totalBalance)
const totalIncome = computed(() => budgetStore.totalIncome)
const totalExpense = computed(() => budgetStore.totalExpense)

const currencySymbol = computed(() => {
  switch (budgetStore.currency) {
    case 'INR': return '₹'
    case 'USD': return '$'
    case 'EUR': return '€'
    case 'GBP': return '£'
    default: return budgetStore.currency
  }
})

const expensePercentage = computed(() => {
  return spendingLimit.value > 0 ? Math.min((totalExpense.value / spendingLimit.value) * 100, 100) : 0
})

// Mock trend data (in a real app, this would come from comparing with previous period)
const balanceTrend = computed(() => 2.5)
const incomeTrend = computed(() => 5.2)
const expenseTrend = computed(() => 3.8)

// Methods
function handleLimitExceeded(amount) {
  showLimitAlert.value = true
  alertMessage.value = `Spending limit exceeded! You tried to add an expense that would bring your total expenses to ${currencySymbol.value}${amount.toFixed(2)}.`
}

function saveLimitToLocalStorage() {
  localStorage.setItem('spendingLimit', spendingLimit.value)
}

function formatCurrency(amount) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: budgetStore.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount).replace(/\D00(?=\D*$)/, '') // Remove .00 if zero cents
}

function toggleCard(card) {
  expandedCard.value = expandedCard.value === card ? null : card
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 25px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.dashboard-header h1 {
  font-size: 24px;
  color: #1e293b;
  font-weight: 600;
  margin: 0;
}

.header-controls {
  display: flex;
  gap: 20px;
  align-items: center;
}

.currency-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.currency-selector label {
  font-size: 14px;
  color: #64748b;
}

.currency-dropdown {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 14px;
  color: #334155;
  transition: all 0.2s ease;
}

.currency-dropdown:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

/* Alert Notification */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.alert-notification {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: #fff1f2;
  color: #dc2626;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  font-weight: 500;
  border-left: 4px solid #dc2626;
}

.alert-icon {
  font-size: 18px;
}

.close-alert {
  margin-left: auto;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  padding: 0 0 0 10px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.close-alert:hover {
  opacity: 1;
}

/* Glass Card Effect */
.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Limit Control */
.limit-control {
  padding: 20px;
  transition: all 0.3s ease;
}

.limit-control:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.limit-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.limit-input label {
  font-weight: 500;
  color: #475569;
  font-size: 14px;
}

.input-group {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.input-group:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.currency-prefix {
  padding: 0 12px;
  background: #f1f5f9;
  color: #475569;
  font-weight: 500;
  height: 42px;
  display: flex;
  align-items: center;
}

.limit-field {
  flex: 1;
  padding: 10px 12px;
  border: none;
  outline: none;
  font-size: 16px;
  min-width: 120px;
  background: white;
  color: #1e293b;
}

.limit-progress {
  margin-top: 15px;
}

.progress-container {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.progress-bar.safe {
  background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
}

.progress-bar.warning {
  background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
}

.progress-bar.danger {
  background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
}

.progress-text {
  display: block;
  font-size: 13px;
  color: #64748b;
}

.over-limit {
  color: #dc2626;
  font-weight: 500;
}

/* Summary Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
}

.card.expanded {
  transform: translateY(-5px);
}

.card-content {
  padding: 20px;
  position: relative;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.card-icon svg {
  width: 24px;
  height: 24px;
}

.card h4 {
  color: #64748b;
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card p {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: inherit;
}

.card-trend {
  font-size: 14px;
}

.card-trend .positive {
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-trend .negative {
  color: #ef4444;
  display: flex;
  align-items: center;
  gap: 4px;
}

.trend-label {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 400;
}

.card-details {
  padding: 16px 20px;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
  font-size: 14px;
  color: #64748b;
}

.card-details p {
  font-size: 14px;
  margin: 6px 0;
  font-weight: 400;
}

.balance {
  color: #1e40af;
}

.balance .card-icon {
  background-color: #dbeafe;
  color: #1e40af;
}

.income {
  color: #047857;
}

.income .card-icon {
  background-color: #d1fae5;
  color: #047857;
}

.expense {
  color: #b91c1c;
}

.expense .card-icon {
  background-color: #fee2e2;
  color: #b91c1c;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.btn-primary {
  background: #4f46e5;
  color: white;
}

.btn-primary:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

.btn-secondary {
  background: white;
  color: #4f46e5;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}

.btn-tertiary {
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.btn-tertiary:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}

.btn svg {
  width: 16px;
  height: 16px;
}

/* Recent Transactions */
.recent-transactions {
  padding: 20px;
  transition: all 0.3s ease;
}

.recent-transactions:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 18px;
  font-weight: 600;
}

.view-all {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}

.view-all:hover {
  color: #4338ca;
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .header-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    justify-content: center;
  }
}

/* Animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}

.card:hover {
  animation: float 2s ease-in-out infinite;
}
</style>