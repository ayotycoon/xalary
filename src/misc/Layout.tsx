import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Box, Button, CssBaseline, styled, Tab, Tabs } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link } from "gatsby";
import { LocalizationProvider, TabList, TabPanel } from "@mui/lab";
import Sidebar from "./SidebarLayout/Sidebar";
import ThemeProvider from "../theme/ThemeProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Header from "./Header";
import { StateProvider } from "../contexts/StateContext";


const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

interface SidebarLayoutProps {
  children?: React.ReactNode;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
        padding: 20px;
`
);

const Layout: React.FC<any> = ({children}: any) => {
  return (
    <ThemeProvider>
  
      <StateProvider>
      {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
      <>
        <CssBaseline />
        <>
          <Sidebar />
          <MainWrapper>
         <Header />
            <MainContent>
              
             {children}
            </MainContent>
          </MainWrapper>
        </>

      </>
      </StateProvider>
    </ThemeProvider>

  )
}

export default Layout
