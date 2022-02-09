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
import Footer from '../components/Footer';
import styled from 'styled-components';

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

const AppContainer = styled.div`
min-height: calc(100vh - 160px);
`
const FooterWrapper = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
`

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
        <AppContainer>
            <Component {...pageProps} />
        </AppContainer>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
    </UserProvider>
  )
}

export default App
