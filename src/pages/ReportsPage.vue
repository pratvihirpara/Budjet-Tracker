<template>
  <div class="reports-container">
    <div class="reports-header">
      <h2 class="reports-title"><i class="fas fa-chart-line"></i> Financial Reports</h2>
      <div class="time-filters">
        <button 
          v-for="period in timePeriods" 
          :key="period" 
          :class="['period-btn', activePeriod === period ? 'active' : '']"
          @click="activePeriod = period"
        >
          {{ period }}
        </button>
      </div>
    </div>

    <div class="stats-summary">
      <div class="stat-card income">
        <div class="stat-icon">
          <i class="fas fa-arrow-down"></i>
        </div>
        <div class="stat-details">
          <h3>Total Income</h3>
          <p>{{ formatCurrency(budgetStore.totalIncome) }}</p>
        </div>
      </div>
      
      <div class="stat-card expense">
        <div class="stat-icon">
          <i class="fas fa-arrow-up"></i>
        </div>
        <div class="stat-details">
          <h3>Total Expenses</h3>
          <p>{{ formatCurrency(budgetStore.totalExpense) }}</p>
        </div>
      </div>
      
      <div class="stat-card balance">
        <div class="stat-icon">
          <i class="fas fa-wallet"></i>
        </div>
        <div class="stat-details">
          <h3>Balance</h3>
          <p>{{ formatCurrency(budgetStore.totalIncome - budgetStore.totalExpense) }}</p>
        </div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header">
          <h3><i class="fas fa-balance-scale"></i> Income vs Expenses</h3>
          <select class="chart-filter" v-model="barChartType">
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
        <div class="chart-wrapper">
          <canvas ref="barChart"></canvas>
        </div>
      </div>
      
      <div class="chart-card">
        <div class="chart-header">
          <h3><i class="fas fa-tags"></i> Expense Categories</h3>
          <select class="chart-filter" v-model="pieChartType">
            <option value="pie">Pie Chart</option>
            <option value="doughnut">Doughnut Chart</option>
          </select>
        </div>
        <div class="chart-wrapper">
          <canvas ref="pieChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useBudgetStore } from '../store/useBudgetStore'

Chart.register(...registerables)

const budgetStore = useBudgetStore()
const barChart = ref(null)
const pieChart = ref(null)
const barChartInstance = ref(null)
const pieChartInstance = ref(null)
const activePeriod = ref('This Month')
const barChartType = ref('bar')
const pieChartType = ref('pie')

const timePeriods = ['Today', 'This Week', 'This Month', 'This Year']

const expenseByCategory = computed(() => {
  const expenses = budgetStore.transactions.filter(t => t.type === 'expense')
  const result = {}

  budgetStore.categories
    .filter(c => c.type === 'expense')
    .forEach(c => {
      result[c.name] = expenses
        .filter(t => t.categoryId === c.id)
        .reduce((sum, t) => sum + t.amount, 0)
    })

  return result
})

const blueThemeColors = [
  '#1976d2', // Primary blue
  '#42a5f5', // Light blue
  '#0d47a1', // Dark blue
  '#90caf9', // Very light blue
  '#1e88e5', // Medium blue
  '#64b5f6'  // Light medium blue
]

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const renderCharts = () => {
  // Destroy existing charts if they exist
  if (barChartInstance.value) {
    barChartInstance.value.destroy()
  }
  if (pieChartInstance.value) {
    pieChartInstance.value.destroy()
  }

  // Bar/Line Chart - Income vs Expenses
  barChartInstance.value = new Chart(barChart.value.getContext('2d'), {
    type: barChartType.value,
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [{
        label: 'Amount',
        data: [budgetStore.totalIncome, budgetStore.totalExpense],
        backgroundColor: [
          '#4caf50', // Green for income
          '#f44336'  // Red for expenses
        ],
        borderColor: [
          '#388e3c', // Darker green
          '#d32f2f'  // Darker red
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return formatCurrency(context.raw)
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatCurrency(value)
            }
          }
        }
      }
    }
  })

  // Pie/Doughnut Chart - Expense Categories
  pieChartInstance.value = new Chart(pieChart.value.getContext('2d'), {
    type: pieChartType.value,
    data: {
      labels: Object.keys(expenseByCategory.value),
      datasets: [{
        data: Object.values(expenseByCategory.value),
        backgroundColor: blueThemeColors,
        borderWidth: 1,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || ''
              const value = context.raw || 0
              const total = context.dataset.data.reduce((a, b) => a + b, 0)
              const percentage = Math.round((value / total) * 100)
              return `${label}: ${formatCurrency(value)} (${percentage}%)`
            }
          }
        }
      }
    }
  })
}

onMounted(() => {
  renderCharts()
})

watch([barChartType, pieChartType], () => {
  renderCharts()
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.reports-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.reports-title {
  color: #1976d2;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.time-filters {
  display: flex;
  gap: 10px;
}

.period-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #e0e9f5;
  background-color: #f5f9ff;
  color: #1976d2;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.period-btn:hover {
  background-color: #e1f0ff;
}

.period-btn.active {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

.income .stat-icon {
  background-color: #4caf50;
}

.expense .stat-icon {
  background-color: #f44336;
}

.balance .stat-icon {
  background-color: #1976d2;
}

.stat-details h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #555;
  font-weight: 500;
}

.stat-details p {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.chart-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1976d2;
  display: flex;
  align-items: center;
  gap: 10px;
}

.chart-filter {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #e0e9f5;
  background-color: #f5f9ff;
  color: #1976d2;
  font-weight: 500;
  cursor: pointer;
}

.chart-wrapper {
  position: relative;
  height: 300px;
  width: 100%;
}

@media (max-width: 768px) {
  .reports-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-summary {
    grid-template-columns: 1fr;
  }
}
</style>