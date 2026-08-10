type Money = {amount: string; currencyCode: string};

const CURRENCY_LABELS: Record<string, string> = {
  BDT: 'TK',
};

export function formatMoney({amount, currencyCode}: Money) {
  return `${CURRENCY_LABELS[currencyCode] ?? currencyCode} ${Number(amount).toFixed(2)}`;
}
