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

// import React, { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import '../web-component/ImageComparison';

// export function initApp(container = document.getElementById('react-app')) {
//   // Find the <image-comparison> component inside the container
//   const imageComparisonElement = container.querySelector('image-comparison');

//   if (imageComparisonElement) {
//     // Retrieve the before and after images and their labels from the HTML
//     const beforeImg = imageComparisonElement.querySelector('img:first-child');
//     const afterImg = imageComparisonElement.querySelector('img:last-child');

//     const beforeImage = beforeImg?.getAttribute('src') || '%PUBLIC_URL%/before.png';
//     const beforeLabel = beforeImg?.getAttribute('label') || 'Before';

//     const afterImage = afterImg?.getAttribute('src') || '%PUBLIC_URL%/after.png';
//     const afterLabel = afterImg?.getAttribute('label') || 'After';

//     // Ensure there is a clean wrapper for React to render into
//     let reactContainer = imageComparisonElement.querySelector('.react-wrapper');
//     if (!reactContainer) {
//       reactContainer = document.createElement('div');
//       reactContainer.className = 'react-wrapper';
//       imageComparisonElement.appendChild(reactContainer);
//     }

//     // Render the React component into the clean wrapper
//     const root = createRoot(reactContainer);
//     root.render(
//       <StrictMode>
//         <ImageComparison
//           beforeImage={beforeImage}
//           beforeLabel={beforeLabel}
//           afterImage={afterImage}
//           afterLabel={afterLabel}
//         />
//       </StrictMode>
//     );
//   } else {
//     console.error('<image-comparison> not found in the container!');
//   }
// }

// // Initialize the app
// initApp();