import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import { Avatar, Card, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CardLayout from "./CardLayout";
import { DeductableTemplate, getTotalDeductablePercent, NUMBERS, OBJECTS } from "../misc/Constants";
import federalTaxJson from '../config/federalTax.json'
const WeeksInYear = 52;

interface FederalTaxProps {
    annualSalary: number
    preTaxeDeductables: DeductableTemplate[]
    federalTaxAmount: number
    setFederalTaxAmount: any
}

function FederalTax({ annualSalary, preTaxeDeductables, federalTaxAmount, setFederalTaxAmount }: FederalTaxProps) {
    const [rates, setRates] = useState(getFederalTaxRates())
    const totalPreTaxDeductablesAmount = ((getTotalDeductablePercent(preTaxeDeductables) / 100) * annualSalary)

    const annualTaxableIncome = annualSalary - totalPreTaxDeductablesAmount;



    useEffect(() => {

        let rem = annualTaxableIncome;
        let totalTaxed = 0;
        for (let rate of rates){
            if(rem == 0) break;
            
            let rateDiff = Math.min(rate.end - rate.start, rem)
            let taxedRateDiff = (rate.tax/100) * rateDiff;
            totalTaxed+=taxedRateDiff;
            rem -= rateDiff;


        }
        setFederalTaxAmount(totalTaxed)

    }, [annualSalary, preTaxeDeductables])


    return (<CardLayout header="Federal Tax" avatar="FT">
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
                    {OBJECTS.percentFormatter.format(annualTaxableIncome ? federalTaxAmount / annualTaxableIncome : 0)}

                </Typography>

            </Grid>
            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Annual
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(federalTaxAmount)}
                </Typography>

            </Grid>

            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Monthly
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(federalTaxAmount / (NUMBERS.WEEKS_IN_YEAR / 4))}
                </Typography>

            </Grid>

            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Bi-Weekly
                </Typography>
                <Typography variant="h4">
                    {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'usd' }).format(federalTaxAmount / (NUMBERS.WEEKS_IN_YEAR / 2))}
                </Typography>

            </Grid>
        </Grid>

    </CardLayout>


    )

}


const getFederalTaxRates = () => {

    return    federalTaxJson

}

export default FederalTax;