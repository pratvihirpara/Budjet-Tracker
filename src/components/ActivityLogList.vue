<template>
  <div class="activity-log-list">
    <h3>Activity Log</h3>
    <div v-if="activityLog.length === 0" class="empty">No activity yet</div>
    <table v-else>
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Action</th>
          <th>Type</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in sortedLog" :key="log.id">
          <td>{{ formatDateTime(log.date) }}</td>
          <td>{{ log.action }}</td>
          <td>{{ log.type }}</td>
          <td>
            <pre style="white-space: pre-wrap;">{{ formatDetails(log.details) }}</pre>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBudgetStore } from '../store/useBudgetStore'

const budgetStore = useBudgetStore()
const activityLog = budgetStore.activityLog

const sortedLog = computed(() =>
  [...activityLog].sort((a, b) => new Date(b.date) - new Date(a.date))
)

function formatDateTime(date) {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleString()
}

function formatDetails(details) {
  if (typeof details === 'string') return details
  return JSON.stringify(details, null, 2)
}
</script>

<style scoped>
.activity-log-list {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
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
pre {
  margin: 0;
  font-size: 0.95em;
}
</style>