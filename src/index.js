import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './Global.style';
import { ApolloClient } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloProvider, HttpLink } from '@apollo/client';
import register from './registerServiceWorker';
console.log('process env', process.env);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // 开发环境从根目录 .env.development.local 读取
  const token = process.env.REACT_APP_TOKEN || '';
  // const token = localStorage.getItem('AUTH_TOKEN');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': token
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: 'https://g.yangerxiao.com/v1/graphql' })),
  cache: new InMemoryCache()
});
ReactDOM.render(
  <>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </>,
  document.getElementById('root')
);

register();
