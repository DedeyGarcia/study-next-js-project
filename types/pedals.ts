import * as z from "zod"

export enum PedalType {
  GAIN = "gain",
  MODULATION = "modulation",
  AMBIENCE = "ambience",
  PITCH = "pitch",
  DYNAMICS = "dynamics",
  OTHER = "other",
}
// TODO: receive from api endpoint futurely
export const pedalTypeOptions = Object.values(PedalType)

export const pedalTypeDict: Record<PedalType, string> = {
  ambience: "Ambiência",
  gain: "Distorção",
  modulation: "Modulação",
  pitch: "Pitch",
  dynamics: "Dinâmica",
  other: "Outro",
}

export interface Pedal {
  id: number
  name: string
  brand: string
  type: PedalType
  price: number
  acquired_at: string
  img_url?: string | null
  created_at: string
  updated_at: string
}

export const createPedalFormSchema = z.object({
  acquired_at: z.string({}).refine((date) => {
    return !isNaN(Date.parse(date))
  }, "Data de aquisição inválida"),
  brand: z.string().min(2, "Campo obrigatório"),
  img_url: z.string().optional(),
  name: z.string().min(2, "Campo obrigatório"),
  price: z.number().positive("O preço deve ser um número positivo"),
  type: z.enum([
    "gain",
    "modulation",
    "ambience",
    "pitch",
    "dynamics",
    "other",
  ]),
})

export type CreatePedalFormData = z.infer<typeof createPedalFormSchema>
export type CreatePedalRequest = z.infer<typeof createPedalFormSchema>
