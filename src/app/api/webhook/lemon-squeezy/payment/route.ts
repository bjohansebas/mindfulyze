import { LemonSqueezyResponse } from '@/@types/lemon-squeezy'

import { subscriptionCreatedHandler } from '@/lib/api/lemon-squeezy'

/* To invoke:

curl --location --request POST 'https://e52f-181-58-39-217.ngrok-free.app/api/webhooks/lemon-squeezy/payment' \
--header 'Cookie: next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000; next-auth.csrf-token=76488924cff60229b4fbd6a414f6c995afdfbeae926469853bd9d482f50f25c1%7C38b9aa641aa99ecb2e05e26de18836a6e019305b15754fc82dc2a44e322f28dd'

PRD Endpoint: https://mindfulyze.com/api/webhooks/lemon-squeezy/payment
@reference https://docs.lemonsqueezy.com/api/webhooks
*/

export async function POST(req: Request) {
  try {
    const { data } = (await req.json()) as LemonSqueezyResponse

    const response = await subscriptionCreatedHandler({
      productId: data.attributes.product_id.toString(),
      variantId: data.attributes.variant_id.toString(),
      userEmail: data.attributes.user_email,
      renewsAt: data.attributes.renews_at,
    })

    return Response.json({ data: response.data, message: response.message }, { status: response.status })
  } catch (error: unknown) {
    return Response.json(
      {
        message: 'Error',
        data: null,
      },
      { status: 500 },
    )
  }
}
