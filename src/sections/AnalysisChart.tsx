import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import { Avatar, Card, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from 'chart.js'
import { DeductableTemplate, getTotalDeductablePercent, OBJECTS } from "../misc/Constants";
Chart.register(...registerables);

interface AnalysisChartProps {
    annualSalary: number
    stateTaxAmount: number
    federalTaxAmount: number
    preTaxeDeductables: DeductableTemplate[]
    postTaxDeductables: DeductableTemplate[]
}
function getPercent(a:number, b:number){
    const x = a/b;
    return ` (${OBJECTS.percentFormatter.format(x)})`;
}

function AnalysisChart({ annualSalary, federalTaxAmount, postTaxDeductables, preTaxeDeductables, stateTaxAmount }: AnalysisChartProps) {
    const ref = useRef(null as any)


    const preTaxDeductableAmount = ((getTotalDeductablePercent(preTaxeDeductables) / 100) * annualSalary)
    const postTaxDeductableAmount = ((getTotalDeductablePercent(postTaxDeductables) / 100) * (annualSalary - federalTaxAmount - stateTaxAmount))

    const data = [
        {
            name: 'Federal Tax'+getPercent(federalTaxAmount, annualSalary),
            value: federalTaxAmount,
            color: "red"
        },
        {
            name: 'State Tax'+getPercent(stateTaxAmount, annualSalary),
            value: stateTaxAmount,
            color: "pink"
        },
        {
            name: 'Deductables'+getPercent(preTaxDeductableAmount + postTaxDeductableAmount, annualSalary),
            value: preTaxDeductableAmount + postTaxDeductableAmount,
            color: "orange"
        },
        {
            name: 'Remaining'+getPercent(annualSalary - (federalTaxAmount + stateTaxAmount + preTaxDeductableAmount + postTaxDeductableAmount), annualSalary),
            value: annualSalary - (federalTaxAmount + stateTaxAmount + preTaxDeductableAmount + postTaxDeductableAmount),
            color: "green"
        }
    ]



    const chartRef = useRef(null as any)

    useEffect(() => {
        if (!ref.current) return
        chartRef.current = new Chart(ref.current, {
            type: 'pie',
            data: {
                labels: data.map(d => d.name),
                datasets: [
                    {
                        label: '$',
                        data: data.map(d => d.value),
                        backgroundColor: data.map(d => d.color),
                    }
                ]
            },
            options: {
                responsive: true,


                plugins: {
   

                    legend: {
                        position: 'top',
                        display: false
                    },
                    title: {
                        display: true,
                        //text: 'Chart.js Pie Chart'
                    }
                }
            },
        })

    }, [])

    useEffect(() => {
        if (!ref.current || !chartRef.current) return
        console.log("yes")
        chartRef.current.data.labels = data.map(d => d.name),
        chartRef.current.data.datasets[0].data = data.map(d => d.value);
        chartRef.current.update()


    }, [annualSalary, federalTaxAmount, postTaxDeductables, preTaxeDeductables, stateTaxAmount])

    return (<Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Box style={{ maxWidth: '400px' }}>

            <canvas style={{}} ref={ref}></canvas>
        </Box>
    </Box>


    )

}

export default AnalysisChart;