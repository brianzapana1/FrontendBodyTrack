import { format, formatDistance, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDate = (date) => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'dd/MM/yyyy', { locale: es })
}

export const formatDateTime = (date) => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'dd/MM/yyyy HH:mm', { locale: es })
}

export const formatRelativeTime = (date) => {
  if (!date) return ''
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return formatDistance(parsedDate, new Date(), { 
    addSuffix: true, 
    locale: es 
  })
}

export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) return '-'
  return Number(number).toFixed(decimals)
}

export const formatPeso = (peso) => {
  return `${formatNumber(peso, 1)} kg`
}

export const formatPorcentaje = (valor) => {
  return `${formatNumber(valor, 1)}%`
}
