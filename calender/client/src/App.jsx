import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import MainCard from './components/MainCard';
import Header from './components/oldComponents/Header';
import Footer from './components/oldComponents/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function getDeviceType() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
 
  if (width >= 1200) {
     return 'desktop';}
  else if (width <= 768) {
     return 'mobile';
  }
 }
 

function App() {
  const deviceType = getDeviceType();
  return (
    <ApolloProvider client={client}>
      <main>
      {deviceType === 'mobile' ? (
          <div className='h-screen flex flex-col justify-between'>
            <div className="flex flex-col h-full relative">
              <div className="overflow-auto m-2 h-full " style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Outlet />
              </div>
            </div>
          </div>
        ) : (
        <MainCard children={ <Outlet />}
        />  

        )}
      </main>

    </ApolloProvider>
  );
}

export default App;
