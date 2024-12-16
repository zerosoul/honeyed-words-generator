import Client from 'react-dom/client';
import App from './App';
import GlobalStyle from './Global.style';

const root = Client.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
