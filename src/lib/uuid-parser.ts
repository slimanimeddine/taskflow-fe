import { createParser } from 'nuqs'
import { z } from 'zod'

const uuidSchema = z.string().uuid()

export const parseAsUuid = createParser({
  parse: (value: string) => {
    const result = uuidSchema.safeParse(value)
    if (!result.success) {
      throw new Error('Invalid UUID format')
    }
    return result.data
  },
  serialize: (value: string) => value,
})
