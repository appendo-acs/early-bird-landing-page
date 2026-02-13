import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ActivitySyncProvider } from './hooks/useActivitySync';

export default function App() {
  return (
    <ActivitySyncProvider>
      <RouterProvider router={router} />
    </ActivitySyncProvider>
  );
}