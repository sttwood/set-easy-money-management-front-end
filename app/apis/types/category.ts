export type CategoryResponses = {
  status: string
  data: Category[]
}

export type Category = {
  id: number
  name: string
  type: string
  user_id: string
}

export type CategoryBody = {
  name: string
  type: string
  user_id: string
}