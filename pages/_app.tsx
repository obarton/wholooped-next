import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { UserProvider } from '@auth0/nextjs-auth0';
import Amplify from 'aws-amplify'
import config from "../aws-exports"
import { getAmplifyEndpoints } from '../helper/amplify';

const stage = "dev"
const endpoints = getAmplifyEndpoints(stage)

Amplify.configure({ 
  ...config, 
  API: {
    endpoints
  }
});

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </UserProvider>
  )
}

export default App
