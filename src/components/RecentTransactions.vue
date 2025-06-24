<template>
  <div class="recent-transactions">
    <div class="section-header">
      <h3>Recent Transactions</h3>
      <router-link to="/history" class="view-all">View All →</router-link>
    </div>
    <TransactionList :limit="5" />
  </div>
</template>

<script setup>
import TransactionList from './TransactionList.vue'
</script>

<style scoped>
/* Add your styles or reuse from DashboardPage.vue */
</style>