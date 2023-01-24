import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import { Avatar, Card, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CardLayout from "./CardLayout";
import { DeductableTemplate, ExpensesTemplate, getRemainderAfterAllSpendings, getTaxDeductableAmount, getTotalDeductablePercent, getTotalExpenses, NUMBERS, OBJECTS } from "../misc/Constants";
import federalTaxJson from '../config/federalTax.json'
const WeeksInYear = 52;

interface RemainderViewProps {
    annualSalary: number
    stateTaxAmount: number
    federalTaxAmount: number
    preTaxeDeductables: DeductableTemplate[]
    postTaxDeductables: DeductableTemplate[]
    expenses: ExpensesTemplate[]
}

function RemainderView({ annualSalary, federalTaxAmount, postTaxDeductables, preTaxeDeductables, stateTaxAmount, expenses }: RemainderViewProps) {


    const preTaxDeductableAmount = getTaxDeductableAmount(preTaxeDeductables, annualSalary)
    const postTaxDeductableAmount = getTaxDeductableAmount(postTaxDeductables, annualSalary)

    const totalExpenses = getTotalExpenses(expenses)

    const remainder = getRemainderAfterAllSpendings(annualSalary, federalTaxAmount, stateTaxAmount, preTaxDeductableAmount, postTaxDeductableAmount, totalExpenses)


    return (<CardLayout header="Remainder" avatar="RM">
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
                    {OBJECTS.percentFormatter.format(annualSalary ? remainder / annualSalary : 0)}

                </Typography>

            </Grid>
            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Annual
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(remainder)}
                </Typography>

            </Grid>

            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Monthly
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(remainder / (NUMBERS.WEEKS_IN_YEAR / 4))}
                </Typography>

            </Grid>

            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Bi-Weekly
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(remainder / (NUMBERS.WEEKS_IN_YEAR / 2))}
                </Typography>

            </Grid>
        </Grid>

    </CardLayout>


    )

}


const getRemainderViewRates = () => {

    return federalTaxJson

}

export default RemainderView;