
import { AddBoxRounded, ArrowLeft, ArrowRight, PlusOne } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { IframeHTMLAttributes, useEffect, useRef, useState } from "react";


function HorizotalSelector({ stage, maxStages, onSetStage, onAdd, maxAdd, children }: any) {

    return (

        <Box style={{ position: 'relative' }}>

            <IconButton style={{ position: 'absolute', top: '20%', left: '1px' }} onClick={() => onSetStage(stage - 1)} disabled={stage <= 0} >
                <ArrowLeft fontSize="large" />
            </IconButton>


            <Box mx={10} >
                {children}
            </Box>
            {(stage >= maxStages - 1) ?

                <IconButton style={{ position: 'absolute', top: '20%', right: '5px' }} onClick={onAdd} disabled={stage >= maxAdd-1} >
                    <AddBoxRounded fontSize="large" />
                </IconButton>
                :
                <IconButton style={{ position: 'absolute', top: '20%', right: '5px' }} onClick={() => onSetStage(stage + 1)} >
                    <ArrowRight fontSize="large" />
                </IconButton>

            }


        </Box>

    );
}

export default HorizotalSelector;
