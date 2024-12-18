export const DIAS_DA_SEMANA = [
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
    "domingo",
] as const;

export const DIAS_DA_SEMANA_OPTION = DIAS_DA_SEMANA.map(dia => ({
    value: dia,
    label: dia.charAt(0).toUpperCase() + dia.slice(1),
  }));