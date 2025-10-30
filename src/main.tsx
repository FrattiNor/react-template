import { createRoot } from 'react-dom/client';

import App from './App/index.tsx';
import initFps from './initFps.ts';
import './main.css';
// import { StrictMode } from 'react';

// == Hook ==
// useActionState
// useDeferredValue
// useEffectEvent
// useImperativeHandle
// useInsertionEffect
// useOptimistic
// useSyncExternalStore
// useTransition

// == 组件 ==
// <Activity>
// <Suspense>
// <ViewTransition>

// == API ==
// use

initFps();

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<App />,
	// </StrictMode>,
);
