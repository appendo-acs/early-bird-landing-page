import { createBrowserRouter } from 'react-router';
import EarlyBirdPage from './pages/EarlyBirdPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: EarlyBirdPage,
  },
  {
    path: '/early-bird',
    Component: EarlyBirdPage,
  },
]);
