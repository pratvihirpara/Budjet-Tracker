<template>
  <div class="transaction-list">
    <h3>Recent Transactions</h3>
    <div v-if="transactions.length === 0" class="empty">
      No transactions yet
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Type</th>
          <th>Title/Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th>From</th>
          <th>To</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in transactions" :key="tx.id">
          <td>
            {{ formatDateTime(tx.date) }}
          </td>
          <td>
            <span v-if="tx.type === 'income'">Income</span>
            <span v-else-if="tx.type === 'expense'">Expense</span>
            <span v-else-if="tx.type === 'transfer'">Transfer</span>
            <span v-else>{{ tx.type }}</span>
          </td>
          <td>{{ tx.description || tx.title || '-' }}</td>
          <td>
            <span v-if="tx.type === 'income'" style="color: #27ae60;">+{{ formatCurrency(tx.amount) }}</span>
            <span v-else-if="tx.type === 'expense'" style="color: #e74c3c;">-{{ formatCurrency(tx.amount) }}</span>
            <span v-else>{{ formatCurrency(tx.amount) }}</span>
          </td>
          <td>{{ tx.category || '-' }}</td>
          <td>{{ tx.fromAccount || '-' }}</td>
          <td>{{ tx.toAccount || '-' }}</td>
          <td>{{ tx.note || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useBudgetStore } from '../store/useBudgetStore'

const budgetStore = useBudgetStore()

const props = defineProps({
  limit: {
    type: Number,
    default: 0
  },
  filterType: String,
  filterCategory: String,
  filterDate: String
})

const transactions = computed(() => {
  const sorted = [...budgetStore.transactions].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  )
  return props.limit > 0 ? sorted.slice(0, props.limit) : sorted
})

function formatCurrency(amount) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: budgetStore.currency || 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

function formatDateTime(date) {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleString()
}
</script>

<style scoped>
.transaction-list {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.transaction-list h3 {
  margin-bottom: 20px;
  color: #333;
}

.empty {
  text-align: center;
  color: #888;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f9f9f9;
  color: #333;
}

tr:nth-child(even) {
  background: #f9fafb;
}
</style>