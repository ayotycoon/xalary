export enum StorageKeys {
  AnnualSalary,
  dd

}

export const NUMBERS = {
  WEEKS_IN_YEAR: 52,
  STATES: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
  COLORS: ['#A52A2A', '#8A2BE2', 'maroon', '#4B0082']

}
export const OBJECTS = {
  percentFormatter: new Intl.NumberFormat("en-US", { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  currencyFormatter: new Intl.NumberFormat(undefined, { style: 'currency', currency: 'usd', maximumFractionDigits: 2 }),
  deductableTemplate: {
    name: "Title",
    value: 0,
    match: 0,
    _name: "Title",
    _value: 0,
    _match: 0,
    editing: false
  },
  expensesTemplate: {
    name: "Title",
    value: 0,
    isMonthly: true,
    _name: "Title",
    _value: 0,
    _isMonthly: true,
    annualTotal: 0,
    editing: false
  }
}

export type DeductableTemplate = typeof OBJECTS.deductableTemplate
export type ExpensesTemplate = typeof OBJECTS.expensesTemplate

export function getTotalExpenses(data: ExpensesTemplate[]) {

  let total = 0;
  data.forEach((x) => total += parseFloat(x.value as any) * (x.isMonthly ? 12 : 1))
  return total;
}

export function getTotalDeductablePercent(deductables: any[]) {
  let total = 0;
  deductables.forEach((x) => total += parseFloat(x.value))
  return total;
}
export function getTotalDeductablePercenMatch(deductables: any[]) {
  let total = 0;
  deductables.forEach((x) => total += (parseFloat(x.value) * parseFloat(x.match || 0)))

  return total;

}

export function getTaxDeductableAmount(deductables: DeductableTemplate[], annualSalary: number) {
  return ((getTotalDeductablePercent(deductables) / 100) * annualSalary)
}

export function getTotalDeductables(preTaxDeductableAmount: number, postTaxDeductableAmount: number) {
  return preTaxDeductableAmount + postTaxDeductableAmount;
}

export function getAllSpendings(federalTaxAmount: number, stateTaxAmount: number, preTaxDeductableAmount: number, postTaxDeductableAmount: number, totalExpenses: number) {
  return (federalTaxAmount + stateTaxAmount + preTaxDeductableAmount + postTaxDeductableAmount + totalExpenses)
}

export function getRemainderAfterAllSpendings(annualSalary: number, federalTaxAmount: number, stateTaxAmount: number, preTaxDeductableAmount: number, postTaxDeductableAmount: number, totalExpenses: number) {
  return annualSalary - getAllSpendings(federalTaxAmount, stateTaxAmount, preTaxDeductableAmount, postTaxDeductableAmount, totalExpenses)
}