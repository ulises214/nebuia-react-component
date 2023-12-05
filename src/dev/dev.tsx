import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '../index.css';

import { NebuiaDemoContent } from './content';

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
    </Routes>
  </BrowserRouter>,
);
