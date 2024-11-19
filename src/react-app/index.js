import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';


export function initApp(container = document.getElementById('react-app')) {
  const root = createRoot(container);
  const existingImageComparison = container.querySelector('image-comparison');
  const beforeImg = existingImageComparison?.querySelector('img:first-child')?.src || '/before.png';
  const afterImg = existingImageComparison?.querySelector('img:last-child')?.src || '/after.png';

  root.render(
    <StrictMode>
        <image-comparison>
          <img src={beforeImg} label="Before" />
          <img src={afterImg} label="After" />
        </image-comparison>
    </StrictMode>
  );
}
initApp();

