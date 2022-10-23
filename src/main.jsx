import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './Global.style';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
console.log('env', import.meta.env.VITE_TOKEN);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // 开发环境从根目录 .env.development.local 读取
  const token = import.meta.env.VITE_TOKEN || '';
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
