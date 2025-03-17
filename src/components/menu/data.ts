// import toast from 'react-hot-toast';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineCube,
  HiUserCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentChartBar,
  HiOutlinePencilSquare,
  HiOutlineCalendarDays,
  HiOutlinePresentationChartBar,
  HiOutlineDocumentText,
  HiTruck,
  HiOutlineShoppingCart,
  HiOutlineCurrencyDollar,
  HiOutlineArrowLeftOnRectangle,
} from 'react-icons/hi2';
import { MdTwoWheeler } from "react-icons/md";
// import { IoSettingsOutline } from 'react-icons/io5';

export const menu = [
  {
    catalog: 'main',
    listItems: [
      {
        isLink: true,
        url: '/dashboard/orders',
        icon: HiOutlineShoppingCart,
        label: 'orders',
      },
      {
        isLink: true,
        url: '/dashboard/drivers',
        icon: MdTwoWheeler,
        label: 'Drivers',
      },
      {
        isLink: true,
        url: '/dashboard/customers',
        icon: HiUserCircle,
        label: 'Customers',
      },
      {
        isLink: true,
        url: '/dashboard/users',
        icon: HiOutlineUsers,
        label: 'Users',
      },
      {
        isLink: true,
        url: '/dashboard/dispatchs',
        icon: HiTruck,
        label: 'dispatchs',
      },
      {
        isLink: true,
        url: '/dashboard/payments',
        icon: HiOutlineCurrencyDollar,
        label: 'payments',
      },
      {
        isLink: true,
        url: '/dashboard/reports',
        icon: HiOutlineArrowLeftOnRectangle,
        label: 'reports',
      },
      {
        isLink: true,
        url: '/dashboard/settings',
        icon: HiOutlineClipboardDocumentList,
        label: 'settings',
      },
      
      {
        isLink: true,
        url: '/login',
        icon: HiOutlineArrowLeftOnRectangle,
        label: 'log out',
      }
    ],
  }/*,
  {
    catalog: 'lists',
    listItems: [
      {
        isLink: true,
        url: '/users',
        icon: HiOutlineUsers,
        label: 'users',
      },
      {
        isLink: true,
        url: '/products',
        icon: HiOutlineCube,
        label: 'products',
      },
      {
        isLink: true,
        url: '/orders',
        icon: HiOutlineClipboardDocumentList,
        label: 'orders',
      },
      {
        isLink: true,
        url: '/posts',
        icon: HiOutlineDocumentChartBar,
        label: 'posts',
      },
    ],
  },
  {
    catalog: 'general',
    listItems: [
      {
        isLink: true,
        url: '/notes',
        icon: HiOutlinePencilSquare,
        label: 'notes',
      },
      {
        isLink: true,
        url: '/calendar',
        icon: HiOutlineCalendarDays,
        label: 'calendar',
      },
    ],
  },
  {
    catalog: 'analytics',
    listItems: [
      {
        isLink: true,
        url: '/charts',
        icon: HiOutlinePresentationChartBar,
        label: 'charts',
      },
      {
        isLink: true,
        url: '/logs',
        icon: HiOutlineDocumentText,
        label: 'logs',
      },
    ],
  },
  {
    catalog: 'miscellaneous',
    listItems: [
      // {
      //   isLink: true,
      //   url: '/settings',
      //   icon: IoSettingsOutline,
      //   label: 'settings',
      // },
      {
        isLink: true,
        url: '/login',
        icon: HiOutlineArrowLeftOnRectangle,
        label: 'log out',
      },
    ],
  },*/
];
