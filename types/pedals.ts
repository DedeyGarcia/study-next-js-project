export enum PedalType {
  GAIN = "gain",
  MODULATION = "modulation",
  AMBIENCE = "ambience",
  PITCH = "pitch",
  DYNAMICS = "dynamics",
  OTHER = "other",
}

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

// TODO: receive from api endpoint futurely
