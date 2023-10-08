import { Feedback } from './thought'

interface CohereAPIResponse {
  id: string
  classifications: {
    id: string
    input: string
    prediction: Feedback
    confidence: number
    confidences: {
      option: Feedback
      confidence: number
    }[]
    labels: {
      [Feedback.positive]: { confidence: number }
      [Feedback.negative]: { confidence: number }
      [Feedback.neutral]: { confidence: number }
    }
  }[]
}
