export const isEmpty = (obj)=>{
    return Object.entries(obj).length === 0;
  }

export const paserCurrency=(value)=>{
  return value.toLocaleString('es-AR',{
    style:"currency",
    currency:'ARS'
  })
}