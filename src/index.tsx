// import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from './AppTable';
import initFps from './initFps';

import './index.css';

initFps();

// createRoot(document.getElementById('root')!).render(
// 	<StrictMode>
// 		<App />
// 	</StrictMode>,
// );

createRoot(document.getElementById('root')!).render(<App />);
