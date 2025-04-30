import {z} from 'zod'

export const RoofSchema = z.object({
  class: z.enum(['A', 'B', 'C']),
  type: z.string(),
  age: z.number().optional(),
  lastInspectionDate: z.string().optional(),
})

export const StructureSchema = z.object({
  constructionYear: z.number().optional(),
  constructionTypes: z.array(z.string()),
  squareFeet: z.number().optional(),
  stories: z.number().optional(),
  roof: RoofSchema,
  decks: z
    .object({
      present: z.boolean(),
      fireResistant: z.boolean().optional(),
    })
    .optional(),
  eaves: z
    .object({
      type: z.string().optional(),
      vented: z.boolean().optional(),
      emberResistant: z.boolean().optional(),
    })
    .optional(),
})

export const VegetationPlantSchema = z.object({
  type: z.string(),
  distanceToStructure: z.number(),
  fireResistant: z.boolean().optional(),
})

export const VegetationSchema = z.object({
  defensibleSpaceFeet: z.number().optional(),
  plants: z.array(VegetationPlantSchema),
  defensibleSpaceImmediateFeet: z.number().optional(), // 0–5ft zone
})

export const LocationSchema = z.object({
  fireSeverity: z.enum(['Low', 'Moderate', 'High', 'Extreme']),
})

export const RegionalContextSchema = z.object({
  droughtIndex: z.number().optional(),
})

export const WaterResourcesSchema = z.object({
  fireHydrant: z
    .object({
      available: z.boolean(),
      distance: z.number().optional(), // feet
      pressure: z.number().optional(), // psi
    })
    .optional(),
  privateStorage: z
    .object({
      hasTank: z.boolean().optional(),
      capacityGallons: z.number().optional(),
      hasPool: z.boolean().optional(),
      hasPond: z.boolean().optional(),
    })
    .optional(),
})

export const UtilitiesSchema = z.object({
  electricProvider: z.string().optional(),
  linesUnderground: z.boolean().optional(),
  hadShutoffDuringHighRisk: z.boolean().optional(),
})

export const PropertyObservationSchema = z.object({
  location: LocationSchema,
  structure: StructureSchema,
  vegetation: VegetationSchema,
  regionalContext: RegionalContextSchema.optional(),
  waterResources: WaterResourcesSchema.optional(), // <-- NEW
  utilities: UtilitiesSchema.optional(),
})

export type PropertyObservation = z.infer<typeof PropertyObservationSchema>
