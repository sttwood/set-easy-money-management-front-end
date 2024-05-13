import axios from 'axios'
import {CategoryBody} from './types/category'

export const getAllCategory = async (userId: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/categories/${userId}`)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const createCategory = async (body: CategoryBody) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/category`, body)
    return response.data
  } catch (err) {
    console.log(err)
  }
}