import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import { Avatar, Card, CardHeader, Grid, IconButton, Modal, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CardLayout from "./CardLayout";
import { DeductableTemplate, ExpensesTemplate, getRemainderAfterAllSpendings, getTaxDeductableAmount, getTotalDeductablePercent, getTotalExpenses, NUMBERS, OBJECTS } from "../misc/Constants";
import federalTaxJson from '../config/federalTax.json'

import SimpleJsonEditor from "./SimpleJsonEditor";

const WeeksInYear = 52;

interface ConfigViewProps {
    annualSalary: number
    stateTaxAmount: number
    federalTaxAmount: number
    preTaxeDeductables: DeductableTemplate[]
    postTaxDeductables: DeductableTemplate[]
    expenses: ExpensesTemplate[]
}

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



function ConfigView({ annualSalary, federalTaxAmount, postTaxDeductables, preTaxeDeductables, stateTaxAmount, expenses }: any) {

    const [open, setOpen] = useState(true)

    const [data, setData] = useState([
        {
            "tax": 0,
            "start": 0,
            "end": {"boss":"getit"}
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
    ])

    return (<Modal
        open={open}
        onClose={() => setOpen(false)}
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>


            <SimpleJsonEditor data={data} setData={setData} />

        </Box>
    </Modal>


    )

}


const getConfigViewRates = () => {

    return federalTaxJson

}

export default ConfigView;