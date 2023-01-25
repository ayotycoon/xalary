import { ListSubheader, List, Divider, Button, Tooltip, IconButton, TextField } from '@mui/material';
import SidebarMenuItem from './item';
import menuItems, { MenuItem } from './items';
import { styled } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { useLocation } from '@reach/router';
import { Link } from 'gatsby';
import { StateContext } from '../../../../contexts/StateContext';
import { Box } from '@mui/system';
import { DarkMode, Share, Upload, WbSunnyTwoTone } from '@mui/icons-material';
import { getDataAsString, isBrowser, processFromUrl } from '../../../Storage';
import StorageView from '../../../StorageView';

const MenuWrapper = styled(List)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(1)};
    padding: 0;

    & > .MuiList-root {
      padding: 0 ${theme.spacing(2)} ${theme.spacing(2)};
    }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemHeadingColor};
      padding: ${theme.spacing(0.8, 2)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(List)(
  ({ theme }) => `
    &.MuiList-root {
      padding: 0;

      .MuiList-root .MuiList-root .MuiListItem-root .MuiButton-root {
        font-weight: normal !important;
      }

      .MuiListItem-root {
        padding: 2px ${theme.spacing(2)};
    
        .MuiButton-root {
          display: flex;
          color: ${theme.sidebar.menuItemColor};
          background-color: ${theme.sidebar.menuItemBg};
          width: 100%;
          justify-content: flex-start;
          font-size: ${theme.typography.pxToRem(13)};
          padding-top: ${theme.spacing(0.8)};
          padding-bottom: ${theme.spacing(0.8)};
          position: relative;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(4)};

            .MuiBadge-standard {
              background: ${theme.colors.primary.main};
              font-size: ${theme.typography.pxToRem(9)};
              font-weight: bold;
              text-transform: uppercase;
              color: ${theme.palette.primary.contrastText};
            }
          }
    
          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            font-size: ${theme.typography.pxToRem(26)};
            margin-right: ${theme.spacing(1.5)};
            color: ${theme.sidebar.menuItemIconColor};
          }
          
          .MuiButton-endIcon {
            margin-left: auto;
            font-size: ${theme.typography.pxToRem(22)};
          }

          &.Mui-active,
          &:hover {
            background-color: ${theme.sidebar.menuItemBgActive};
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
                color: ${theme.sidebar.menuItemIconColorActive};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;
          line-height: 1;
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px ${theme.spacing(0)};

            .MuiButton-root {
              font-size: ${theme.typography.pxToRem(13)};
              padding: ${theme.spacing(0.5, 2, 0.5, 6.5)};

              &.Mui-active,
              &:hover {
                background-color: ${theme.sidebar.menuItemBg};
              }
            }
          }
        }
      }
    }
`
);

const renderSidebarMenuItems = ({
  items,
  path
}: {
  items: any[]; // MenuItem[];
  path: string;
}): JSX.Element => {
  items = items.filter(item => !item.hide)
  return (
    <SubMenuWrapper>
      {items.reduce((ev, item) => reduceChildRoutes({ ev, item, path }), [])}
    </SubMenuWrapper>
  )
};

const reduceChildRoutes = ({
  ev,
  path,
  item
}: {
  ev: JSX.Element[];
  path: string;
  item: MenuItem;
}): Array<JSX.Element> => {
  const key = item.name;
  const exactMatch = window.location.pathname == (item.link || '')

  if (item.items) {
    const partialMatch = false;

    ev.push(
      <SidebarMenuItem
        key={key}
        active={partialMatch}
        open={partialMatch}
        name={item.name}
        icon={item.icon}
        link={item.link}
        badge={item.badge}
      >
        {renderSidebarMenuItems({
          path,
          items: item.items
        })}
      </SidebarMenuItem>
    );
  } else {
    ev.push(
      <SidebarMenuItem
        key={key}
        active={exactMatch}
        name={item.name}
        link={item.link}
        badge={item.badge}
        icon={item.icon}
      />
    );
  }

  return ev;
}

function SidebarMenu() {
  const location = useLocation();
  const sectionItems = menuItems.filter(section => !section.hide);
  const [shareUrl, setShareableString] = useState("");

  const isLight = ((isBrowser() ? localStorage.getItem('appTheme') : "") || "PureLightTheme") == "PureLightTheme"
  return (

    <>
      <div style={{ textAlign: 'center' }}>
        <Tooltip arrow title="Change Theme">
          <IconButton color="primary" onClick={() => {

            if (isLight) {
              localStorage.setItem('appTheme', "PureDarkTheme")
            } else {
              localStorage.setItem('appTheme', "PureLightTheme")
            }
            window.location.reload()
          }}>
            {isLight ? <WbSunnyTwoTone /> : <DarkMode />}
          </IconButton>
        </Tooltip>
      </div>

      {sectionItems.map((section) => (
        <div key={section.heading}>
          <MenuWrapper
            subheader={
              <ListSubheader component="div" disableSticky>{section.heading}</ListSubheader>
            }
          >
            {renderSidebarMenuItems({
              items: section.items,
              path: location.pathname
            })}
          </MenuWrapper>

          <Box style={{ textAlign: 'center' }} p={3}>
            <TextField
              required
              label="Copy link to share"
              value={shareUrl}
              variant="standard"
              style={{ width: '100%' }}
              placeholder="John Doe"
              onChange={(e) => setShareableString(e.target.value)}

            />
            <br />
            <Box>
              <Tooltip arrow title="Share data">
                <IconButton color="primary" onClick={() => {

                  const str = getDataAsString()

                  setShareableString(str)

                }}>
                  <Share />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Load data">
                <IconButton color="primary" onClick={() => {

                  processFromUrl(shareUrl)



                }}>
                  <Upload />
                </IconButton>
              </Tooltip>

            </Box>
          </Box>

          <StorageView />
        </div>
      ))}


    </>
  );
}

export default SidebarMenu;
