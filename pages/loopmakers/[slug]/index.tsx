import React from 'react';
import { Desktop, Mobile } from '../../../components/Responsive';
import { MobilePageContainer } from '../../../components/PageContainer';
import NextLink from '../../../components/NextLink';
import CreditsList from '../../../components/CreditsList';
import IndexPageAvatarHeader from '../../../components/IndexPageAvatarHeader';
import { resizeImageFromUrl } from '../../../helper/image';
import { API } from "aws-amplify"
import LoopmakerProfileCard from '../../../components/LoopmakerProfileCard';
import HorizontalDivider from '../../../components/HorizontalDivider';
import { getLoopmakerBySlug, getLoopmakers } from '../../../lib/contentfulApi';
import { useUserProfile } from '../../../hooks/useUserProfile';
import Spinner from '../../../components/Spinner';
import styled from "styled-components"
import Layout from '../../../components/Layout';
import { Container, Image } from 'react-bootstrap';

const StyledContainer = styled(Container)({
    width: "50%", 
    marginBottom: "2rem"
})

const StyledMobileContainer = styled.div`
    margin-top: 2rem; 
    margin-bottom: 2rem;
    padding: 0;
`

interface LoopmakerPageProps {
    loopmaker: any;
    songs: any;
}

const LoopmakerPageContainer = styled.div`
  min-height: 100vh
  paddingBottom: 6rem
`

const HeaderImage = styled.img`
    position: relative
    top: 0
    left: 0
    min-width: 100%
    min-height: 100%
    object-fit: cover
`

const HeaderImageTest = styled.img`
width: 100%
    object-fit: cover
`

const HeaderSubContainer = styled.div`
    position: relative
    height: 325px
    width: 1024px
`

const HeaderImageContainer = styled.div`
    position: relative
    top: 0
    left: 0
    min-width: 100%
    min-height: 100%
    display: flex
    justify-content: center
`

const MobileHeaderImageContainer = styled.div`
    position: relative
    top: 0
    left: 0
    min-width: 100%
    min-height: 100%
    display: flex
    justify-content: center
    border: 2px solid red
    padding: 0
`


const resizeHeaderImageFromUrl = (url: string) => {
    return url ? `${url}?w=1024&h=512&fm=png&q=100` : ""
}

const Loopmaker = ({ loopmaker, songs }: LoopmakerPageProps) => {
  const {name, username, bio, websiteUrl, twitterUrl, facebookUrl, instagramUrl} = loopmaker;
  const { userProfile, isLoading, isError, isAuthenticated} = useUserProfile()


  const avatarSrc = resizeImageFromUrl(loopmaker?.profilePhoto?.url)
  const headerSrc = resizeHeaderImageFromUrl(loopmaker?.headerPhoto?.url)
  

  if (isError && isAuthenticated) { 
    return (
        <Layout>
        <div>Failed to load</div>
        </Layout>
    )
}

if (isLoading) { 
    return (
        <Layout>
            <Spinner />
        </Layout>
    )
}

  return (
  <Layout title={name}>
    <Desktop>
        <LoopmakerPageContainer>
        <StyledContainer>
            <div className="container mb-4 d-flex justify-content-center">
                <HeaderImageContainer>
                    <div style={{
                        width: "400px", 
                        position: "absolute", 
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        left: "50%",
                        transform: "translate(-50%, 0%)",
                        paddingTop: "1rem"
                        }}>
                    <LoopmakerProfileCard 
                        avatarSrc={avatarSrc}
                        displayName={name}
                        username={username}
                        bio={bio}
                        websiteUrl={websiteUrl}
                        credits={songs}
                        twitterUrl={twitterUrl}
                        instagramUrl={instagramUrl}
                        facebookUrl={facebookUrl}
                        canEdit={userProfile?.linkedLoopmaker && (userProfile?.linkedLoopmaker?.username == username)}
                    />
                    </div>
                    { headerSrc ? (
                        <div style={{ height: "512px", width: "1024px", overflow: "hidden"}}>
                        <Image alt="header-photo" src={headerSrc} fluid style={{width: "100%", objectFit: "cover"}}/>
                    </div>
                    ) :(
                        <div style={{height: "400px", width: "1024px"}}>
                        </div>
                    )}    
                </HeaderImageContainer>
            </div>
            <div style={{marginTop: "1rem"}}>
                <h3 style={{textAlign: "center"}}>Credits</h3>
                <HorizontalDivider />
                <div style={{marginTop: "2rem"}}>
                    <CreditsList credits={songs}/>
                </div>
            </div>
        </StyledContainer>
        </LoopmakerPageContainer>
      </Desktop>
      <Mobile>
        <LoopmakerPageContainer>
            <StyledMobileContainer>
            <div className="d-flex justify-content-center">
                <MobileHeaderImageContainer>
                    <div style={{
                        width: "100%", 
                        position: "absolute", 
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                        paddingTop: "2rem"
                        }}>
                        <div style={{width: "70%"}}>
                            <LoopmakerProfileCard 
                                avatarSrc={avatarSrc}
                                displayName={name}
                                username={username}
                                bio={bio}
                                websiteUrl={websiteUrl}
                                credits={songs}
                                twitterUrl={twitterUrl}
                                instagramUrl={instagramUrl}
                                facebookUrl={facebookUrl}
                                canEdit={userProfile?.linkedLoopmaker && (userProfile?.linkedLoopmaker?.username == username)}
                            />
                        </div>
                    </div>
                    { headerSrc ? (
                        <div style={{ height: "512px", width: "100vw", overflow: "hidden"}}>
                        <Image alt="header-photo" src={headerSrc} fluid style={{height: "256px", minWidth: "100%", objectFit: "cover"}}/>
                    </div>
                    ) :(
                        <div style={{height: "325px", width: "100%"}}>
                        </div>
                    )}    
                </MobileHeaderImageContainer>
            </div>
            <div style={{marginTop: "2rem", padding: "1rem"}}>
                <h3 style={{textAlign: "center"}}>Credits</h3>
                <HorizontalDivider />
                <div style={{marginTop: "2rem"}}>
                    <CreditsList credits={songs}/>
                </div>
            </div>
            </StyledMobileContainer>
        </LoopmakerPageContainer>
      </Mobile>
  </Layout>)
};

export const getStaticProps = async (context: any) => {
    const slug = context.params.slug;
    const loopmaker = await getLoopmakerBySlug(slug)
    const songs = await API.get("LoopmakerApi", `/loopmaker/${loopmaker?.sys?.id}/credits`, {})
    console.log(`loopmaker ${JSON.stringify(loopmaker, null, 2)}`);
    
    return {
        props: {
            loopmaker,
            songs
        },
        revalidate: 10, // In seconds
    }
}

export const getStaticPaths = async () => {
    const loopmakers = await getLoopmakers()

    const slugs = loopmakers.map((loopmaker: any) => loopmaker.slug);
    const paths = slugs.map((slug: any) => ({params: {slug: slug.toString()}}))

    return {
        paths,
        fallback: 'blocking'
    }
}

export default Loopmaker;
