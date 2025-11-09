import "./instrument";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/store';
import './index.css'
import App from './App.tsx'
import LoadingPage from './pages/LoadingPage';

const container = document.getElementById('root');

const root = createRoot(container!, {
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn('Uncaught error', error, errorInfo.componentStack);
  }),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);




// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={<LoadingPage />} persistor={persistor}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//       </PersistGate>
//     </Provider>
//   </StrictMode>,
// )
