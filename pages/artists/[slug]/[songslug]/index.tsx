import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { Stack } from "react-bootstrap";
import NextLink from "../../../../components/NextLink";
import PageContainer, { MobilePageContainer } from "../../../../components/PageContainer";
import { Desktop, Mobile } from "../../../../components/Responsive";
import { useSong } from "../../../../hooks/useContent";
import SongPageHeader from "../../../../components/SongPageHeader";
import SocialShare from "../../../../components/SocialShare";
import MediaPlayer from "../../../../components/MediaPlayers/MediaPlayer";
import LoopDetails from "../../../../components/LoopDetails";
import SongDetails from "../../../../components/SongDetails";
import Spinner from "../../../../components/Spinner"
import InlineAvatar from "../../../../components/InlineAvatar"
import styled from "styled-components";
import SongLikes from "../../../../components/SongLikes";
import { useSongLike } from "../../../../hooks/useSongLike";
import { useUser } from "@auth0/nextjs-auth0";
import Layout from "../../../../components/Layout";
import HorizontalDivider from "../../../../components/HorizontalDivider";

const SongContentContainer = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
`

const MediaPlayerContainer = styled.div`
  height: 100%;
  width: 100%;
`

const Song = () => {
  const router = useRouter()
  const [loop, setLoop] = useState({});
  const {slug, songslug} = router.query
  const artistSlug = slug as string;
  const songSlug = songslug as string;
  
  const { song, isLoading, isError} = useSong(artistSlug, songSlug)
  const userResponse = useUser();

  const itemId = `${song?.id}:${song?.loop[0].id}`;
  const likeResponse = useSongLike(userResponse.user?.sub as string, itemId)

  useEffect(() => {
    if(song && !loop) {
      setLoop(song.loop[0])
    }

  }, [song, loop])

  if (isError) { 
    return (
        <Layout>
        <div>Failed to load</div>
        </Layout>
    )
}

if (isLoading || userResponse.isLoading || likeResponse.isLoading) { 
    return (
        <Layout>
            <Spinner />
        </Layout>
    )
}

    return (
      <Layout title={song?.title}>
        <Desktop>
          <div>
          <PageContainer>
            <SongPageHeader title={song?.title} artist={formatSongArtistLinksHtml(song?.artist)}/>
              <SongLikes user={userResponse.user} song={song} isSongLiked={likeResponse.isLiked}/>
              <SocialShare />
              <SongContentContainer>
                <Stack direction="horizontal" gap={5} style={{ padding: "2em" }}>
                    <MediaPlayerContainer>
                      <MediaPlayer platform={song?.platform?.name} mediaUrl={song?.url} title={song?.title} mediaId={song?.platformTrackId}/>
                      <SongDetails song={song}/>
                      <HorizontalDivider />
                      <div style={{marginTop: "1rem"}}>
                        <Stack direction="horizontal" gap={1}>
                            <div>
                              <p style={{padding: "0", margin: "0"}}><b>Uploaded By</b></p>
                            </div>
                            <div>
                              <InlineAvatar text={song?.primaryContributor?.displayName} redirectUrl={`/users/${song?.primaryContributor?.slug}`} thumbnailUrl={song?.primaryContributor?.photo?.url}/>
                            </div>
                        </Stack>
                      </div>
                  </MediaPlayerContainer>
                  <div style={{ height: "70%"}}>
                    Contains a loop of
                  </div>
                  <MediaPlayerContainer>
                    <MediaPlayer platform={song?.loop[0]?.platform?.name} mediaUrl={song?.loop[0]?.url} title={song?.loop[0]?.title} mediaId={song?.loop[0]?.platform?.trackId}/>
                    <LoopDetails loop={song?.loop[0]} startTimeSeconds={song?.loopStartTimeSeconds}/>
                  </MediaPlayerContainer>
                </Stack>
              </SongContentContainer>
              
          </PageContainer>
          </div>
        </Desktop>
        <Mobile>
          <MobilePageContainer>
              <SongPageHeader title={song?.title} artist={formatSongArtistLinksHtml(song?.artist)}/>
                <SongLikes user={userResponse.user} song={song} isSongLiked={likeResponse.isLiked}/>
                  <SocialShare />
                  {/* <HorizontalDivider />
                      <div style={{marginTop: "1rem"}}>
                        <Stack direction="horizontal" gap={1}>
                            <div>
                              <p style={{padding: "0", margin: "0"}}><b>Uploaded By</b></p>
                            </div>
                            <div>
                              <InlineAvatar text={song?.primaryContributor?.displayName} redirectUrl={`/users/${song?.primaryContributor?.slug}`} thumbnailUrl={song?.primaryContributor?.photo?.url}/>
                            </div>
                        </Stack>
                      </div> */}
              <SongContentContainer>
                <Stack gap={5} style={{ padding: "2em" }}>
                    <MediaPlayerContainer>
                      <MediaPlayer platform={song?.platform?.name} mediaUrl={song?.url} title={song?.title} mediaId={song?.platformTrackId}/>
                      <SongDetails song={song}/>
                  </MediaPlayerContainer>
                  <div style={{ textAlign: "center"}}>
                    Contains a loop of
                  </div>
                  <MediaPlayerContainer>
                    <MediaPlayer platform={song?.loop[0]?.platform?.name} mediaUrl={song?.loop[0]?.url} title={song?.loop[0]?.title} mediaId={song?.loop[0]?.platform?.trackId}/>
                    <LoopDetails loop={song?.loop[0]} startTimeSeconds={song?.loopStartTimeSeconds}/>
                  </MediaPlayerContainer>
                </Stack>
              </SongContentContainer>
          </MobilePageContainer>
        </Mobile>
      </Layout>
    )
}

const formatSongArtistLinksHtml = (songArtistList: any) => {
  if (songArtistList) {
    return songArtistList.map((a: any, i: any) => {
      return (<NextLink key={i} href={`/artists/${a.slug}`}><span>{a.name}{i == songArtistList.length - 1 ? "": ", "}</span></NextLink>)
    })
  }
}

export default Song;
