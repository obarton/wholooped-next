import React from 'react';
import { useRouter } from 'next/router';
import { getArtistBySlug, getArtists, getArtistSongs, getLoopmakerBySlug, getLoopmakers } from '../../../lib/contentfulApi';
import { Desktop, Mobile } from '../../../components/Responsive';
import PageContainer, { MobilePageContainer } from '../../../components/PageContainer';
import NextLink from '../../../components/NextLink';
import CreditsList from '../../../components/CreditsList';
import IndexPageAvatarHeader from '../../../components/IndexPageAvatarHeader';
import { resizeImageFromUrl } from '../../../helper/image';
import { API } from "aws-amplify"
import styled from "styled-components"
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { Avatar } from "@mui/material"

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
          <div style={{position: "relative"}}>
                <div style={{position: "absolute", 
                    top: "0px", 
                    width: "100%", 
                }}>
                    <Image style={{ objectFit: "cover", width: "100%", height: "40vh"}} fluid id="headerImg" src={headerSrc} alt={name}/>
                </div>
            </div>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-4">
                    <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                        <Avatar src={avatarSrc} alt={name} sx={{ width: 100, height: 100 }}/>
                    <span className="name mt-3" style={{fontWeight: "700", fontSize: "1.5rem"}}><b>{name}</b></span> <span className="idd" style={{fontWeight: "600", fontSize: "1rem"}}><b>@{username}</b></span>
                        <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
                            <span className="idd1"><a href={websiteUrl}>{websiteUrl}</a></span> <span><i className="fa fa-copy"></i></span> 
                        </div>
                        <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
                            <span className="number" style={{fontSize: "1.5rem", fontWeight: "bold"}}>{songs?.length} <span className="follow" style={{fontSize: "12px", fontWeight: "500", color: "#444444"}}>Credits</span></span> 
                        </div>
                        {/* {
                          isLoopmakerLinkedToLoggedInUser && (
                            <div className=" d-flex mt-2">
                             <EditProfileButton className="btn-dark" onClick={() => navigate(`/app/profile/loopmaker/edit`)}>Edit Profile</EditProfileButton> 
                            </div>
                          )
                        } */}

                        <div className="text mt-3"> <span>{bio?.split('\n').map((i: any, key: any) => <p key={key}>{i}</p>)}</span> </div>
                        <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">{twitterUrl && <span><a href={twitterUrl} style={{color: "black"}}><FontAwesomeIcon size="lg" icon={faTwitter} /></a></span>}{facebookUrl && <span><a href={facebookUrl} style={{color: "black"}}><FontAwesomeIcon size="lg" icon={faFacebook} /></a></span>}{instagramUrl && <span><a href={instagramUrl} style={{color: "black"}}><FontAwesomeIcon size="lg" icon={faInstagram} /></a></span>} <span></span> </div> 
                        {/* <div className=" px-2 rounded mt-4 date "> <span className="join">Joined {moment(dateJoined).format("MMM YYYY")}</span> </div> */}
                    </div>
                </div>
            </div>
          <CreditsList credits={songs}/>
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
