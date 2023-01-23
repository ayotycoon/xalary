
import { useState } from "react"

export const isBrowser = () => typeof window !== "undefined"

export const useStateWIthStorage = <T>(key: string, v: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const data = useState(v);


    const _val = isBrowser() ? window.localStorage.getItem(key) : "";
    const val = _val ? JSON.parse(_val) : "";

    const a = val || v;
    const b = (input: T) => {
        isBrowser() ? window.localStorage.setItem(key, JSON.stringify(input)) : ""
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

export const getDataAsString = () => {

    const data = {} as any;

    Object.values(StorageConstants).forEach(str => {
        data[str] = isBrowser() ? JSON.parse(localStorage.getItem(str) || "") : "";
    });

    return JSON.stringify(data);

}

export const processFromUrl = (url:string) => {


    const data = JSON.parse(url)
    
    Object.values(StorageConstants).forEach(str => {
       localStorage.setItem(str, JSON.stringify(data[str])) 
    });

   window.location.href = (window.location.host + window.location.pathname)
   
}