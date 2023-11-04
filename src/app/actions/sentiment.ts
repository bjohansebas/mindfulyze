'use server'

import { CohereAPIResponse } from '@/@types/cohere'
import { env } from '@/lib/env'
import prisma from '@/lib/prisma'
import { getThoughtByIdWithOutText } from './thoughts'

export async function getDataOfSentimentAnalysis() {
  return await prisma.sentimentAnalysis.findMany({
    select: {
      message: true,
      type: true,
    },
  })
}

export async function addSentimentToThoughts(id: string, message: string) {
  try {
    const thought = await getThoughtByIdWithOutText(id)

    const examples = (await getDataOfSentimentAnalysis()).map((data) => {
      return { text: data.message, label: data.type }
    })

    const request = await fetch('https://api.cohere.ai/v1/classify', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'embed-multilingual-v2.0',
        inputs: [message],
        examples,
      }),
    })

    const response: CohereAPIResponse = await request.json()

    if (request.status !== 200) {
      return { message: 'The thought could not be analyzed correctly, please try again.', status: 400, data: null }
    }

    const feedback = response.classifications[0].prediction.toLowerCase()

    if (feedback !== thought.data?.type) {
      await prisma.thought.update({
        where: {
          id: id,
        },
        data: {
          // @ts-ignore
          type: feedback,
        },
      })
    }

    return { data: feedback, status: 201 }
  } catch (e) {
    return { message: 'The thought could not be analyzed correctly, please try again.', status: 400, data: null }
  }
}
