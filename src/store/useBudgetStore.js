//local area to store data

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBudgetStore = defineStore('budget', () => {
  const transactions = ref(JSON.parse(localStorage.getItem('transactions') || '[]'))
  const categories = ref([
    { id: 1, name: 'Food', type: 'expense' },
    { id: 2, name: 'Transport', type: 'expense' },
    { id: 3, name: 'Shopping', type: 'expense' },
    { id: 4, name: 'Entertainment', type: 'expense' },
    { id: 5, name: 'other expense', type: 'expense' },
    { id: 6, name: 'Salary', type: 'income' },
    { id: 7, name: 'Freelance', type: 'income' }
  ])

  const theme = ref(localStorage.getItem('theme') || 'light')
  const currency = ref(localStorage.getItem('currency') || 'INR')

  const recurringTransactions = ref([
    // Example:
    // { id: 1, name: 'Rent', amount: 12000, type: 'expense', date: '2024-07-01', frequency: 'monthly' }
  ])

  function setTheme(newTheme) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    document.body.classList.remove('dark-theme')
    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme')
    } else if (newTheme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme')
      }
    }
  }

  function setCurrency(newCurrency) {
    currency.value = newCurrency
    localStorage.setItem('currency', newCurrency)
  }

  // Apply theme on load
  setTheme(theme.value)

  const addTransaction = (transaction) => {
    transactions.value.push({
      id: Date.now(),
      ...transaction
    })
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
  }

  const deleteTransaction = (id) => {
    transactions.value = transactions.value.filter(t => t.id !== id)
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
  }

  

  const addRecurringTransaction = (tx) => {
    recurringTransactions.value.push({
      ...tx,
      id: Date.now()
    })
  }

  const getUpcomingRecurringTransactions = () => {
    // Return next 30 days' recurring transactions
    const today = new Date()
    const upcoming = []
    recurringTransactions.value.forEach(tx => {
      let nextDate = new Date(tx.date)
      while (nextDate < today) {
        // Move to next occurrence
        if (tx.frequency === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1)
        if (tx.frequency === 'weekly') nextDate.setDate(nextDate.getDate() + 7)
        if (tx.frequency === 'yearly') nextDate.setFullYear(nextDate.getFullYear() + 1)
      }
      // Only show if within next 30 days
      const diff = (nextDate - today) / (1000 * 60 * 60 * 24)
      if (diff <= 30 && diff >= 0) {
        upcoming.push({ ...tx, nextDate: nextDate.toISOString().slice(0, 10) })
      }
    })
    return upcoming
  }

  const totalBalance = computed(() => {
    return transactions.value.reduce((total, t) => {
      return t.type === 'income' ? total + t.amount : total - t.amount
    }, 0)
  })

  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0)
  })

  const totalExpense = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0)
  })

  const totalTransfer = computed(() =>
    transactions.value
      .filter(t => t.type === 'transfer')
      .reduce((sum, t) => sum + Number(t.amount), 0)
  )

  const totalOutflow = computed(() =>
    totalExpense.value + totalTransfer.value
  )

  const spendingExceedsIncome = computed(() =>
    totalOutflow.value > totalIncome.value
  )

  const activityLog = ref([])

  function logActivity({ type, action, details }) {
    activityLog.value.push({
      id: Date.now() + Math.random(),
      type,
      action,
      details,
      date: new Date().toISOString()
    })
  }

  function addIncome(income) {
    transactions.value.push({ ...income, id: Date.now() })
    logActivity({ type: 'income', action: 'Added Income', details: income })
  }
  function addExpense(expense) {
    transactions.value.push({ ...expense, id: Date.now() })
    logActivity({ type: 'expense', action: 'Added Expense', details: expense })
  }
  function addTransfer(transfer) {
    transactions.value.push({ ...transfer, id: Date.now() })
    logActivity({ type: 'transfer', action: 'Added Transfer', details: transfer })
  }
  function addCategory(category) {
    categories.value.push({
      id: Date.now(),
      ...category
    })
    logActivity({ type: 'category', action: 'Added Category', details: category })
  }

  return {
    transactions,
    categories,
    addTransaction,
    deleteTransaction,
    addCategory,
    totalBalance,
    totalIncome,
    totalExpense,
    theme,
    setTheme,
    currency,
    setCurrency,
    recurringTransactions,
    addRecurringTransaction,
    getUpcomingRecurringTransactions,
    addIncome,
    addExpense,
    addTransfer,
    activityLog,
    totalTransfer,
    totalOutflow,
    spendingExceedsIncome,
  }
})