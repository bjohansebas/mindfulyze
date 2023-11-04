import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  LEMON_SQUEEZY_URL: z.string().min(1),
  LEMON_SQUEEZY_API_KEY: z.string().min(1),
  LEMON_SQUEEZY_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  SECRET_IV: z.string().min(1),
  COHERE_API_KEY: z.string().min(1),
  CLOUDINARY_URL: z.string().min(1),
})

export const env = envSchema.parse(process.env)
