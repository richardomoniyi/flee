// import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  Navigate
} from 'react-router-dom';
import Home from './pages/Home';
//import Users from './pages/Users';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './components/menu/Menu';
import Error from './pages/Error';
import Profile from './pages/Profile';
//import Orders from './pages/Orders';
import Charts from './pages/Charts';
import Logs from './pages/Logs';
import ToasterProvider from './components/ToasterProvider';
import EditProfile from './pages/EditProfile';
import User from './pages/User';
import Product from './pages/Product';
import Login from './pages/Login';
import Tracker from './pages/Tracker';
import Orders from './pages/Order/Orders';
import Drivers from './pages/Driver/Drivers';
import Dispatchs from './pages/Dispatch/Dispatchs';
//import Payments from './pages/Payments';
import Payments from './pages/Payment/Payments';
import Customers from './pages/Customer/Customers';
import Users from './pages/User/Users';
import Chatbot from './pages/Chatbot';
//import { GlobalProvider } from "./components/GlobalContext";


function App() {
  const Layout = () => {
    return (
      //<GlobalProvider>
      <>
      <div
        id="rootContainer"
        className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
      >
       
        <ToasterProvider />
        <ScrollRestoration />
        <div>
          <Navbar />
          <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
            <div className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
              <Menu />
            </div>
            <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Chatbot />
      </>
      //</GlobalProvider>
    );
  };

  /*const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/profile/edit',
          element: <EditProfile />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/users/:id',
          element: <User />,
        },
        {
          path: '/customers',
          element: <Customers />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/drivers',
          element: <Drivers />,
        },
        {
          path: '/payments',
          element: <Payments />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
        {
          path: '/charts',
          element: <Charts />,
        },
        {
          path: '/logs',
          element: <Logs />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);*/
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace />, // Redirect to login by default
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/tracking',
      element: <Tracker />,
    },
    {
      path: '/chatbot',
      element: <Chatbot />,
    },
    {
      path: '/dashboard',
      element: <Layout />,
      children: [
        {
          path: '/dashboard/home',
          element: <Home />,
        },
        {
          path: '/dashboard/profile',
          element: <Profile />,
        },
        {
          path: '/dashboard/profile/edit',
          element: <EditProfile />,
        },
        {
          path: '/dashboard/users',
          element: <Users />,
        },
        {
          path: '/dashboard/users/:id',
          element: <User />,
        },
        {
          path: '/dashboard/customers',
          element: <Customers />,
        },
        {
          path: '/dashboard/orders',
          element: <Orders />,
        },
        {
          path: '/dashboard/drivers',
          element: <Drivers />,
        },
        {
          path: '/dashboard/dispatchs',
          element: <Dispatchs />,
        },
        {
          path: '/dashboard/payments',
          element: <Payments />,
        },
        {
          path: '/dashboard/products/:id',
          element: <Product />,
        },
        {
          path: '/dashboard/charts',
          element: <Charts />,
        },
        {
          path: '/dashboard/logs',
          element: <Logs />,
        },
      ],
      errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
}
/*const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/profile/edit',
        element: <EditProfile />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/users/:id',
        element: <User />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/:id',
        element: <Product />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/posts',
        element: <Posts />,
      },
      {
        path: '/notes',
        element: <Notes />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/charts',
        element: <Charts />,
      },
      {
        path: '/logs',
        element: <Logs />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

return <RouterProvider router={router} />;
}*/

export default App;
