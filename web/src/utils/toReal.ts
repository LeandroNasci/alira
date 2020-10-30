export default function toReal(value: number) {
  return Intl.NumberFormat('pt-BR' , {
    style: 'currency',
    currency: 'BRL'
    }).format(value)
};


