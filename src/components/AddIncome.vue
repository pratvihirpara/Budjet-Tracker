<template>
  <div class="transaction-form">
    <div class="form-header">
      <h3 class="form-title">Add Income</h3>
      <button class="close-btn" @click="$emit('close')">
        <!-- ...svg... -->
      </button>
    </div>
    <Form :validation-schema="schema" @submit="submitIncome" class="form-body">
      <div class="form-group">
        <label class="form-label">Amount</label>
        <div class="input-with-icon">
          <span class="currency">{{ currencySymbol }}</span>
          <Field
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            class="form-input"
          />
        </div>
        <ErrorMessage name="amount" class="validation-message" />
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <Field
          name="description"
          type="text"
          placeholder="Salary, Bonus, etc."
          class="form-input"
        />
        <ErrorMessage name="description" class="validation-message" />
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <div class="select-wrapper">
          <Field as="select" name="category" class="form-input">
            <option disabled value="">Select category</option>
            <option v-for="cat in incomeCategories" :key="cat.id" :value="cat.name">
              {{ cat.name }}
            </option>
          </Field>
          <svg class="select-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <ErrorMessage name="category" class="validation-message" />
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <div class="date-input-wrapper">
          <Field
            name="date"
            type="date"
            class="form-date"
          />
          <svg class="date-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <ErrorMessage name="date" class="validation-message" />
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-cancel" @click="$emit('close')">
          Cancel
        </button>
        <button type="submit" class="btn btn-submit">
          Add Income
        </button>
      </div>
    </Form>
    <div v-if="budgetStore.validationMessage" class="validation-message">
      {{ budgetStore.validationMessage }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBudgetStore } from '../store/useBudgetStore'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const budgetStore = useBudgetStore()

const incomeCategories = computed(() =>
  budgetStore.categories.filter(cat => cat.type === 'income')
)

const currencySymbol = computed(() => {
  switch (budgetStore.currency) {
    case 'INR': return '₹'
    case 'USD': return '$'
    case 'EUR': return '€'
    case 'GBP': return '£'
    default: return '$'
  }
})

// Validation schema
const schema = yup.object({
  amount: yup
    .number()
    .typeError('Amount is required')
    .required('Amount is required')
    .positive('Amount must be positive'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required')
})

function submitIncome(values, { resetForm }) {
  const income = {
    ...values,
    amount: Number(values.amount),
    type: 'income'
  }
  const success = budgetStore.addIncome(income)
  if (success) {
    resetForm()
  }
}
</script>

<style scoped>
.transaction-form {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
}

.form-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.form-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 12px;
  font-weight: 500;
  color: #6b7280;
}

.form-input {
  width: 100%;
  min-width: 0;
  padding: 0.75rem 1rem 0.75rem 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input[type="select"],
select.form-input {
  /* Hide the native dropdown arrow for most browsers */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;
  background-color: #fff;
}

.form-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.select-wrapper {
  position: relative;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  pointer-events: none;
  color: #6b7280;
}

.date-input-wrapper {
  position: relative;
  width: 50%; /* Make date input smaller */
}

.form-date {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-date:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.date-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  pointer-events: none;
  color: #6b7280;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  border: none;
}

.btn-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.btn-cancel {
  background: white;
  color: #6b7280;
  border: 1px solid #e5e7eb;
}

.btn-cancel:hover {
  background: #f9fafb;
}

.validation-message {
  color: #e05a77; /* Use a more vivid red (rose-600 from Tailwind) */
  margin-top: 0.25rem;
  font-size: 0.97rem;
  font-weight: 500;
}
</style>