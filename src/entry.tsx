import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('root'));

// Webpack hot module replacement
// @ts-ignore
if (module.hot) {
	// @ts-ignore
	module.hot.accept();
}
