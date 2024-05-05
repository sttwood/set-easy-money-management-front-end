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
  date: Date
}

export type IncomeExpenseBody = {
  user_id: string
  amount: string
  note: string
  category_id: number
  date: Date
}