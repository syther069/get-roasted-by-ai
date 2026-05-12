export type ValidatorId = string

export type InputType = "text" | "twitter" | "github"

export interface ValidatorVote {
  validatorId: string
  roast: string
  score: number
  confidence: number
  reasoning: string
  timestamp: number
}

export interface Validator {
  id: ValidatorId
  name: string
  emoji: string
  personality: string
  bio: string
  specialty: string
}