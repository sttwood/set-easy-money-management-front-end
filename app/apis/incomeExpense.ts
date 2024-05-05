import axios from 'axios'
import {IncomeExpenseBody} from './types/incomeExpense'

export const getAllIncomeExpense = async (userId: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/incomes-expenses/${userId}`)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const createIncomeExpense = async (data: IncomeExpenseBody) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/income-expense`, data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}