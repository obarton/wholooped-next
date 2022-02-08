import React from "react"
import PageContainer, { MobilePageContainer } from "../../../components/PageContainer";
import { Desktop, Mobile } from "../../../components/Responsive";
import Spinner from "../../../components/Spinner";
import { Button, Stack } from "react-bootstrap";
import { useUserProfile } from "../../../hooks/useUserProfile";
import HorizontalDivider from "../../../components/HorizontalDivider";
import styled from "styled-components"
import { useRouter } from "next/router";

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

const EditProfile = () => {
  const router = useRouter()
  const { user, userProfile, isLoading, isError} = useUserProfile()

  if (isError) return <div>Failed to load</div>
  if (isLoading ) return <Spinner />

    return (
      <>
        <Desktop>
            <EditProfileContainer>
          <PageContainer>
          <div style={{textAlign: "center"}}>
                <h1>Edit Profile</h1>
                <HorizontalDivider /> 
                <div style={{marginTop: "2rem"}}>
                    <Stack gap={3}>
                        <div>
                    <EditProfileButton onClick={() => router.push("/profile/user/edit")}>Edit User Profile</EditProfileButton>
                    </div>
                    <div>
                    <EditProfileButton onClick={() => router.push("/profile/loopmaker/edit")}>Edit Loopmaker Profile</EditProfileButton>
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
                <h1>Edit Profile</h1>
                <HorizontalDivider /> 
                <div style={{marginTop: "2rem"}}>
                    <Stack gap={3}>
                        <div>
                    <EditProfileButton onClick={() => router.push("/profile/user/edit")}>Edit User Profile</EditProfileButton>
                    </div>
                    <div>
                    <EditProfileButton onClick={() => router.push("/profile/loopmaker/edit")}>Edit Loopmaker Profile</EditProfileButton>
                    </div>
                    </Stack>
                    </div>
                </div>
          </MobilePageContainer>
          </EditProfileContainer>
        </Mobile>
      </>
    )
}

export default EditProfile;
