import React from "react"
import styled from 'styled-components';
import SidebarWrapper from './SidebarWrapper';
import { Desktop, Mobile } from './Responsive';
import 'react-multi-carousel/lib/styles.css';
import { useContent } from "../hooks/useContent";
import { useUserProfile } from "../hooks/useUserProfile";
import { Container, Form, FormControl, Stack } from "react-bootstrap";
import { responsive } from "../helper/carousel";
import Carousel from 'react-multi-carousel';
import Spinner from "./Spinner"
import UserAlbumCard from "./UserAlbumCard";
import Link from "next/link"
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';
import SmallUserAlbumCard from "./SmallUserAlbumCard";
import SmallAlbumCard from "./SmallAlbumCard"
import ContentListSection from "./ContentListSection"

const MenuButton = styled(Button)`
`

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

const SetupProfileButton = styled.button`
    height: 40px;
    width: 150px;
    border: none;
    background-color: #FFD000;
    color: black;
    font-size: 15px
`

const Dashboard = () => {
  const userProfileData = useUserProfile()
  const { contentLists, isLoading, isError } = useContent()
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
    searchText: ''
    },
    onSubmit: (values) => {
        const { searchText } = values;
        router.push(`/search?searchText=${searchText}`)
    },
  });

  if (isError) return <div>Failed to load</div>
  if (isLoading || userProfileData.isLoading ) return <Spinner />

  return (
    <PageContainer>
        <Desktop>
          <SidebarWrapper>
          <Container style={{paddingTop: "68px"}}>
                <Stack gap={4}>
                { 
                    <div>
                    { 
                        userProfileData?.userProfile ? 
                            (
                                <h2>Hi, { userProfileData?.userProfile?.displayName ? userProfileData?.userProfile?.displayName : "friend"}!</h2>        
                            ) 
                            :
                            (
                            <h2>Hi, friend!</h2>        
                            )
                        
                    }
                    </div>
                } 
                <ContentListSection contentLists={contentLists}/>
            </Stack>
            </Container>
          </SidebarWrapper>
        </Desktop>
        <Mobile>
        <Container style={{padding: "0 2.5%" }}>
            { 
                <div style={{marginBottom: "1em"}}>
                {
                    userProfileData?.userProfile ? 
                    (
                        <h3>Hi, { userProfileData?.userProfile?.displayName ? userProfileData?.userProfile?.displayName : "friend"}!</h3>        
                    ) 
                    :
                    (
                    <h3>Hi, friend!</h3>        
                    )
                }
                </div>
            }
            <div style={{marginBottom: "1em"}}>
                <Form className="d-flex" onSubmit={formik.handleSubmit}>
                    <FormControl
                        id="searchText"
                        name="searchText"
                        type="search"
                        placeholder="Search for Track, Loop, Artist, Loopmaker"
                        className="me-2"
                        aria-label="Search"
                        value={formik.values.searchText}
                        onChange={formik.handleChange}
                        style={{borderRadius: "0"}}
                    />
                    <MenuButton variant="success" type="submit" style={{borderRadius: "0"}}>Search</MenuButton>
                </Form>
                { 
                    (userProfileData?.userProfile && userProfileData?.userProfile?.linkedLoopmaker == null) && 
                    (
                        <div style={{textAlign: "center", marginTop: "1em"}}>
                            <p><b>Are you a loopmaker?</b></p>
                            <SetupProfileButton onClick={() => router.push(`/profile/loopmaker/create`)}>Setup Your Profile</SetupProfileButton>
                        </div>
                    )
                }
            </div>
            <ContentListSection contentLists={contentLists}/>
            </Container>
            </Mobile>
    </PageContainer>
  );
};

export default Dashboard;
