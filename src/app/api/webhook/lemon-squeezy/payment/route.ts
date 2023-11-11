import { LemonSqueezyResponse } from '@/@types/lemon-squeezy'
import { subscriptionCreated, subscriptionUpdated } from '@/lib/api/lemon-squeezy'
import { BAD_REQUEST_CODE, UNAUTHORIZED_CODE } from '@/lib/constants/status-code'
import { verifySignature } from '@/lib/lemon-squeezy'

/* To invoke:

curl --location --request POST 'https://e52f-181-58-39-217.ngrok-free.app/api/webhooks/lemon-squeezy/payment' \
--header 'Cookie: next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000; next-auth.csrf-token=76488924cff60229b4fbd6a414f6c995afdfbeae926469853bd9d482f50f25c1%7C38b9aa641aa99ecb2e05e26de18836a6e019305b15754fc82dc2a44e322f28dd'

PRD Endpoint: https://mindfulyze.com/api/webhooks/lemon-squeezy/payment
@reference https://docs.lemonsqueezy.com/api/webhooks
*/

export async function POST(req: Request) {
  try {
    const { body, data: isValidSignature } = await verifySignature({ request: req })

    if (!isValidSignature) return Response.json({}, { status: UNAUTHORIZED_CODE })

    const { meta, data }: LemonSqueezyResponse = JSON.parse(body.toString())

    if (meta.event_name !== 'subscription_created' && meta.event_name !== 'subscription_updated') {
      return Response.json({}, { status: BAD_REQUEST_CODE })
    }

    if (meta.event_name === 'subscription_created') {
      const response = await subscriptionCreated({
        productId: data.attributes.product_id.toString(),
        variantId: data.attributes.variant_id.toString(),
        userEmail: data.attributes.user_email,
        renewsAt: data.attributes.renews_at,
        status: data.attributes.status,
        lemonsqueezyId: parseInt(data.id),
      })

      return Response.json({ data: response.data, message: response.message }, { status: response.status })
    } else if (meta.event_name === 'subscription_updated') {
      const response = await subscriptionUpdated({
        productId: data.attributes.product_id.toString(),
        variantId: data.attributes.variant_id.toString(),
        userEmail: data.attributes.user_email,
        renewsAt: data.attributes.renews_at,
        endsAt: data.attributes.ends_at,
        status: data.attributes.status,
        lemonsqueezyId: parseInt(data.id),
      })

      return Response.json({ data: response.data, message: response.message }, { status: response.status })
    }
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        message: error.message || 'Error',
        data: null,
      },
      { status: 500 },
    )
  }
}
