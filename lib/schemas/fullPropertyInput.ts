import {z} from 'zod'
import {PropertyObservationSchema} from './propertyObservation'

export const PropertyMetadataSchema = z.object({
  propertyId: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  dateOfObservation: z.string(),
  observationId: z.string().optional(),
})

export const FullPropertyInputSchema = z.object({
  metadata: PropertyMetadataSchema,
  observation: PropertyObservationSchema,
})

export type PropertyMetadata = z.infer<typeof PropertyMetadataSchema>
export type FullPropertyInput = z.infer<typeof FullPropertyInputSchema>
