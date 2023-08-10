import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);

// Webpack hot module replacement
// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept();
}
