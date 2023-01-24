import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import { Avatar, Card, CardHeader, Divider, Grid, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CardLayout from "./CardLayout";
import { DeductableTemplate, getTotalDeductablePercent, NUMBERS, OBJECTS } from "../misc/Constants";
import AnalysisChart from "./AnalysisChart";
const WeeksInYear = 52;

interface AnalysisProps {
    annualSalary: number
    stateTaxAmount: number
    federalTaxAmount: number
    preTaxeDeductables: DeductableTemplate[]
    postTaxDeductables: DeductableTemplate[]
}
const dataDefault = {
    title: "",
    annual: 0,
    percent: 0,

    monthly: 0,
    biWeekly: 0,
}


function Analysis({ annualSalary, federalTaxAmount, postTaxDeductables, preTaxeDeductables,stateTaxAmount }: AnalysisProps) {
    const [renderable, setRenderable] = useState([] as unknown as any[])



    const preTaxDeductableAmount = ((getTotalDeductablePercent(preTaxeDeductables) / 100) * annualSalary)
    const postTaxDeductableAmount = ((getTotalDeductablePercent(postTaxDeductables) / 100) * (annualSalary-federalTaxAmount-stateTaxAmount))






    useEffect(() => {
        const states = {
            annualSalary_Minus_federalTax: annualSalary - preTaxDeductableAmount - federalTaxAmount,
            annualSalary_Minus_federalTax_minus_postTaxDeductables: annualSalary - preTaxDeductableAmount - stateTaxAmount- federalTaxAmount -postTaxDeductableAmount,
        
    
        }
        const data = [
            { ...dataDefault, title: "Annual Salary", annual: annualSalary },
            { ...dataDefault, title: "Federal & State Taxes, Pre-Tax & Post-Tax Deductables Removed", annual: states.annualSalary_Minus_federalTax_minus_postTaxDeductables }
        ]
        data.forEach(cell => {
            cell.percent = annualSalary ? cell.annual / annualSalary : 0
            cell.biWeekly = (cell.annual / (NUMBERS.WEEKS_IN_YEAR / 2))
            cell.monthly = (cell.annual / (NUMBERS.WEEKS_IN_YEAR / 4))
        })
        setRenderable(data);

    }, [annualSalary, federalTaxAmount, postTaxDeductables, preTaxeDeductables])



    return (<CardLayout header="Analysis" avatar="A">
            
        {renderable.map((cell, index) => <Box key={index}>
            {index != 0 && <Divider sx={{ my: 1 }} />}
            <Grid key={cell.title}
                container
                direction="row"
                alignItems="stretch"
                spacing={3}
            >
                <Grid item xs={12}>
       
                </Grid>
                <Grid item xs={12}>
                    <Typography fontWeight="normal" color="text.secondary" >
                        {cell.title}
                    </Typography>
                </Grid>

                <Grid item xs={6} md={6} lg={3}>
                    <Typography fontWeight="normal" color="text.secondary" >
                        %
                    </Typography>
                    <Typography variant="h4">
                        {OBJECTS.percentFormatter.format(cell.percent)}

                    </Typography>

                </Grid>
                <Grid item xs={6} md={6} lg={3}>
                    <Typography fontWeight="normal" color="text.secondary" >
                        Annual
                    </Typography>
                    <Typography variant="h4">
                        {OBJECTS.currencyFormatter.format(cell.annual)}
                    </Typography>

                </Grid>

                <Grid item xs={6} md={6} lg={3}>
                    <Typography fontWeight="normal" color="text.secondary" >
                        Monthly
                    </Typography>
                    <Typography variant="h4">
                        {OBJECTS.currencyFormatter.format(cell.monthly)}
                    </Typography>

                </Grid>

                <Grid item xs={6} md={6} lg={3}>
                    <Typography fontWeight="normal" color="text.secondary" >
                        Bi-Weekly
                    </Typography>
                    <Typography variant="h4">
                        {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'usd' }).format(cell.biWeekly)}
                    </Typography>

                </Grid>
            </Grid>

        </Box>)}

    </CardLayout>


    )

}


const getAnalysisRates = () => {

    return [
        {
            "tax": 0,
            "start": 0,
            "end": 0
        },
        {
            "tax": 10.00,
            "start": 0,
            "end": 10275
        },
        {
            "tax": 12.00,
            "start": 10276,
            "end": 41775
        },
        {
            "tax": 22.00,
            "start": 41776,
            "end": 89075
        },
        {
            "tax": 24.00,
            "start": 89076,
            "end": 170050
        },
        {
            "tax": 32.00,
            "start": 170051,
            "end": 215950
        },
        {
            "tax": 35.00,
            "start": 215951,
            "end": 539900
        },
        {
            "tax": 37.00,
            "start": 539901,
            "end": 939900
        }
    ]

}

export default Analysis;