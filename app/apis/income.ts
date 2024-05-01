import axios from "axios"

const API_URL = "/api/income"

export const getIncome = async () => {
  const {data} = await axios.get(API_URL)
  return data
}