<template>
  <div class="savings-page">
    <!-- Header Section -->
    <div class="page-header-box">
      <div class="header-content">
        <h1 class="page-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"></path>
          </svg>
          Savings Planner
        </h1>
        <p class="page-subtitle">Plan your financial goals and track your progress</p>
      </div>
      <div class="header-illustration">
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v4"></path>
          <path d="m17 7 1 1"></path>
          <path d="M22 12h-4"></path>
          <path d="m17 17 1-1"></path>
          <path d="M12 22v-4"></path>
          <path d="m7 17-1-1"></path>
          <path d="M2 12h4"></path>
          <path d="m7 7-1 1"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-box">
      <div class="calculator-box">
        <SavingsCalculator />
      </div>
      
      <div class="tips-box">
        <div class="tips-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <h3>Savings Tips</h3>
        </div>
        <ul class="tips-list">
          <li class="tip-item">
            <span class="tip-icon">✓</span>
            <span>Pay yourself first - automate your savings</span>
          </li>
          <li class="tip-item">
            <span class="tip-icon">✓</span>
            <span>Aim to save at least 20% of your income</span>
          </li>
          <li class="tip-item">
            <span class="tip-icon">✓</span>
            <span>Review and adjust your savings plan quarterly</span>
          </li>
          <li class="tip-item">
            <span class="tip-icon">✓</span>
            <span>Consider high-yield savings accounts</span>
          </li>
          <li class="tip-item">
            <span class="tip-icon">✓</span>
            <span>Set specific, measurable financial goals</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import SavingsCalculator from '../components/SavingsCalculator.vue';
</script>

<style scoped>
.savings-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: #1e293b;
}

/* Header Box */
.page-header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  padding: 2rem;
  border-radius: 16px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  flex: 1;
  z-index: 2;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-title svg {
  color: #bfdbfe;
}

.page-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
  font-weight: 400;
}

.header-illustration {
  opacity: 0.15;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

.header-illustration svg {
  color: white;
}

/* Content Box */
.content-box {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

/* Calculator Box */
.calculator-box {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

/* Tips Box */
.tips-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  align-self: start;
  position: sticky;
  top: 1rem;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.tips-header h3 {
  margin: 0;
  font-size: 1.125rem;
  color: #1e40af;
}

.tips-header svg {
  color: #3b82f6;
}

.tips-list {
  padding: 1rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.5rem 0;
  line-height: 1.5;
}

.tip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #e0e7ff;
  color: #3b82f6;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-box {
    grid-template-columns: 1fr;
  }
  
  .page-header-box {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
  
  .page-title {
    justify-content: center;
  }
  
  .header-illustration {
    position: relative;
    opacity: 0.3;
    right: auto;
    top: auto;
    transform: none;
    margin-top: 1rem;
  }
  
  .tips-box {
    position: static;
  }
}
</style>