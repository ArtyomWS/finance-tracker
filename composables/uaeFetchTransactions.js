export const useUaeFetchTransactions = (period) => {
  const supabaseClient = useSupabaseClient()
  const transactions = ref([])
  const isLoading = ref(false)

  const income = computed(
    () => transactions.value.filter(t => t.type === 'Income')
  )

  const outcome = computed(
    () => transactions.value.filter(t => t.type === 'Outcome')
  )

  const incomeCount = computed(() => income.value.length)
  const outcomeCount = computed(() => outcome.value.length)

  const incomeTotal = computed(
    () => income.value.reduce((total, transaction) => total + transaction.amount, 0)
  )

  const outcomeTotal = computed(
    () => outcome.value.reduce((total, transaction) => total + transaction.amount, 0)
  )

  const fetchTransactions = async () => {
  isLoading.value = true
  try {
    const { data } = await useAsyncData(`transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`, async () => {
      const { data, error } = await supabaseClient
        .from('transactions')
        .select()
        .gte('created_at', period.value.from.toISOString())
        .lte('created_at', period.value.to.toISOString())
        .order('created_at', {ascending: false})

      if (error) {
        return []
      }
        return data
      })
      return data.value
    } finally {
      isLoading.value = false
    }
  }
  const refresh = async () => transactions.value = await fetchTransactions()

  watch(period, async () => await refresh())

  const transactionsGroupByDate = computed(() => {
  let grouped = {}

  for (const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split('T')[0]

    if (!grouped[date]) {
      grouped[date] = []
    }
      grouped[date].push(transaction)
    }
    return grouped
  })

  return {
    transactions: {
      all: transactions,
      grouped: {
        byDate: transactionsGroupByDate
      },
      income,
      outcome,
      incomeTotal,
      outcomeTotal,
      incomeCount,
      outcomeCount
    },
    refresh,
    isLoading
  }
}
