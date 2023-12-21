import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '../index.css';

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
      <Route path="/" element={<NebuiaDemoContent />} />
      <Route path="/widget" element={<NebuiaDemoContent />} />
      <Route path="/widget/:secret" element={<NebuiaDemoContent />} />
      <Route path="/nebuia-react-component" element={<NebuiaDemoContent />} />
      <Route
        path="/nebuia-face"
        element={<NebuiaDemoContent checkReport faceStandAlone />}
      />
      {IS_DEBUG && <Route path="/components" element={<ComponentsPages />} />}
    </Routes>
  </BrowserRouter>,
);
