export const queryKeys = {
  pedals: {
    all: ["pedals"] as const,
    lists: () => [...queryKeys.pedals.all, "list"] as const,
    list: (filter: Record<string, unknown>) =>
      [...queryKeys.pedals.lists(), filter] as const,
    details: () => [...queryKeys.pedals.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.pedals.details(), id] as const,
  },
}

// Hierarquia importa:
// invalidateQueries({ queryKey: queryKeys.pedals.all })       → invalida tudo
// invalidateQueries({ queryKey: queryKeys.pedals.lists() })   → só listagens
// invalidateQueries({ queryKey: queryKeys.pedals.detail(5) }) → só o pedal 5
