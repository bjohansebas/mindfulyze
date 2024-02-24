import type { Schema } from 'zod'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function validateSchema<S extends Schema>(schema: S, input: any) {
  return schema.safeParse(input)
}
