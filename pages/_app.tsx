import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { UserProvider } from '@auth0/nextjs-auth0';
import Amplify from 'aws-amplify'
import config from "../aws-exports"
import { getAmplifyEndpoints } from '../helper/amplify';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const stage = "dev"
const endpoints = getAmplifyEndpoints(stage)
// Call it once in your app. At the root of your app is the best place
toast.configure()

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
