export enum PedalType {
  GAIN = "gain",
  MODULATION = "modulation",
  AMBIENCE = "ambience",
  PITCH = "pitch",
  DYNAMICS = "dynamics",
  OTHER = "other",
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
