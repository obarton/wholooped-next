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
  const { userProfile } = useUserProfile()
  const { contentLists, isLoading } = useContent()
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

  return (
    <PageContainer>
        <Desktop>
          <SidebarWrapper>
          <Container style={{paddingTop: "68px"}}>
        <Stack gap={4}>
            { 
                <div>
                { !isLoading && (
                    userProfile ? 
                        (
                            <h2>Hi, { userProfile?.displayName ? userProfile?.displayName : "friend"}!</h2>        
                        ) 
                        :
                        (
                        <h2>Hi, friend!</h2>        
                        )
                    )
                }
                </div>
            }
            {isLoading ? 
            (
                <Spinner />
            ) : 
            (   
                <>
                <Stack gap={4}>
                {
                    contentLists?.map((contentList: any, i: number) => {
                        const { items } = contentList;
                        return (
                            <div key={i}>
                            {
                                contentList.showMoreLink ? (
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <h3 style={{padding: "0", margin: "0"}}>{contentList.title}</h3><Link href={contentList.showMoreLink || ""} passHref><a style={{textDecoration: "none"}}><h4 style={{padding: "0", margin: "0", color: "#4183c4"}}>Show More</h4></a></Link>
                                    </div>
                                ):(
                                    <div style={{display: "flex"}}>
                                        <h3 style={{padding: "0", margin: "0"}}>{contentList.title}</h3>
                                    </div>
                                )
                            }
                                <Carousel responsive={responsive} infinite={true}>
                                {items.map((item: any) => {
                                    const {
                                        title, 
                                        subTitle, 
                                        thumbnailUrl, 
                                        userIcon,
                                        username,
                                        userDisplayName,
                                        userUrl,
                                        url
                                        } = item;

                                    const imageSrc = thumbnailUrl? `${thumbnailUrl}?w=125&h=125&fm=png&q=100&fit=thumb` : "";
                                    
                                    switch(contentList.type) {
                                        case "song":
                                            return (                                              
                                              <UserAlbumCard 
                                                  albumUrl={imageSrc} 
                                                  url={url}
                                                  title={title} 
                                                  secondaryText={subTitle} 
                                                  imageSrc={imageSrc} 
                                                  altText={title} 
                                                  userUrl={userUrl}
                                                  userThumbnailUrl={userIcon}
                                                  userDisplayName={userDisplayName}
                                                  username={username}/>        
                                            )
                                        case "looppack":
                                        case "genre":
                                            return (
                                              <AlbumCard title={title} secondaryText={subTitle} imageSrc={imageSrc} altText={title} url={url}/>
                                            )
                                        case "artist":
                                        case "loopmaker":
                                            return (
                                              <ArtistCard title={title} imageSrc={imageSrc} altText={title} url={url}/>
                                            )
                                        default:
                                            return
                                        }
                                    
                                })}
                                </Carousel>
                            </div>
                        )
                    })
                }
                </Stack>
                </>
            )}
            </Stack>
            </Container>
          </SidebarWrapper>
        </Desktop>
        <Mobile>
        <Container style={{padding: "0 2.5%" }}>
            {
                isLoading && <Spinner />
            }
            { 
                <div style={{marginBottom: "1em"}}>
                {
                    !isLoading && (
                        userProfile ? 
                        (
                            <h3>Hi, { userProfile?.displayName ? userProfile?.displayName : "friend"}!</h3>        
                        ) 
                        :
                        (
                        <h3>Hi, friend!</h3>        
                        )
                    )
                }
                </div>
            }
            {
               !isLoading && (<div style={{marginBottom: "1em"}}>
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
                    (userProfile && userProfile?.linkedLoopmaker == null) && 
                    (
                        <div style={{textAlign: "center", marginTop: "1em"}}>
                            <p><b>Are you a loopmaker?</b></p>
                            <SetupProfileButton onClick={() => router.push(`/app/profile/loopmaker/create`)}>Setup Your Profile</SetupProfileButton>
                        </div>
                    )
                }
            </div>)
            }
            <Stack gap={4}>
            {
                    contentLists?.map((contentList : any, index: number) => {
                        const { items } = contentList;
                        return (
                            <div key={index}>
                                {
                                    contentList.showMoreLink ? (
                                        <div style={{display: "flex", justifyContent: "space-between"}}>
                                            <h3>{contentList.title}</h3><Link href={contentList.showMoreLink} passHref><a style={{textDecoration: "none"}}><h4 style={{padding: "0", margin: "0", color: "#4183c4"}}>Show More</h4></a></Link>
                                        </div>
                                    ):(
                                            <h3>{contentList.title}</h3>
                                    )
                                }
                                <Carousel
                                responsive={responsive}
                                infinite={true}
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                >
                                {items.map((item: any) => {
                                    const {
                                        title, 
                                        subTitle, 
                                        thumbnailUrl, 
                                        userIcon,
                                        username,
                                        userDisplayName,
                                        userUrl,
                                        url
                                        } = item;

                                    const imageSrc = thumbnailUrl? `${thumbnailUrl}?w=100&h=100&fm=png&q=100&fit=thumb` : "";
                                        
                                    switch(contentList.type) {
                                        case "song":
                                            return (
                                                <SmallUserAlbumCard 
                                                albumUrl={imageSrc} 
                                                url={url}
                                                title={title} 
                                                secondaryText={subTitle} 
                                                imageSrc={imageSrc} 
                                                altText={title} 
                                                userUrl={userUrl}
                                                userThumbnailUrl={userIcon}
                                                userDisplayName={userDisplayName}
                                                username={username}/>
                                            )
                                        case "looppack":
                                        case "genre":
                                            return (
                                                <SmallAlbumCard title={title} secondaryText={subTitle} imageSrc={imageSrc} altText={title} url={url}/>
                                            )
                                        case "artist":
                                            return (
                                                <ArtistCard title={title} imageSrc={imageSrc} altText={title}/>   
                                            )
                                        default:
                                            return
                                        }
                                    
                                })}
                                </Carousel>
                            </div>
                        )
                    })
                }
                </Stack>
        </Container>
        </Mobile>
</PageContainer>
  );
};

export default Dashboard;
