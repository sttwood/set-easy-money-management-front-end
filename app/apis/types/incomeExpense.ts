export type IncomeExpenseResponses = {
  status: string
  data: IncomeExpense[]
}

export type IncomeExpenseResponse = {
  status: string
  data: IncomeExpense
}

export type IncomeExpense = {
  id: number
  amount: string
  note: string
  user_id: string
  category_id: number
  category?: {
    name?: string
    type?: string
    amount?: string
  }
  date: Date
  created_at?: Date
  updated_at?: Date
}

export type IncomeExpenseBody = {
  user_id: string
  amount: string
  note: string
  category_id: number
  date: Date
}

export type totalSummary = {
  income: number | null
  expense: number | null
  savings: number | null
}