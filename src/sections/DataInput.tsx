import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useState } from "react";
import CardLayout from "./CardLayout";
import { makeStyles } from "@mui/styles";
import ExpandMoreTwoTone from "@mui/icons-material/ExpandMoreTwoTone";
import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import { Add, CheckBox, CheckCircle, EditSharp, MinorCrashOutlined, Remove } from "@mui/icons-material";
import { useStateWIthStorage, StorageConstants } from "../misc/Storage";
import { getTotalDeductablePercent, OBJECTS } from "../misc/Constants";

const tempInputStyle = {width:'50px'}

interface DataInputProps {
  annualSalary: number
  setAnnualSalary: any
  postTaxDeductables: any[]
  preTaxeDeductables: any[]
  setPreTaxDeductables: any
  setPostTaxDeductables: any
}



function DataInput({ annualSalary, setAnnualSalary, postTaxDeductables, preTaxeDeductables, setPreTaxDeductables, setPostTaxDeductables }: DataInputProps) {

  const totalPostTaxDeductablesPercent = getTotalDeductablePercent(postTaxDeductables)
  const totalPreTaxDeductablesPercent = getTotalDeductablePercent(preTaxeDeductables)
  return (<CardLayout header="Inputs" sub="" avatar="S"
    action={
      <>
        {/* <IconButton onClick={()=> alert("")} color="primary">
          <MoreHorizTwoTone fontSize="medium" />
      </IconButton>
      <IconButton onClick={()=> alert("")} color="primary">
          <MoreHorizTwoTone fontSize="medium" />
      </IconButton> */}
      </>
    }>

    <BaseSalary annualSalary={annualSalary} setAnnualSalary={setAnnualSalary} />
    <Deductables deductables={preTaxeDeductables} setDeductables={setPreTaxDeductables} totalDeductablesPercent={totalPreTaxDeductablesPercent} />
    <Deductables postTax deductables={postTaxDeductables} setDeductables={setPostTaxDeductables} totalDeductablesPercent={totalPostTaxDeductablesPercent} />

  </CardLayout>)

}

function RowContainer({ children, title, defaultExpanded }: any) {
  const [expanded, setExpanded] = useState(defaultExpanded || false);
  return <Accordion expanded={expanded}>
    <AccordionSummary
      onClick={() => {

        setExpanded(!expanded)
      }}
      style={{ padding: 0, margin: 0 }}
      expandIcon={<ExpandMoreTwoTone />}
      
    >
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails style={{ paddingTop: 0, paddingBottom: 0, borderLeft: '1px solid black' }}>
      {children}

    </AccordionDetails>
  </Accordion>
}

function BaseSalary({ annualSalary, setAnnualSalary }: { setAnnualSalary: any, annualSalary: number }) {
  return <RowContainer title="Base Salary" defaultExpanded>
    <TextField
      required
      error={!annualSalary}
      name='AnnualSalary'
      label="Annual Salary"
      value={annualSalary}
      variant="standard"
      style={{ width: '100%' }}
      placeholder="John Doe"
      type={"number"}
      onChange={(e) => setAnnualSalary(e.target.value)}
    />
  </RowContainer>

}

function Deductables({ deductables, setDeductables, totalDeductablesPercent, postTax }: { deductables: any[], setDeductables: any, totalDeductablesPercent: number, postTax?: boolean }) {
  const useStyles = makeStyles({
    customTableContainer: {
      overflowX: "initial"
    }
  })
  const classes = useStyles();


  const tableStyle = { paddingTop: "2px", paddingBottom: 0 };
  return (

    <RowContainer title={`${postTax ? "After Tax" : "Before Tax"} Deductables (${totalDeductablesPercent} %)`}>
      <Box style={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer classes={{ root: classes.customTableContainer }}>
          <Table stickyHeader>
            <TableHead >
              <TableRow>
                <TableCell style={{ ...tableStyle }}>Name</TableCell>
                <TableCell style={{ ...tableStyle }}>%</TableCell>
                <TableCell style={{ ...tableStyle }}>% Match</TableCell>
                <TableCell style={{ ...tableStyle, textAlign: 'right' }}>


                  <IconButton

                    color="inherit"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault()
                      const _deductables = [...deductables]
                      _deductables.push({ ...OBJECTS.deductableTemplate })
                      setDeductables(_deductables)
                    }}
                  >
                    <Add fontSize="inherit" />

                  </IconButton>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {deductables.map((each: any, index: number) => {
                return (
                  <TableRow
                    hover
                    key={index}>

                    <TableCell style={tableStyle}>
                      {each.editing ? <input style={tempInputStyle} defaultValue={each._name} name="_name" onBlur={(e) => {
                        const _deductables = [...deductables]

                        _deductables[index][e.target.name] = e.target.value
                        setDeductables(_deductables)
                      }} /> : <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {each.name}
                      </Typography>}

                    </TableCell>
                    <TableCell style={tableStyle}>
                      {each.editing ? <input style={tempInputStyle} type="number" defaultValue={each._value} name="_value" onBlur={(e) => {
                        const _deductables = [...deductables]

                        _deductables[index][e.target.name] = e.target.value
                        setDeductables(_deductables)
                      }} /> : <Typography title={each.href} style={{ maxWidth: '200px' }} variant="body2" color="text.secondary" >
                        {each.value}
                      </Typography>}
                    </TableCell>
                    <TableCell style={tableStyle}>
                      {each.editing ? <input style={tempInputStyle} type="number" defaultValue={each._match} name="_match" onBlur={(e) => {
                        const _deductables = [...deductables]

                        _deductables[index][e.target.name] = e.target.value
                        setDeductables(_deductables)
                      }} /> : <Typography title={each.href} style={{ maxWidth: '200px' }} variant="body2" color="text.secondary" >
                        {each.match}
                      </Typography>}
                    </TableCell>
                    <TableCell style={{ ...tableStyle, textAlign: 'right' }}>
                      {each.editing ? <>
                        <IconButton

                          color="inherit"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault()
                            const _deductables = [...deductables]

                            _deductables[index].editing = false
                            setDeductables(_deductables)
                          }}
                        >
                          <CloseTwoTone fontSize="inherit" />

                        </IconButton>

                        <IconButton

                          color="inherit"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault()
                            const _deductables = [...deductables]

                            _deductables[index].editing = false
                            _deductables[index].name = _deductables[index]._name
                            _deductables[index].value = _deductables[index]._value
                            _deductables[index].match = _deductables[index]._match
                            setDeductables(_deductables)
                          }}
                        >
                          <CheckCircle fontSize="inherit" />

                        </IconButton>
                      </> : <>

                        {((index == deductables.length -1) && deductables.length >1) && <IconButton

                          color="inherit"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault()
                            const _deductables = [...deductables]

                            _deductables.pop();
                            setDeductables(_deductables)
                          }}
                        >

                          <Remove fontSize="inherit" />
                        </IconButton>}

                        <IconButton

                          color="inherit"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault()
                            const _deductables = [...deductables]

                            _deductables[index].editing = true
                            setDeductables(_deductables)
                          }}
                        >

                          <EditSharp fontSize="inherit" />
                        </IconButton> </>}
                    </TableCell>
                  </TableRow>
                );
              })}


            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </RowContainer>




  )
}

export default DataInput;