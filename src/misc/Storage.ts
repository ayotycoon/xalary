
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

export const processFromUrl = () => {

    if(!isBrowser()) return;
    if(!window.confirm("do you want to load from url ?")) return;
    const x = window.location.search;
    if (!x || x == "?") return;
    const params = new URLSearchParams(`share={"state":"Arkansas","annual-salary":"145000","after-tax-deductables":[{"name":"401k","value":"0","_name":"401k","_value":"0","editing":false}],"before-tax-deductables":[{"name":"401k","value":"6","_name":"401k","_value":"6","editing":false,"_match":"1.25","match":"1.25"}]}`)
    const search = params.get("share");
    if (!search) return;
    const data = JSON.parse(search)
    
    Object.values(StorageConstants).forEach(str => {
       localStorage.setItem(str, JSON.stringify(data[str])) 
    });
   
   // window.location.replace("")
}