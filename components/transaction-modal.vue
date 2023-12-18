<template>
  <div>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          Add Transaction
        </template>
        <UForm :state="state" :schema="validationSchema" ref="form" @submit.prevent="save">
          <UFormGroup :required="true" label="Transaction type" name="type" class="mb-4">
            <USelect placeholder="Transaction type" :options="types" v-model="state.type"/>
          </UFormGroup>

          <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
            <UInput type="number" placeholder="Amount" v-model.number="state.amount"/>
          </UFormGroup>

          <UFormGroup label="Transaction Date" :required="true" name="created_at" class="mb-4">
            <UInput type="date" icon="i=heroicons-calendar-days-20-solid" v-model="state.created_at"/>
          </UFormGroup>

          <UFormGroup label="Description" hint="Optional" name="description" class="mb-4">
            <UInput placeholder="Description" v-model="state.description"/>
          </UFormGroup>

          <UFormGroup :required="true" label="Ccategory" name="category" class="mb-4" v-if="state.type === 'Outcome'">
            <USelect placeholder="Category" :options="categories" v-model="state.category"/>
          </UFormGroup>
          <UButton type="submit" color="black" variant="solid" label="Save"/>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { categories } from '~/constants'
import { types } from '~/constants'
import { z } from 'zod'

const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])

const defultValidationSchema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive("Amoun needs to be more than 0"),
})

const incomeSchema = z.object({
  type: z.literal('Income')
})

const outcomeSchema = z.object({
  type: z.literal('Oucome'),
  category: z.enum(categories)
})

const validationSchema = z.intersection(
  z.discriminatedUnion('type', [incomeSchema, outcomeSchema]),
  defultValidationSchema
)

const form = ref()

const save = async () => {
  form.value.validate()
}

const initialState = {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined,
}

const state = ref({
  ...initialState
})

const resetForm = () => {
  Object.assign(state.value, initialState)
}

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue')
})
</script>

<style>

</style>