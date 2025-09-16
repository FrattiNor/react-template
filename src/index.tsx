import { createRoot } from 'react-dom/client';
import initFps from './initFps';
import App from './AppTable';
import './index.css';
// import { StrictMode } from 'react';

initFps();

// createRoot(document.getElementById('root')!).render(
// 	<StrictMode>
// 		<App />
// 	</StrictMode>,
// );

createRoot(document.getElementById('root')!).render(<App />);
