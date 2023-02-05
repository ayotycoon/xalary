import React, { useEffect, useState } from "react";
import './SimpleJsonEditor.css'


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function accumulate(arr: any[], cb: (curr: any, index: number, currTotal: any) => any) {

    let last: any = null;
    return () => {
        for (let i = 0; i < arr.length; i++) {
            last = cb(arr[i], i, last)

        }

        return last;

    }

}


function dfs(data: any, i: number): any {
    const isArray = Array.isArray(data)
    if (isArray) {
        return `<div style="margin-left: ${i * 10}px"> <braces>[</braces>${accumulate(data, (d: any, f, currTotal) => (currTotal || "") + (f != 0 ? "," : "") + dfs(d, i + 1))()}<braces>]</braces> </div>`
    }
    const isObject = typeof data == 'object'
    if (isObject) {
        const keys = Object.keys(data);

        return `<div style="margin-left: ${i * 10}px">{${accumulate(keys, (k, f, currTotal) => (currTotal || "") +`<key>"${k}"</key>: ${dfs(data[k], i + 1)}${(f != keys.length-1) ? ",": ""}`)()}}</div>`
    }
    if (typeof data == "number") return `<value>${data}</value>`
    return `<value>"${data}"</value>`
}

function SimpleJsonEditor({ data, setData, height, width }: any) {
    if (!height) height = "300px";
    if (!width) width = "100%";
    const [dataString, setDataString] = useState(data || "")

    useEffect(() => {

        setDataString(dfs(data, 0))
    }, [data])


    return (<code style={{ display: 'block', height, width, whiteSpace: 'nowrap', overflowX: 'auto' }} contentEditable dangerouslySetInnerHTML={{ __html: dataString }}>

    </code>

    )

}


export default SimpleJsonEditor;