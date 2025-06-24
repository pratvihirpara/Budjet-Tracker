<template>
  <div class="transaction-form">
    <div class="form-header">
      <h3 class="form-title">Add Transfer</h3>
      <button class="close-btn" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <Form :validation-schema="schema" @submit="submitTransfer" class="form-body">
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
        <label class="form-label">From Account</label>
        <Field
          name="fromAccount"
          type="text"
          placeholder="e.g. Bank A"
          class="form-input"
        />
        <ErrorMessage name="fromAccount" class="validation-message" />
      </div>
      <div class="form-group">
        <label class="form-label">To Account</label>
        <Field
          name="toAccount"
          type="text"
          placeholder="e.g. Bank B"
          class="form-input"
        />
        <ErrorMessage name="toAccount" class="validation-message" />
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
          Add Transfer
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
  fromAccount: yup.string().required('From Account is required'),
  toAccount: yup.string().required('To Account is required'),
  date: yup.string().required('Date is required')
})

function submitTransfer(values, { resetForm }) {
  const transfer = {
    ...values,
    amount: Number(values.amount),
    type: 'transfer'
  }
  const success = budgetStore.addTransfer(transfer)
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
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
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
  padding: 0.75rem 1rem 0.75rem 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-input[type="select"],
select.form-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;
  background-color: #fff;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  appearance: none;
  background-color: white;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
}

.form-date {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.form-date:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #fee2e2;
  color: #b91c1c;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.error-message svg {
  flex-shrink: 0;
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
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  color: white;
  border: none;
}

.btn-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.btn-cancel {
  background: white;
  color: #6b7280;
  border: 1px solid #e5e7eb;
}

.btn-cancel:hover {
  background: #f9fafb;
}

.small-input-wrapper {
  width: 60%;
  max-width: 220px;
}

.form-date,
.form-note {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
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

.error-icon {
  font-size: 1.5rem;
}
</style>