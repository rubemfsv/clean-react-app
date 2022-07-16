import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from '@/main/routes/router';

const rootElement = document.getElementById('main');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router />
  </StrictMode>
);
