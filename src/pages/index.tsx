import React, { useEffect, useState } from "react"
import type { HeadFC, PageProps } from "gatsby"

import Layout from "../misc/Layout";
import FederalTax from "../sections/FederalTax";
import StateTax from "../sections/StateTax";
import { Grid } from "@mui/material";
import DataInput from "../sections/DataInput";
import Analysis from "../sections/Analysis";
import {useStateWIthStorage, StorageConstants, processFromUrl} from "../misc/Storage";
import { DeductableTemplate, OBJECTS } from "../misc/Constants";
import DeductablesView from "../sections/DeductablesView";



const IndexPage: React.FC<PageProps> = () => {
  const [annualSalary, setAnnualSalary] = useStateWIthStorage(StorageConstants.AnnualSalary, 0)
  const [federalTaxAmount, setFederalTaxAmount] = useState(0)
  const [stateTaxAmount, setStateTaxAmount] = useState(0)
  const [state, setState] = useStateWIthStorage(StorageConstants.State,"")
  const [postTaxDeductables, setPostTaxDeductables] = useStateWIthStorage(StorageConstants.PostTaxDeductables, [{ ...OBJECTS.deductableTemplate }] as DeductableTemplate[])
  const [preTaxeDeductables, setPreTaxDeductables] = useStateWIthStorage(StorageConstants.PreTaxDeductables, [{ ...OBJECTS.deductableTemplate }] as DeductableTemplate[])

  useEffect(()=>{
    processFromUrl()
  }, [])

  return (
    <Layout>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        spacing={3}
      >

        <Grid item xs={12} md={6}>
          <DataInput 
          annualSalary={annualSalary} 
          setAnnualSalary={setAnnualSalary}
          postTaxDeductables={postTaxDeductables}
          preTaxeDeductables={preTaxeDeductables}
          setPostTaxDeductables={setPostTaxDeductables}
          setPreTaxDeductables={setPreTaxDeductables}
          
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Analysis annualSalary={annualSalary} federalTaxAmount={federalTaxAmount} stateTaxAmount={stateTaxAmount} postTaxDeductables={postTaxDeductables} preTaxeDeductables={preTaxeDeductables} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FederalTax annualSalary={annualSalary} federalTaxAmount={federalTaxAmount} setFederalTaxAmount={setFederalTaxAmount} preTaxeDeductables={preTaxeDeductables}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <StateTax annualSalary={annualSalary} stateTaxAmount={stateTaxAmount} setStateTaxAmount={setStateTaxAmount} preTaxeDeductables={preTaxeDeductables} state={state} setState={setState} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DeductablesView annualSalary={annualSalary} stateTaxAmount={stateTaxAmount} federalTaxAmount={federalTaxAmount} preTaxeDeductables={preTaxeDeductables} postTaxeDeductables={postTaxDeductables} />
        </Grid>



      </Grid>
    </Layout>

  )
}



export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
