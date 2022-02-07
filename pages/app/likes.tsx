import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import SidebarWrapper from "../../components/SidebarWrapper"
import { Desktop, Mobile } from '../../components/Responsive';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Container } from 'react-bootstrap';
import { useLikes } from '../../hooks/useLikes';
import Spinner from '../../components/Spinner';
import LikesList from '../../components/LikesList';
import { MobilePageContainer } from '../../components/PageContainer';

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

const Likes = () => {
    const { user, error, isLoading } = useUser();
    const useLikesData = useLikes(user?.sub as string)

    if (error || useLikesData.isError) return <div>Failed to load</div>
    if (isLoading || useLikesData.isLoading ) return <Spinner />

  return (
      <>
        <Desktop>
        <PageContainer>
                <SidebarWrapper>
                    <Container style={{padding: "68px"}}>
                        <h2>Likes</h2>
                        {useLikesData.likes.length == 0 && <p>No likes yet.</p>}
                        {<LikesList songs={useLikesData.likes}/>}
                    </Container>
                </SidebarWrapper>
        </PageContainer>
        </Desktop>
        <Mobile>
            <MobilePageContainer>
                    <h2>Likes</h2>
                    {useLikesData.likes.length == 0 && <p>No likes yet.</p>}
                    {<LikesList songs={useLikesData.likes}/>}
                </MobilePageContainer>
            </Mobile>
        </>
    );
};

export default withPageAuthRequired(Likes);
