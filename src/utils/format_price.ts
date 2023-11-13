export default function format_price(price?: number) {
  if (typeof price === 'undefined') return '';
  return new Intl.NumberFormat('fr', {
    style: 'currency',
    currency: 'XAF',
  }).format(price);
}
