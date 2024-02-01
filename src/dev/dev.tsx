import { Layout } from '@components/layouts/Layout';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import '../index.css';

import { ThemeProvider } from '../theme/presentation/providers/ThemeProvider';
import { IS_DEBUG } from './constants/env';
import { NebuiaDemoContent } from './content';
import { ComponentsPages } from './pages/components-pages';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<NebuiaDemoContent theme="system" enableBackground />}
      />
      <Route path="/widget" element={<NebuiaDemoContent />} />
      <Route path="/widget/:secret" element={<NebuiaDemoContent />} />
      <Route path="/nebuia-react-component" element={<NebuiaDemoContent />} />
      <Route
        path="/nebuia-face"
        element={<NebuiaDemoContent checkReport faceStandAlone />}
      />
      {IS_DEBUG && (
        <Route
          path="/dev"
          element={
            <ThemeProvider>
              <Layout>
                <Outlet />
              </Layout>
            </ThemeProvider>
          }
        >
          <Route path="components" element={<ComponentsPages />} />
        </Route>
      )}
    </Routes>
  </BrowserRouter>,
);
