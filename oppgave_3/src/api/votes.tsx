import { BASE_URL } from '../config'
import fetch from '@/lib/fetch'
import { type Vote, type VoteCreateInput } from '@/types'

const VOTES_URL = `${BASE_URL}/votes`

export const getVotes = (options?: {}) => {
  return fetch<Vote[]>(VOTES_URL, {
    method: 'GET',
    ...options,
  })
}

export const getQuestionVotes = (questionId: string, options?: {}) => {
  return fetch<Vote[]>(`${VOTES_URL}/${questionId}`, {
    method: 'GET',
    ...options,
  })
}

export const createVote = (data: VoteCreateInput, options?: {}) => {
  return fetch<Vote>(VOTES_URL, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data),
  })
}
