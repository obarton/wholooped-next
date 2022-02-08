import React from 'react';
import { Desktop, Mobile } from '../../../components/Responsive';
import PageContainer, { MobilePageContainer } from '../../../components/PageContainer';
import NextLink from '../../../components/NextLink';
import CreditsList from '../../../components/CreditsList';
import IndexPageAvatarHeader from '../../../components/IndexPageAvatarHeader';
import { resizeImageFromUrl } from '../../../helper/image';
import { API } from "aws-amplify"
import styled from "styled-components"
import LoopmakerProfileCard from '../../../components/LoopmakerProfileCard';
import HorizontalDivider from '../../../components/HorizontalDivider';

interface LoopmakerPageProps {
    loopmaker: any;
    songs: any;
}

const EditProfileButton = styled.button`
    height: 40px;
    width: 150px;
    border: none;
    background-color: #000;
    color: white;
    font-size: 15px
`

const resizeHeaderImageFromUrl = (url: string) => {
    return url ? `${url}?w=390&h=200&fm=png&q=100` : ""
}

const Loopmaker = ({ loopmaker, songs }: LoopmakerPageProps) => {
  const {name, username, bio, websiteUrl, twitterUrl, facebookUrl, instagramUrl} = loopmaker;
  const avatarSrc = resizeImageFromUrl(loopmaker?.profilePhoto?.url)
  const headerSrc = resizeHeaderImageFromUrl(loopmaker?.headerPhoto?.url)

  return (
  <>
    <Desktop>
        <PageContainer>
        <NextLink href="/app">Go Back </NextLink>
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
      </Desktop>
      <Mobile>
        <MobilePageContainer>
        <NextLink href="/app">Go Back </NextLink>
          <IndexPageAvatarHeader title={loopmaker?.name} avatarSrc={avatarSrc} />
          <CreditsList credits={songs}/>
        </MobilePageContainer>
      </Mobile>
  </>)
};

export const getStaticProps = async (context: any) => {
    const slug = context.params.slug;
    const loopmaker = await getLoopmakerBySlug(slug)
    const songs = await API.get("LoopmakerApi", `/loopmaker/${loopmaker?.sys?.id}/credits`, {})
    
    console.log(`getStaticProps songs[0] ${JSON.stringify(songs[0], null, 2)}`)

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
