<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selected" :options="transactionPeriods" placeholder="Select period" />
    </div>
  </section>
</template>

<script setup>
import { transactionPeriods } from '~/constants';
const selected = ref(transactionPeriods[1]);
</script>

<style>

</style>