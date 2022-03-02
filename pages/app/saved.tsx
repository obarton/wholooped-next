import React from 'react';
import styled from 'styled-components';
import Layout from "../../components/Layout"
import SidebarWrapper from "../../components/SidebarWrapper"
import { Desktop, Mobile } from '../../components/Responsive';
import { useUser } from '@auth0/nextjs-auth0';
import { Container, Button } from 'react-bootstrap';
import { useLikes } from '../../hooks/useLikes';
import Spinner from '../../components/Spinner';
import LikesList from '../../components/LikesList';
import { MobilePageContainer } from '../../components/PageContainer';
import { PageTitles } from '../../utils/page';
import NextLink from "../../components/NextLink"

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

const Likes = () => {
    const { user, error, isLoading } = useUser();
    const useLikesData = useLikes(user?.sub as string)

    if (error) { 
        return (
            <Layout title={PageTitles.Saved}>
            <div>Failed to load</div>
            </Layout>
        )
   }

   if (isLoading || useLikesData.isLoading ) { 
        return (
            <Layout title={PageTitles.Saved}>
                <Spinner />
            </Layout>
        )
    }

    if (!isLoading && !user) { 
        return (
            <Layout title={PageTitles.Saved}>
                <Desktop>
                <PageContainer>
                        <SidebarWrapper>
                            <Container style={{padding: "68px"}}>
                            <h2>Saved</h2>
                            <div style={{marginTop: "1rem"}}>
                                <NextLink href="/api/auth/login">
                                    <Button>Login to save songs!</Button>  
                                </NextLink>  
                            </div>             
                            </Container>
                        </SidebarWrapper>
                </PageContainer>
                </Desktop>
                <Mobile>
                    <MobilePageContainer>
                    <div style={{textAlign: "center", minHeight: "70vh"}}>
                    <h2>Saved</h2>
                        <div style={{marginTop: "2rem"}}>
                            <NextLink href="/api/auth/login">
                                <Button>Login to save songs!</Button>  
                            </NextLink>  
                        </div> 
                        </div>     
                    </MobilePageContainer>
            </Mobile>
            </Layout>
        )
    }

  return (
        <Layout title={PageTitles.Saved}>
            <Desktop>
            <PageContainer>
                    <SidebarWrapper>
                        <Container style={{padding: "68px"}}>
                            <h2>Saved</h2>
                            {useLikesData.likes.length == 0 && <p>No likes yet.</p>}
                            {<LikesList songs={useLikesData.likes}/>}
                        </Container>
                    </SidebarWrapper>
            </PageContainer>
            </Desktop>
        <Mobile>
            <MobilePageContainer>
                    <h2>Saved</h2>
                    {useLikesData.likes.length == 0 && <p>No likes yet.</p>}
                    {<LikesList songs={useLikesData.likes}/>}
                </MobilePageContainer>
            </Mobile>
        </Layout>
    );
};

export default Likes;
