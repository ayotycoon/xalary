import { ListSubheader, List, Divider, Button } from '@mui/material';
import SidebarMenuItem from './item';
import menuItems, { MenuItem } from './items';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';
import { useLocation } from '@reach/router';
import { Link } from 'gatsby';
import { StateContext } from '../../../../contexts/StateContext';
import { Box } from '@mui/system';

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
  path,
  authUser
}: {
  items: any[]; // MenuItem[];
  path: string;
  authUser: User
}): JSX.Element => {
  items = items.filter(item => !item.hide)
  return (
    <SubMenuWrapper>
      {items.reduce((ev, item) => reduceChildRoutes({ ev, item, path,authUser }), [])}
    </SubMenuWrapper>
  )
};

const reduceChildRoutes = ({
  ev,
  path,
  item,
  authUser
}: {
  ev: JSX.Element[];
  path: string;
  item: MenuItem;
  authUser: User
}): Array<JSX.Element> => {
  const key = item.name;
  const exactMatch = window.location.pathname == (item.link || '')
if(item.authenticated && !authUser) return ev;
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
          items: item.items,
          authUser
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

  const { authUser } = useContext(StateContext);

  return (

    <>

      {sectionItems.map((section) => (
        <div key={section.heading}>
          <MenuWrapper
            subheader={
              <ListSubheader component="div" disableSticky>{section.heading}</ListSubheader>
            }
          >
            {renderSidebarMenuItems({
              items: section.items,
              path: location.pathname,
              authUser: authUser
            })}
          </MenuWrapper>
        </div>
      ))}


    </>
  );
}

export default SidebarMenu;
