<template>
  <div class="transaction-form">
    <div class="form-header">
      <h3 class="form-title">Add Expense</h3>
      <button class="close-btn" @click="$emit('close')">
        <!-- ...svg... -->
      </button>
    </div>
    <Form :validation-schema="schema" @submit="submitExpense" class="form-body">
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
          placeholder="Groceries, Rent, etc."
          class="form-input"
        />
        <ErrorMessage name="description" class="validation-message" />
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <div class="select-wrapper">
          <Field as="select" name="category" class="form-input">
            <option disabled value="">Select category</option>
            <option v-for="cat in expenseCategories" :key="cat.id" :value="cat.name">
              {{ cat.name }}
            </option>
          </Field>
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
        </div>
        <ErrorMessage name="date" class="validation-message" />
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-cancel" @click="$emit('close')">
          Cancel
        </button>
        <button type="submit" class="btn btn-submit">
          Add Expense
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

const expenseCategories = computed(() =>
  budgetStore.categories.filter(cat => cat.type === 'expense')
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

function submitExpense(values, { resetForm }) {
  const expense = {
    ...values,
    amount: Number(values.amount),
    type: 'expense'
  }
  const success = budgetStore.addExpense(expense)
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
  background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
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
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;
  background-color: #fff;
}

.form-input:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
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
  width: 50%;
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
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
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
  background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
  color: white;
  border: none;
}

.btn-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
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
  color: #e05a77;
  margin-top: 0.25rem;
  font-size: 0.97rem;
  font-weight: 500;
}

.error-message-attractive {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 320px;
  max-width: 90vw;
  z-index: 9999;
  background: #fff3cd;
  color: #856404;
  border: 1.5px solid #ffeeba;
  border-radius: 10px;
  padding: 1.2rem 3rem 1.2rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.error-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.error-close-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.error-close-btn svg {
  width: 16px;
  height: 16px;
  color: #856404;
}
</style>

