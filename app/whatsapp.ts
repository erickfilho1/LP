const DEFAULT_WHATSAPP_NUMBER = "557781066826";

function getWhatsappNumber() {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
}

export function createWhatsappHref(message: string) {
  const number = getWhatsappNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getWhatsappNumberLabel() {
  const number = getWhatsappNumber();
  return `+${number.slice(0, 2)} ${number.slice(2, 4)} ${number.slice(4, 9)}-${number.slice(9)}`;
}
