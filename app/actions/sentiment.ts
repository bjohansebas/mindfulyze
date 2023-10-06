'use server'

import { CohereAPIResponse } from '@/@types/cohere'
import prisma from '@/lib/prisma'

export async function getDataOfSentimentAnalysis() {
  return await prisma.sentimentAnalysis.findMany({
    select: {
      message: true,
      type: true,
    },
  })
}

export async function addSentimentToThoughts(message: string) {
  try {
    const examples = (await getDataOfSentimentAnalysis()).map((data) => {
      return { text: data.message, label: data.type }
    })

    const request = await fetch('https://api.cohere.ai/v1/classify', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'large',
        inputs: [message],
        examples,
      }),
    })

    const response: CohereAPIResponse = await request.json()

    if (request.status !== 200) {
      return { message: 'The thought could not be analyzed correctly, please try again.', status: 400, data: null }
    }

    const feedback = response.classifications[0].prediction

    return { data: feedback, status: 201 }
  } catch (e) {
    return { message: 'The thought could not be analyzed correctly, please try again.', status: 400, data: null }
  }
}
