
import { useState } from "react"

export const useStateWIthStorage = <T>(key: string, v: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const data = useState(v);


    const _val = localStorage.getItem(key);
    const val = _val ? JSON.parse(_val) : "";

    const a = val || v;
    const b = (input: T) => {
        localStorage.setItem(key, JSON.stringify(input))
        data[1](input)
    }

    // @ts-ignore
    return [a, b]

}
export const StorageConstants = {
    State: "state",
    AnnualSalary: "annual-salary",
    PostTaxDeductables: "after-tax-deductables",
    PreTaxDeductables: "before-tax-deductables",
}