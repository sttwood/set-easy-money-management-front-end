import axios from 'axios'

export const getAllCategory = async (userId: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/categories/${userId}`)
    return response.data
  } catch (err) {
    console.log(err)
  }
}