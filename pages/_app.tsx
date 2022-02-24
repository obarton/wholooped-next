import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import { MoralisProvider } from "react-moralis";
import Amplify from 'aws-amplify'
import config from "../aws-exports"
import { getAmplifyEndpoints } from '../helper/amplify';
import { toast } from "react-toastify";
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID as string;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL as string;

const isServerInfo = Boolean(APP_ID && SERVER_URL);

const stage = process.env.STAGE as string;
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

function App({ Component, pageProps } : AppProps) {
  const router = useRouter()
  
  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('1953135531530233')
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <UserProvider>
          <AppContainer>
              <Component {...pageProps} />
          </AppContainer>
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
      </UserProvider>
    </MoralisProvider>
  )
}

export default App
