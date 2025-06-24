<template>
  <div class="savings-calculator">
    <div class="calculator-header">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"></path>
      </svg>
      <h2>Savings Goal Planner</h2>
    </div>

    <form @submit.prevent="calculate" class="calculator-form">
      <div class="form-section">
        <label class="section-label">Currency</label>
        <div class="currency-selector">
          <button 
            v-for="option in currencyOptions" 
            :key="option.value"
            :class="{ active: currency === option.value }"
            @click.prevent="currency = option.value"
          >
            {{ option.symbol }} {{ option.label }}
          </button>
        </div>
      </div>

      <div class="form-section">
        <label class="section-label">Savings Goal</label>
        <div class="input-group">
          <span class="currency-prefix">{{ currency }}</span>
          <input 
            type="number" 
            v-model.number="savingsGoal" 
            min="0" 
            required 
            placeholder="10,000"
            class="amount-input"
          >
        </div>
      </div>

      <div class="form-section">
        <label class="section-label">Current Savings</label>
        <div class="input-group">
          <span class="currency-prefix">{{ currency }}</span>
          <input 
            type="number" 
            v-model.number="currentSavings" 
            min="0" 
            placeholder="1,000"
            class="amount-input"
          >
        </div>
      </div>

      <div class="form-section">
        <label class="section-label">Regular Savings</label>
        <div class="savings-frequency">
          <div class="input-group">
            <span class="currency-prefix">{{ currency }}</span>
            <input 
              type="number" 
              v-model.number="savingsAmount" 
              min="0" 
              required 
              placeholder="500"
              class="amount-input"
            >
          </div>
          <div class="frequency-tabs">
            <button
              v-for="freq in frequencyOptions"
              :key="freq.value"
              :class="{ active: frequency === freq.value }"
              @click.prevent="frequency = freq.value"
            >
              {{ freq.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="form-section">
        <label class="section-label">Annual Interest Rate</label>
        <div class="interest-slider">
          <input 
            type="range" 
            v-model.number="interestRate" 
            min="0" 
            max="20" 
            step="0.1"
            class="slider-input"
          >
          <div class="slider-value">{{ interestRate }}%</div>
        </div>
      </div>

      <button type="submit" class="calculate-button">
        Calculate Savings Plan
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </form>

    <div v-if="warning" class="result-message warning">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      {{ warning }}
    </div>

    <div v-if="result" class="result-message success">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      {{ result }}
    </div>

    <div v-if="result" class="savings-progress">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: `${Math.min(100, (currentSavings / savingsGoal) * 100)}%` }"
        ></div>
      </div>
      <div class="progress-labels">
        <span>Saved: {{ currency }}{{ currentSavings.toLocaleString() }}</span>
        <span>Goal: {{ currency }}{{ savingsGoal.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currencyOptions = [
  { value: '₹', label: 'INR', symbol: '₹' },
  { value: '$', label: 'USD', symbol: '$' },
  { value: '€', label: 'EUR', symbol: '€' },
  { value: '£', label: 'GBP', symbol: '£' }
]

const frequencyOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
]

const currency = ref('₹')
const savingsGoal = ref(10000)
const currentSavings = ref(1000)
const savingsAmount = ref(500)
const frequency = ref('monthly')
const interestRate = ref(3.5)
const result = ref('')
const warning = ref('')

function calculate() {
  warning.value = ''
  result.value = ''

  let periodSavings = savingsAmount.value
  if (frequency.value === 'weekly') periodSavings *= 52 / 12
  if (frequency.value === 'yearly') periodSavings /= 12

  if (periodSavings <= 0) {
    warning.value = 'Monthly savings must be greater than zero.'
    return
  }
  if (currentSavings.value >= savingsGoal.value) {
    warning.value = 'Goal already met with current savings!'
    return
  }

  let months = 0
  let balance = currentSavings.value
  const goal = savingsGoal.value
  const monthlyRate = interestRate.value > 0 ? (interestRate.value / 100) / 12 : 0

  while (balance < goal && months < 1000) {
    balance += periodSavings
    if (monthlyRate > 0) balance += balance * monthlyRate
    months++
  }

  if (months >= 1000) {
    warning.value = 'Goal not reachable with current settings.'
    return
  }

  const years = Math.floor(months / 12)
  const remMonths = months % 12
  result.value = `You'll reach your goal in ${years > 0 ? years + ' year(s) and ' : ''}${remMonths} month(s).`
}
</script>

<style scoped>
.savings-calculator {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 480px;
  margin: 0 auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.calculator-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.calculator-header svg {
  color: #3b82f6;
}

.calculator-header h2 {
  margin: 0;
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
}

.form-section {
  margin-bottom: 1.5rem;
}

.section-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
}

.currency-selector {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.currency-selector button {
  flex: 1;
  min-width: 80px;
  padding: 0.625rem 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.currency-selector button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-prefix {
  position: absolute;
  left: 12px;
  font-weight: 500;
  color: #64748b;
}

.amount-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background: #f8fafc;
}

.amount-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: white;
}

.savings-frequency {
  display: flex;
  gap: 0.75rem;
}

.frequency-tabs {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.frequency-tabs button {
  padding: 0 1rem;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  height: 100%;
  transition: all 0.2s;
}

.frequency-tabs button.active {
  background: #3b82f6;
  color: white;
}

.interest-slider {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slider-input {
  flex: 1;
  -webkit-appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  outline: none;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
}

.slider-value {
  min-width: 50px;
  text-align: center;
  font-weight: 500;
  color: #3b82f6;
}

.calculate-button {
  width: 100%;
  padding: 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.calculate-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.result-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
}

.result-message.success {
  background: #f0fdf4;
  color: #059669;
  border-left: 4px solid #059669;
}

.result-message.warning {
  background: #fef2f2;
  color: #dc2626;
  border-left: 4px solid #dc2626;
}

.savings-progress {
  margin-top: 1.5rem;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  transition: width 0.5s ease;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: #64748b;
}

@media (max-width: 480px) {
  .savings-calculator {
    padding: 1.5rem;
  }
  
  .savings-frequency {
    flex-direction: column;
  }
  
  .frequency-tabs {
    height: 40px;
  }
}
</style>