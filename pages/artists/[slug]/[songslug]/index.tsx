import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { Col, Container, Row, Stack } from "react-bootstrap";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SongContentContainer = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
`

const MediaPlayerContainer = styled.div`
  height: 100%;
  width: 100%;
`

const NavigationContainer = styled.div({
  height: "100%", 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center"
})

const ArrowContainer = styled.div({textAlign: "center"})

const Song = () => {
  const router = useRouter()
  const [loop, setLoop] = useState({});
  const {slug, songslug} = router.query
  const artistSlug = slug as string;
  const songSlug = songslug as string;
  
  const { song, nextSong, lastSong, isLoading, isError} = useSong(artistSlug, songSlug)
  const userResponse = useUser();

  useEffect(() => {
    console.log(`nextSong ${JSON.stringify(nextSong, null, 2)}`)
  }, [nextSong])
  
  useEffect(() => {
    console.log(`lastSong ${JSON.stringify(lastSong, null, 2)}`)
  }, [lastSong])

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
          <Container style={{paddingBottom: "3rem"}}>
            <Row>
              <Col>
                <NavigationContainer>
                  <Container fluid>
                  <Row>
                    <Col>
                    {lastSong && (
                      <p>Previous Song</p>
                    )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ArrowContainer>
                        {lastSong && (
                          <NextLink href={`/artists/${lastSong?.artist[0].slug}/${lastSong?.slug}`}>
                            <FontAwesomeIcon icon={faArrowLeft} size="3x"/>
                          </NextLink>
                        )}
                      </ArrowContainer>
                    </Col>
                  </Row>
                  </Container>
                </NavigationContainer>
              </Col>
              <Col md={8}>
                <Row>
                  <SongPageHeader title={song?.title} artist={formatSongArtistLinksHtml(song?.artist)}/>
                  <SongLikes user={userResponse.user} song={song} isSongLiked={likeResponse.isLiked}/>
                  <SocialShare />
                </Row>
              </Col>
              <Col>
              <NavigationContainer>
                  <Container fluid>
                  <Row>
                    <Col>
                    {nextSong && (
                      <p>Next Song</p>
                    )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ArrowContainer>
                      {nextSong && (
                        <NextLink href={`/artists/${nextSong?.artist[0].slug}/${nextSong?.slug}`}>
                          <FontAwesomeIcon icon={faArrowRight} size="3x"/>
                        </NextLink>
                      )}
                      </ArrowContainer>
                    </Col>
                  </Row>
                  </Container>
                </NavigationContainer>
              </Col>
            </Row>
            <Container style={{paddingRight: "10%", paddingLeft: "10%", marginTop: "2rem"}}>
            <Row>
              <Col md={5}>
                <Row>
                  <Col>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <div>
                        <div style={{display: "flex", justifyContent: "center"}}>
                        <MediaPlayer platform={song?.platform?.name} mediaUrl={song?.url} title={song?.title} mediaId={song?.platformTrackId}/>
                        </div>
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
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={2} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <div>
                    <p style={{textAlign: "center"}}>Contains a loop of</p>
                  </div>
              </Col>
              <Col md={5}>
                <Row>
                  <Col>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <div>
                        <div style={{display: "flex", justifyContent: "center"}}>
                          <MediaPlayer platform={song?.loop[0]?.platform?.name} mediaUrl={song?.loop[0]?.url} title={song?.loop[0]?.title} mediaId={song?.loop[0]?.platform?.trackId}/>
                        </div>
                      <LoopDetails loop={song?.loop[0]} startTimeSeconds={song?.loopStartTimeSeconds}/>
                    </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
              </Container>
            </Container>
        </Desktop>
        <Mobile>
          <MobilePageContainer>
            <Container>
              <Row>
              <Col style={{padding: "0"}}>
                      <NavigationContainer >
                  <Container fluid style={{padding: "0", textAlign: "center"}}>
                  <Row>
                    <Col>
                    {lastSong && (
                      <p>Previous</p>
                    )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ArrowContainer>
                        {lastSong && (
                          <NextLink href={`/artists/${lastSong?.artist[0].slug}/${lastSong?.slug}`}>
                            <FontAwesomeIcon icon={faArrowLeft} size="2x"/>
                          </NextLink>
                        )}
                      </ArrowContainer>
                    </Col>
                  </Row>
                  </Container>
                </NavigationContainer>
                </Col>
                <Col xs={8}>
                  <div style={{display: "flex", justifyContent: "center", paddingLeft: "0.5rem", paddingRight: "0.5rem"}}>
                    <div>
                <SongPageHeader title={song?.title} artist={formatSongArtistLinksHtml(song?.artist)}/>
                <SongLikes user={userResponse.user} song={song} isSongLiked={likeResponse.isLiked}/>
                  <SocialShare />
                  <HorizontalDivider />
                      <div style={{marginTop: "1rem", textAlign: "center"}}>
                        <Stack gap={1}>
                            <div>
                              <p style={{padding: "0", margin: "0"}}><b>Uploaded By</b></p>
                            </div>
                            <div style={{display: "flex", justifyContent: "center"}}>
                              <InlineAvatar text={song?.primaryContributor?.displayName} redirectUrl={`/users/${song?.primaryContributor?.slug}`} thumbnailUrl={song?.primaryContributor?.photo?.url}/>
                            </div>
                        </Stack>
                      </div>
                      </div>
                      </div>
                      </Col>
                      <Col style={{padding: "0"}}>
                      <NavigationContainer>
                  <Container fluid style={{padding: "0", textAlign: "center"}}>
                  <Row>
                    <Col>
                    {nextSong && (
                      <p>Next</p>
                    )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ArrowContainer>
                      {nextSong && (
                        <NextLink href={`/artists/${nextSong?.artist[0].slug}/${nextSong?.slug}`}>
                          <FontAwesomeIcon icon={faArrowRight} size="2x"/>
                        </NextLink>
                      )}
                      </ArrowContainer>
                    </Col>
                  </Row>
                  </Container>
                </NavigationContainer>
                      </Col>
                  </Row>
                </Container>
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
