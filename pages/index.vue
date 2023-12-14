<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selected" :options="transactionPeriods" placeholder="Select period" />
    </div>
  </section>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
    <Trand color="green" title="Income" :amount="4000" :last-amount="3000" :loading="false"/>
    <Trand color="red" title="Income" :amount="2000" :last-amount="3000" :loading="false"/>
    <Trand color="green" title="Income" :amount="1000" :last-amount="3000" :loading="false"/>
    <Trand color="red" title="Income" :amount="3000" :last-amount="3000" :loading="true"/>
  </section>
  <section>
    <Transactions v-for="transaction in transactions" :key="transaction.id" :transaction="transaction"/>
  </section>
</template>

<script setup>
import { transactionPeriods } from '~/constants';
const selected = ref(transactionPeriods[1]);

const supabaseClient = useSupabaseClient()

const transactions = ref([])

const { data, pending } = await useAsyncData('transactions', async () => {
  const { data, error } = await supabaseClient
    .from('transactions')
    .select()

  if (error) {
    return []
  }
  return data
})

transactions.value = data.value

const transactionsGroupByDate = computed(() => {
  let grouped = {}

  for (const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split('T')[0]

    if (!grouped[date]) {
      grouped[date] = []
    }

    grouped[date].push(transaction)
    
  }
})
</script>

<style>

</style>