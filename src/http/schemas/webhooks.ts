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

export const WEBHOOK_DETAIL_SCHEMA = z4.object({
  id: z4.uuidv7(),
  method: z4.string(),
  pathname: z4.string(),
  ip: z4.string(),
  statusCode: z4.number(),
  contentType: z4.string().nullable(),
  contentLength: z4.number().nullable(),
  queryParams: z4.record(z4.string(), z4.string()).nullable(),
  headers: z4.record(z4.string(), z4.string()),
  body: z4.string().nullable(),
  createdAt: z4.coerce.date(),
})
