export const WHATSAPP_NUMBER = '919080079754'
export const WHATSAPP_DISPLAY = '+91 90800 79754'

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
