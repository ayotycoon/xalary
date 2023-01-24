import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import { Avatar, Card, CardHeader, Grid, IconButton, Typography, Autocomplete, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CardLayout from "./CardLayout";
import { DeductableTemplate, getTotalDeductablePercent, NUMBERS, OBJECTS } from "../misc/Constants";
import * as stateTaxJson from '../config/stateTax.json'
const WeeksInYear = 52;

interface StateTaxProps {
    annualSalary: number
    preTaxeDeductables: DeductableTemplate[]
    stateTaxAmount: number
    setStateTaxAmount: any
    state: string;
    setState: any
}

const getStateTaxRates = (state: string): {
    tax: number
    start: number
    end: number
}[] => {
    if (!state) return [];

    // @ts-ignore
    return stateTaxJson[state] || []

}
const states = NUMBERS.STATES.filter(s => getStateTaxRates(s).length)
function StateTax({ annualSalary, preTaxeDeductables, stateTaxAmount, setStateTaxAmount, setState, state }: StateTaxProps) {
    const [rates, setRates] = useState(getStateTaxRates(state))
    const totalPreTaxDeductablesAmount = ((getTotalDeductablePercent(preTaxeDeductables) / 100) * annualSalary)

    const annualTaxableIncome = annualSalary - totalPreTaxDeductablesAmount;



    useEffect(() => {

        let rem = annualTaxableIncome;
        let totalTaxed = 0;
        for (let rate of rates) {
            if (rem == 0) break;

            let rateDiff = Math.min(rate.end - rate.start, rem)
            let taxedRateDiff = (rate.tax / 100) * rateDiff;
            totalTaxed += taxedRateDiff;
            rem -= rateDiff;
        }
        setStateTaxAmount(totalTaxed)

    }, [annualSalary, preTaxeDeductables, state, rates])


    return (<CardLayout header="State Tax" avatar="ST" action={

        <Autocomplete
            disablePortal
            value={state}

            onSelect={(e: any) => {
                setState(e.target?.value)
                setRates(getStateTaxRates(e.target?.value))
            }}

            options={states}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} label="state" variant="standard" />}
        />

    }>
        <Grid
            container
            direction="row"
            alignItems="stretch"
            spacing={3}
        >

            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    %
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.percentFormatter.format(annualSalary ? stateTaxAmount / annualSalary : 0)}

                </Typography>

            </Grid>
            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Annual
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(stateTaxAmount)}
                </Typography>

            </Grid>

            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Monthly
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(stateTaxAmount / (NUMBERS.WEEKS_IN_YEAR / 4))}
                </Typography>

            </Grid>

            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Bi-Weekly
                </Typography>
                <Typography variant="h4">
                    {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'usd' }).format(stateTaxAmount / (NUMBERS.WEEKS_IN_YEAR / 2))}
                </Typography>

            </Grid>
        </Grid>

    </CardLayout>


    )

}



export default StateTax;