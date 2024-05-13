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

export const getIncomeExpenseById = async (id: number) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/income-expense/${id}`)

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

export const updateIncomeExpense = async (data: IncomeExpenseBody, id: number) => {
  try {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/income-expense/${id}`, data)

    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const deleteIncomeExpense = async (id: number) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/income-expense/${id}`)

    return response.data
  } catch (err) {
    console.log(err)
  }
}