import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Pages from './Pages/index.tsx';
import './main.css';

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

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Pages />
	</StrictMode>,
);
