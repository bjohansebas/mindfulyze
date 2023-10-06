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
      [Feedback.Positive]: { confidence: number }
      [Feedback.Negative]: { confidence: number }
      [Feedback.Neutral]: { confidence: number }
    }
  }[]
}
