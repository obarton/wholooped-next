import React, { useEffect } from 'react';
import styled from 'styled-components';
import Layout from "../components/Layout"
import SidebarWrapper from "../components/SidebarWrapper"
import { Desktop, Mobile } from '../components/Responsive';
import { useUser } from '@auth0/nextjs-auth0';
import { Container } from 'react-bootstrap';
import { useLikes } from '../hooks/useLikes';
import Spinner from '../components/Spinner';
import LikesList from '../components/LikesList';
import { MobilePageContainer } from '../components/PageContainer';
import { PageTitles } from '../utils/page';
import NextLink from "../components/NextLink"
import { Statistic, Row, Col, Button, Progress, Typography } from 'antd';
import 'antd/dist/antd.css';
import { useUserProfile } from '../hooks/useUserProfile';
import { useUsers } from '../hooks/useUsers';
import { useAccount } from '../hooks/useAccount';

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

const { Text } = Typography;

const getMaxProgress = (level: number) => {
    if (level > 2) {
        return 100;
    }

    if (level > 1) {
        return 10;
    }

    return 3;
}

const Rewards = () => {
    const { user, userProfile, isLoading, isError } = useUserProfile()
    const useAccountData = useAccount(userProfile?.id as string)
    const { account } = useAccountData;

    useEffect(() => {
      console.log(`useAccountData ${JSON.stringify(useAccountData, null, 2)}`)
    }, [useAccountData])
    

    if (isError) { 
        return (
            <Layout title={PageTitles.Rewards}>
            <div>Failed to load</div>
            </Layout>
        )
   }

   if (isLoading || useAccountData.isLoading ) { 
        return (
            <Layout title={PageTitles.Rewards}>
                <Spinner />
            </Layout>
        )
    }

    if (!isLoading && !user) { 
        return (
            <Layout title={PageTitles.Rewards}>
                <Desktop>
                <PageContainer>
                        <SidebarWrapper>
                            <Container style={{padding: "68px"}}>
                            <h2>Rewards</h2>
                            <div style={{marginTop: "1rem"}}>
                                <NextLink href="/api/auth/login">
                                    <Button>Login to contribute and earn rewards!</Button>  
                                </NextLink>  
                            </div>             
                            </Container>
                        </SidebarWrapper>
                </PageContainer>
                </Desktop>
                <Mobile>
                    <MobilePageContainer>
                    <div style={{textAlign: "center", minHeight: "70vh"}}>
                    <h2>Rewards</h2>
                        <div style={{marginTop: "2rem"}}>
                            <NextLink href="/api/auth/login">
                                <Button>Login to contribute and earn rewards!</Button>  
                            </NextLink>  
                        </div> 
                        </div>     
                    </MobilePageContainer>
            </Mobile>
            </Layout>
        )
    }

  return (
        <Layout title={PageTitles.Rewards}>
            <Desktop>
            <PageContainer>
                    <SidebarWrapper>
                        <Container style={{padding: "68px"}}>
                            <h2>Rewards</h2>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Statistic title="Account Level" value={account?.level} />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Uploads" value={account?.uploadCount} />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Earned Account Balance ($LOOP)" value={account?.balance} precision={2} />
                                </Col>
                            </Row>
                            <div style={{marginTop: "1em"}}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Text type="secondary">{`Next level progress (${account?.uploadCount}/${getMaxProgress(account?.level)} contributions)`}</Text>
                                    <Progress percent={Math.floor((account?.uploadCount)/getMaxProgress(account?.level) * 100)} status="active" />
                                </Col>
                            </Row>
                            </div>
                        </Container>
                    </SidebarWrapper>
            </PageContainer>
            </Desktop>
        <Mobile>
            <MobilePageContainer>
                    <h2>Rewards</h2>

                </MobilePageContainer>
            </Mobile>
        </Layout>
    );
};

export default Rewards;
