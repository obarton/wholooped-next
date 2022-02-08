import React from 'react';
import { Desktop, Mobile } from '../../../components/Responsive';
import PageContainer, { MobilePageContainer } from '../../../components/PageContainer';
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

interface LoopmakerPageProps {
    loopmaker: any;
    songs: any;
}

const LoopmakerPageContainer = styled.div`
  min-height: 100vh
`

const resizeHeaderImageFromUrl = (url: string) => {
    return url ? `${url}?w=390&h=200&fm=png&q=100` : ""
}

const Loopmaker = ({ loopmaker, songs }: LoopmakerPageProps) => {
  const {name, username, bio, websiteUrl, twitterUrl, facebookUrl, instagramUrl} = loopmaker;
  const { userProfile, isLoading, isError} = useUserProfile()

  React.useEffect(() => {
    console.log(`userProfile ${JSON.stringify(userProfile, null, 2)}`);
    console.log(`username ${JSON.stringify(username, null, 2)}`);
  }, [userProfile, username]);
  

  const avatarSrc = resizeImageFromUrl(loopmaker?.profilePhoto?.url)
  const headerSrc = resizeHeaderImageFromUrl(loopmaker?.headerPhoto?.url)


  if (isError) return <div>Failed to load</div>
  if (isLoading ) return <Spinner />

  return (
  <>
    <Desktop>
        <LoopmakerPageContainer>
        <PageContainer>
          {/* <div style={{position: "relative"}}>
                <div style={{position: "absolute", 
                        top: "0px", 
                        width: "100%", 
                    }}>
                    <Image style={{ objectFit: "cover", width: "100%", height: "40vh"}} fluid id="headerImg" src={headerSrc} alt={name}/>
                </div>
            </div> */}
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
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
                    canEdit={userProfile?.linkedLoopmaker?.username == username}
                />
            </div>
            <div style={{marginTop: "1rem"}}>
                <h3 style={{textAlign: "center"}}>Credits</h3>
                <HorizontalDivider />
                <div style={{marginTop: "2rem"}}>
                    <CreditsList credits={songs}/>
                </div>
            </div>
        </PageContainer>
        </LoopmakerPageContainer>
      </Desktop>
      <Mobile>
        <LoopmakerPageContainer>
        <MobilePageContainer>
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
                    canEdit={userProfile?.linkedLoopmaker?.username == username}
                />
            <div style={{marginTop: "2rem"}}>
                <h3 style={{textAlign: "center"}}>Credits</h3>
                <HorizontalDivider />
                <div style={{marginTop: "2rem"}}>
                    <CreditsList credits={songs}/>
                </div>
            </div>
        </MobilePageContainer>
        </LoopmakerPageContainer>
      </Mobile>
  </>)
};

export const getStaticProps = async (context: any) => {
    const slug = context.params.slug;
    const loopmaker = await getLoopmakerBySlug(slug)
    const songs = await API.get("LoopmakerApi", `/loopmaker/${loopmaker?.sys?.id}/credits`, {})


    return {
        props: {
            loopmaker,
            songs
        }
    }
}

export const getStaticPaths = async () => {
    const loopmakers = await getLoopmakers()

    const slugs = loopmakers.map((loopmaker: any) => loopmaker.slug);
    const paths = slugs.map((slug: any) => ({params: {slug: slug.toString()}}))

    return {
        paths,
        fallback: false
    }
}

export default Loopmaker;
