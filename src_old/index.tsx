import { createRoot } from 'react-dom/client';

import App from './Pages';

import '@ant-design/v5-patch-for-react-19';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
