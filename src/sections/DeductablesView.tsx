import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import { Avatar, Card, CardHeader, Grid, IconButton, Typography, Autocomplete, TextField, Select, MenuItem } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CardLayout from "./CardLayout";
import { DeductableTemplate, getTotalDeductablePercent, getTotalDeductablePercenMatch, NUMBERS, OBJECTS } from "../misc/Constants";
import * as stateTaxJson from '../config/stateTax.json'
import { useStateWIthStorage } from "../misc/Storage";

interface DeductablesViewProps {
    annualSalary: number
    preTaxeDeductables: DeductableTemplate[]
    postTaxeDeductables: DeductableTemplate[]
    stateTaxAmount: number
    federalTaxAmount: number

}


function DeductablesView({ annualSalary, preTaxeDeductables, postTaxeDeductables, stateTaxAmount, federalTaxAmount }: DeductablesViewProps) {
    const [selectedMode, SetSelectedMode] = useState("All")
    const totalPreTaxDeductablesAmount = ((getTotalDeductablePercent(preTaxeDeductables) / 100) * annualSalary)
    const totalPostTaxDeductablesAmount = ((getTotalDeductablePercent(postTaxeDeductables) / 100) * (annualSalary - stateTaxAmount - federalTaxAmount))

    const totalPreTaxDeductablesAmountPlusMatch = ((getTotalDeductablePercenMatch(preTaxeDeductables) / 100) * annualSalary)
    const totalPostTaxDeductablesAmountPlusMatch = ((getTotalDeductablePercenMatch(postTaxeDeductables) / 100) * (annualSalary - stateTaxAmount - federalTaxAmount))

    const modesData = {
        "All": { withoutMatch: totalPreTaxDeductablesAmount + totalPostTaxDeductablesAmount, withMatch: totalPreTaxDeductablesAmount + totalPostTaxDeductablesAmount + totalPreTaxDeductablesAmountPlusMatch + totalPostTaxDeductablesAmountPlusMatch },
        "Pre Tax": { withoutMatch: totalPreTaxDeductablesAmount, withMatch: totalPreTaxDeductablesAmount + totalPreTaxDeductablesAmountPlusMatch },
        "Post Tax": { withoutMatch: totalPostTaxDeductablesAmount, withMatch: totalPostTaxDeductablesAmount + totalPostTaxDeductablesAmountPlusMatch }
    }

    const modes = Object.keys(modesData);


    // @ts-ignore
    const annualDeductable: any = modesData[selectedMode]



    return (<CardLayout header="Deductables" avatar="DE" action={

        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedMode}
            label="Age"
            onChange={(e: any) => {
                SetSelectedMode(e.target?.value)
            }}

        >
            {modes.map(state => <MenuItem key={state} value={state}>{state}</MenuItem>)}

        </Select>


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
                    {OBJECTS.percentFormatter.format(annualDeductable.withoutMatch ? annualDeductable.withoutMatch / annualSalary : 0)}
                    

                </Typography>

            </Grid>
            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Annual
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(annualDeductable.withoutMatch)}
                    <br />
                    <Typography title="Plus match" fontWeight="bold" color="text.primary" >
                        {OBJECTS.currencyFormatter.format(annualDeductable.withMatch)}
                    </Typography>

                </Typography>

            </Grid>

            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Monthly
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(annualDeductable.withoutMatch / (NUMBERS.WEEKS_IN_YEAR / 4))}
                    <br />
                    <Typography title="Plus match" fontWeight="bold" color="text.primary" >
                        {OBJECTS.currencyFormatter.format(annualDeductable.withMatch / (NUMBERS.WEEKS_IN_YEAR / 4))}
                    </Typography>

                </Typography>

            </Grid>

            <Grid item xs={6} md={6} lg={3}>
                <Typography fontWeight="normal" color="text.secondary" >
                    Bi-Weekly
                </Typography>
                <Typography variant="h4">
                    {OBJECTS.currencyFormatter.format(annualDeductable.withoutMatch / (NUMBERS.WEEKS_IN_YEAR / 2))}
                    <br />
                    <Typography title="Plus match" fontWeight="bold" color="text.primary" >
                        {OBJECTS.currencyFormatter.format(annualDeductable.withMatch / (NUMBERS.WEEKS_IN_YEAR / 2))}
                    </Typography>

                </Typography>

            </Grid>
        </Grid>

    </CardLayout>

    )

}



export default DeductablesView;