import React, { useContext, useEffect } from 'react';

import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { StateContext } from '../contexts/StateContext';
import Logo from './Logo';



const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header({ title }: any) {
  const { sidebarToggle, toggleSidebar} = useContext(StateContext);


  return (
    <Hidden lgUp>
      <HeaderWrapper display="flex" alignItems="center">
        <Box display="flex" alignItems="center">
          <Hidden lgUp>
            <Logo />
          </Hidden>

          <h1> {title || "Websites"}</h1>

        </Box>
        <Box display="flex" alignItems="center">

          <Hidden lgUp>
            <Tooltip arrow title="Toggle Menu">
              <IconButton color="primary" onClick={toggleSidebar}>
                {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
              </IconButton>
            </Tooltip>
          </Hidden>
        </Box>
      </HeaderWrapper >
    </Hidden>
  );
}

export default Header;
