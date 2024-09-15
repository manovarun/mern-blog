import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import App from './App.jsx';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </StrictMode>
);
