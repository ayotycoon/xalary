import { Add, AddBox, AddRounded, Dashboard, PlusOne, Public, PublicOff } from '@mui/icons-material';


export interface MenuItem {
  link?: string;
  icon?: any;
  badge?: string;
  items?: MenuItem[];
  name: string;
  hide?: boolean;
  authenticated?: boolean
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
  hide?: boolean;

}

const menuItems: MenuItems[] = [
  {
    heading: '',
    hide: false,
    
    items: [

      {
        name: 'Home',
        icon: Dashboard,
        link: '/',

      },]
  },
  // {
  //   heading: 'Websites',
  //   hide: !Config.appConfig.dev,
  //   items: [

  //     {
  //       name: 'Public Websites',
  //       icon: Public,
  //       link: '/public-websites/',

  //     },
  //     {
  //       name: 'My Websites',
  //       link: '/my-websites/',
  //       icon: PublicOff,
  //       authenticated: true
  //     },
  //     {
  //       name: 'Add Website',
  //       link: '/add-website/',
  //       icon: AddBox
  //     },
  //   ]
  // },

];

export default menuItems;
