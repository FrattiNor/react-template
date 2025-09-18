import { createRoot } from 'react-dom/client';

import App from './AppTable';
import initFps from './initFps';
import './index.css';
// import { StrictMode } from 'react';

initFps();

// createRoot(document.getElementById('root')!).render(
// 	<StrictMode>
// 		<App />
// 	</StrictMode>,
// );

createRoot(document.getElementById('root')!).render(<App />);
