import { Settings } from "@mui/icons-material";
import MoreHorizTwoTone from "@mui/icons-material/MoreHorizTwoTone";
import { Avatar, Card, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";

interface CardLayoutProps {
    header: string
    sub?: string
    avatar: string
    children: any
    action?: JSX.Element
    onSettings?: any
}

function CardLayout({ children, header, sub, avatar, action, onSettings }: CardLayoutProps) {

    return (<Card style={{ position: 'relative' }}>
        {onSettings && <div style={{ position: 'absolute', bottom: '-3px', right: '-3px' }}>

            <IconButton onClick={onSettings}>
                <Settings fontSize="small" />
            </IconButton>
        </div>}

        <CardHeader
            avatar={<Avatar>{avatar}</Avatar>}
            action={
                action
            }
            titleTypographyProps={{ variant: 'h4' }}
            subTypographyProps={{ variant: 'subtitle2' }}
            title={header}
            subheader={<>{sub}</>}
        />
        <Box p={3}>
            {children}
        </Box>
    </Card>


    )

}

export default CardLayout;