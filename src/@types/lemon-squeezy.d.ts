/**
 * Webhook response (Lemon Squeezy)
 * @reference https://docs.lemonsqueezy.com/help/webhooks
 */
export interface LemonSqueezyResponse {
  meta: {
    event_name: string
  }
  data: {
    attributes: {
      product_id: string
      variant_id: string
      user_email: string
      renews_at: string
      ends_at: string | null
    }
  }
}

/**
 * Variant object (Lemon Squeezy)
 * @reference https://docs.lemonsqueezy.com/api/variants#the-variant-object
 */
export interface LemonSqueezyVariant {
  data: {
    id: string
    attributes: {
      name: string
      price: number
      interval: SubscriptionFrequency
    }
  }
}
