import { createRoot } from 'react-dom/client';
import initFps from './initFps';
import App from './AppTable';
import './index.css';

initFps();

createRoot(document.getElementById('root')!).render(<App />);
