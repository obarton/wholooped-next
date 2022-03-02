import React from 'react';
import styled from 'styled-components';
import Layout from "../components/Layout"
import SidebarWrapper from "../components/SidebarWrapper"
import { useUser } from '@auth0/nextjs-auth0';
import { Container, Button } from 'react-bootstrap';
import { useLikes } from '../hooks/useLikes';
import Spinner from '../components/Spinner';
import NextLink from "../components/NextLink"
import { Desktop, Mobile } from '../components/Responsive';
import { MobilePageContainer } from '../components/PageContainer';

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

const AddASong = () => {
    const { user, error, isLoading } = useUser();
    const useLikesData = useLikes(user?.sub as string)
    const PAGE_TITLE = "Add A Song"

    if (error) { 
        return (
            <Layout title={PAGE_TITLE}>
            <div>Failed to load</div>
            </Layout>
        )
   }

   if (isLoading || useLikesData.isLoading ) { 
        return (
            <Layout title={PAGE_TITLE}>
                <Spinner />
            </Layout>
        )
    }

    if (!isLoading && !user) { 
        return (
            <Layout title={PAGE_TITLE}>
                <Desktop>
                <PageContainer>
                        <SidebarWrapper>
                            <Container style={{padding: "68px"}}>
                            <h2>Add A Song</h2>
                            <div style={{marginTop: "1rem"}}>
                                <NextLink href="/api/auth/login">
                                    <Button>Login to add a song!</Button>  
                                </NextLink>  
                            </div>             
                            </Container>
                        </SidebarWrapper>
                </PageContainer>
                </Desktop>
                <Mobile>
                <MobilePageContainer>
                    <div style={{textAlign: "center"}}>
                    <h2>Add A Song</h2>
                        <div style={{marginTop: "2rem"}}>
                            <NextLink href="/api/auth/login">
                                <Button>Login to add a song!</Button>  
                            </NextLink>  
                        </div>   
                    </div> 
                </MobilePageContainer>
            </Mobile>
            </Layout>
        )
    }
};

export default AddASong;
