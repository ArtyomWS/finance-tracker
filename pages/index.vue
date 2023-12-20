<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selected" :options="transactionPeriods" placeholder="Select period" />
    </div>
  </section>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
    <Trand color="green" title="Income" :amount="incomeTotal" :last-amount="3000" :loading="false"/>
    <Trand color="red" title="Outcome" :amount="outcomeTotal" :last-amount="3000" :loading="false"/>
    <Trand color="green" title="Income" :amount="1000" :last-amount="3000" :loading="false"/>
    <Trand color="red" title="Income" :amount="3000" :last-amount="3000" :loading="isLoading"/>
  </section>
  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">Transactions</h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ outcomeCount }} expense this period
      </div>
    </div>
    <div>
      <TransactionModal v-model="isOpen" @saved="refresh()" />
      <UButton icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" @click="isOpen = true"/>
    </div>
  </section>

  <section v-if="!isLoading">
    <div v-for="(transactionsOnDay, date) in byDate" :key="date" class="mb-10">
      <DailyTransactionSummary :date="date" :transactions="transactionsOnDay"/>
      <Transactions v-for="transaction in transactionsOnDay" :key="transaction.id" :transaction="transaction" 
        @deleted="refresh()"/>
    </div>
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i"/>
  </section>

</template>

<script setup>
import { useUaeFetchTransactions } from '~/composables/uaeFetchTransactions';
import { useUseSelectedTimePeriod } from '~/composables/useSelectedTimePeriod';
import { transactionPeriods } from '~/constants';

const selected = ref(transactionPeriods[1]);
const isOpen = ref(false)
const dates = useUseSelectedTimePeriod(selectedView)

const { isLoading, refresh, transactions: {
  incomeCount,
  outcomeCount,
  incomeTotal,
  outcomeTotal,
  grouped: {
    byDate
  }
}} = useUaeFetchTransactions()

await refresh()

</script>

<style>

</style>