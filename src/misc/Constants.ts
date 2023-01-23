export enum StorageKeys{
    AnnualSalary,
    dd

}

export const NUMBERS = {
    WEEKS_IN_YEAR: 52,
     STATES: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

}
export const OBJECTS = {
    percentFormatter:new Intl.NumberFormat("en-US", {style:'percent',minimumFractionDigits: 2,maximumFractionDigits:2}),
    currencyFormatter:new Intl.NumberFormat(undefined, {style: 'currency',currency: 'usd',maximumFractionDigits:2}),
    deductableTemplate:{
        name: "Title",
        value: 0,
        match: 0,
        _name: "Title",
        _value: 0,
        _match: 0,
        editing: false
      }
}

export type DeductableTemplate = typeof OBJECTS.deductableTemplate

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