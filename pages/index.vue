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
    <Transactions />
    <Transactions />
    <Transactions />
    <Transactions />
  </section>
</template>

<script setup>
import { transactionPeriods } from '~/constants';
const selected = ref(transactionPeriods[1]);
</script>

<style>

</style>