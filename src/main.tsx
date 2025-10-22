import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

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
