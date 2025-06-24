<template>
  <div class="help-page">
    <div class="header">
      <h1 class="page-title">Help & Support</h1>
      <p class="page-subtitle">Find answers and get assistance with Budget Tracker</p>
    </div>
    
    <div class="help-sections">
      <div class="help-section">
        <div class="section-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <h3>Getting Started</h3>
        </div>
        <p>Welcome to Budget Tracker! Here's how to get started:</p>
        <ol class="steps-list">
          <li>Add your income and expense categories in the Categories page</li>
          <li>Record your transactions on the Dashboard</li>
          <li>View your transaction history in the History page</li>
          <li>Analyze your spending patterns in the Reports page</li>
        </ol>
      </div>
      
      <div class="help-section">
        <div class="section-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <h3>FAQs</h3>
        </div>
        <div class="faq-list">
          <div class="faq-item">
            <h4>How do I add a new transaction?</h4>
            <p>Go to the Dashboard and click the "+" button to open the transaction form. Fill in the details and submit.</p>
          </div>
          
          <div class="faq-item">
            <h4>Can I export my data?</h4>
            <p>Yes, you can export all your data as a JSON or CSV file from the Settings page under "Data Management".</p>
          </div>
          
          <div class="faq-item">
            <h4>How do I change the currency?</h4>
            <p>Navigate to Settings > Preferences where you can select from multiple currency options.</p>
          </div>

          <div class="faq-item">
            <h4>Is my data synced across devices?</h4>
            <p>Currently, Budget Tracker stores data locally in your browser. We're working on cloud sync for future versions.</p>
          </div>
        </div>
      </div>
      
      <div class="help-section">
        <div class="section-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <h3>Contact Support</h3>
        </div>
        <p>If you need further assistance, our team is here to help:</p>
        <div class="contact-methods">
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span><strong>Email:</strong> support@budgettracker.com</span>
          </div>
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span><strong>Phone:</strong> (555) 123-4567</span>
          </div>
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span><strong>Hours:</strong> Mon-Fri, 9AM-5PM EST</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpPage'
}
</script>

<style scoped>
.help-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #64748b;
}

.help-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.help-section {
  background: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
  border: 1px solid #e0e7ff;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.section-header svg {
  flex-shrink: 0;
}

.help-section h3 {
  font-size: 1.25rem;
  color: #1e40af;
  margin: 0;
}

.help-section p {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.steps-list {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.steps-list li {
  margin-bottom: 0.75rem;
  color: #334155;
  position: relative;
  padding-left: 1.5rem;
}

.steps-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  border-radius: 50%;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.faq-item {
  background: #f8fafc;
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.faq-item h4 {
  font-size: 1rem;
  color: #1e40af;
  margin: 0 0 0.5rem 0;
}

.faq-item p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #334155;
}

.contact-item svg {
  flex-shrink: 0;
}

.contact-item strong {
  color: #1e40af;
}

@media (max-width: 768px) {
  .help-page {
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 1.75rem;
  }
  
  .help-section {
    padding: 1.25rem;
  }
}
</style>