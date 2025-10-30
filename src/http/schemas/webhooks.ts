import z4 from 'zod/v4'

export const WEBHOOK_LIST_ITEM_SCHEMA = z4.object({
  id: z4.uuidv7(),
  method: z4.string(),
  pathname: z4.string(),
  createdAt: z4.coerce.date(),
})

export const WEBHOOK_LIST_SCHEMA = z4.object({
  webhooks: z4.array(WEBHOOK_LIST_ITEM_SCHEMA),
  nextCursor: z4.uuidv7().nullable(),
})
