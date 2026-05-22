export const queryKeys = {
  pedals: {
    all: () => ["pedals"] as const,
    // detail: (id: number) => ["pedals", id] as const,
    // byType: (type: string) => ["pedals", "type", type] as const,
  },
  // pedalboards: {
  //   all: () => ["pedalboards"] as const,
  //   detail: (id: number) => ["pedalboards", id] as const,
  // },
}

// Hierarquia importa: invalidateQueries({ queryKey: queryKeys.pedals.all() })
// invalida tudo que começa com ["pedals"] — all, detail, byType, etc.
