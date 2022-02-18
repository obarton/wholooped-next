import React from "react"
import PageContainer, { MobilePageContainer } from "../../../components/PageContainer";
import { Desktop, Mobile } from "../../../components/Responsive";
import Spinner from "../../../components/Spinner";
import Layout from "../../../components/Layout";
import { Button, Stack } from "react-bootstrap";
import { useUserProfile } from "../../../hooks/useUserProfile";
import HorizontalDivider from "../../../components/HorizontalDivider";
import styled from "styled-components"
import { useRouter } from "next/router";
import { PageTitles } from "../../../utils/page";

const EditProfileButton = styled.button`
    height: 40px;
    width: 200px;
    border: none;
    background-color: #000;
    color: white;
    font-size: 15px
`

const EditProfileContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

const SelectProfile = () => {
  const router = useRouter()
  const { user, userProfile, isLoading, isError} = useUserProfile()

    if (isError) { 
      return (
          <Layout title={PageTitles.EditProfile}>
          <div>Failed to load</div>
          </Layout>
      )
  }

  if (isLoading) { 
      return (
          <Layout title={PageTitles.EditProfile}>
              <Spinner />
          </Layout>
      )
  }

    return (
      <Layout title={PageTitles.EditProfile}>
        <Desktop>
            <EditProfileContainer>
          <PageContainer>
          <div style={{textAlign: "center"}}>
                <h1>Select Profile</h1>
                <HorizontalDivider /> 
                <div style={{marginTop: "2rem"}}>
                    <Stack gap={3}>
                    <div>
                    <EditProfileButton onClick={() => router.push(`/users/${userProfile?.name}`)}>My User Profile</EditProfileButton>
                    </div>
                    <div>
                    <EditProfileButton onClick={() => router.push(`/loopmakers/${userProfile?.linkedLoopmaker?.slug}`)}>My Loopmaker Profile</EditProfileButton>
                    </div>
                    </Stack>
                    </div>
                </div>
          </PageContainer>
          </EditProfileContainer>
        </Desktop>
        <Mobile>
        <EditProfileContainer>
          <MobilePageContainer>
              <div style={{textAlign: "center"}}>
                <h1>Select Profile</h1>
                <HorizontalDivider /> 
                <div style={{marginTop: "2rem"}}>
                    <Stack gap={3}>
                    <div>
                    <EditProfileButton onClick={() => router.push(`/users/${userProfile?.name}`)}>My User Profile</EditProfileButton>
                    </div>
                    <div>
                    <EditProfileButton onClick={() => router.push(`/loopmakers/${userProfile?.linkedLoopmaker?.slug}`)}>View Loopmaker Profile</EditProfileButton>
                    </div>
                    </Stack>
                    </div>
                </div>
          </MobilePageContainer>
          </EditProfileContainer>
        </Mobile>
      </Layout>
    )
}

export default SelectProfile;
