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
}

function CardLayout({ children,header,sub, avatar, action}: CardLayoutProps) {

    return (<Card>
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