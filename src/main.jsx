import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import './index.css';

import Login from './pages/login/main'
import Register from './pages/user/register/main';
import Home from './pages/user/home/main';
import Courses from './pages/user/courses/main';
import Course from './pages/user/courses/course/main';
import Vocab from './pages/user/courses/course/vocab/main';
import VocabLearn from './pages/user/courses/course/vocab/learn/main';
import Grammar from './pages/user/courses/course/grammar/main';
import GrammarLearn from './pages/user/courses/course/grammar/learn/main';
import Dashboard from './pages/admin/dashboard/main';
import Transaction from './pages/admin/transaction/main';
import User from './pages/admin/user/main';
import ContentManagement from './pages/content/courses/main';
import OAuth2RedirectHandler from './pages/login/OAuth/OAuth2RedirectHandler';
import Payment from './pages/user/payment/main';
import PaymentResult from './pages/user/payment/PaymentResult';
import UserTransaction from './pages/user/transaction/main';
import DetailUserTransaction from './pages/user/transaction/detail/main';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { vi } from 'date-fns/locale';

const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/courses",
    Component: Courses
  },
  {
    path: "/courses/:id",
    Component: Course
  },
  {
    path: "/courses/:id/vocab",
    Component: Vocab
  },
  {
    path: "/courses/:id/vocab/learn",
    Component: VocabLearn
  },
  {
    path: "/courses/:id/grammar",
    Component: Grammar
  },
  {
    path: "/courses/:id/grammar/learn",
    Component: GrammarLearn
  },
  {
    path: "/admin",
    Component: Dashboard,
  },
  {
    path: "/admin/transaction",
    Component: Transaction,
  },
  {
    path: "/admin/user",
    Component: User,
  },
  {
    path: "/content/courses",
    Component: ContentManagement,
  },
  {
    path: "/oauth2/redirect", // Add this route for handling OAuth2 redirects
    Component: OAuth2RedirectHandler,
  },
  {
    path: "/payment",
    Component: Payment,
  },
  {
    path: "/vnpay-payment",
    Component: PaymentResult,
  },
  {
    path: "/transaction",
    Component: UserTransaction,
  },
  {
    path: "/transaction/:id",
    Component: DetailUserTransaction,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <RouterProvider router={router} />
      </CookiesProvider>
    </LocalizationProvider>
  </StrictMode>,
)