import Head from 'next/head'
import Image from 'next/image';
import router from 'next/router';
import { Row, Col, Container, Stack, Button, Image as BootstrapImage } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import styled from 'styled-components';
import AlbumCard from '../components/AlbumCard';
import NextLink from '../components/NextLink';
import { Desktop, Mobile } from '../components/Responsive';
import { responsive } from '../helper/carousel';
import { getFeaturedLoopPacks, getFeaturedSongs } from '../lib/contentfulApi';
import 'react-multi-carousel/lib/styles.css';
import { resizeImageFromUrl } from '../helper/image';

const StyledLandingText = styled.h1`
  font-size: 4em;
  display: block;
`
const Home = ({ songs, loopPacks }: any) => {
  const landingText = "Discover loops and sound packs used in today's songs.";
  const landingImageSrc = "https://images.ctfassets.net/vwlltmjzgrb5/1LTavRNkjzLIO7dzXvXIGA/9e28aaefa4d6a9665d5e80001e4571e6/Screwed_Soul_Cover_2048x.png?w=600&h=600&q=50&fm=webp";

  return (
    <div>
     <Head>
       <title>Who Looped</title>
       <meta name='keywords' content='Discover loops and soundpacks used in todays songs'/>
     </Head>
     <section>
      <Desktop>
          <Container fluid>
            <Row style={{height: "80vh"}}>
              <Col xs={6} md={6} style={{height: "100%", display: "flex", justifyContent: "flex-end"}}>
                <div style={{height: "100%", width: "70%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <Stack style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div style={{"maxWidth": "430px"}}>
                          <StyledLandingText><b>{landingText}</b></StyledLandingText>
                        </div>
                        <div style={{padding: "2em"}}>
                        {/* <Button type="button" className="vrlps-trigger">Request Invite</Button> */}
                            <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse</Button>
                        </div>
                      </Stack>
                </div>         
              </Col>
              <Col xs={6} md={6} style={{height: "100%"}}>
                <div style={{height: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                      <BootstrapImage style={{maxWidth:"100%",maxHeight:"100%", padding: "10%"}} src={landingImageSrc} alt={"Who Looped"}/>
                </div>         
              </Col>
            </Row>
            <div style={{paddingLeft: "5%", paddingRight: "5%"}}>
            <div style={{marginTop: "3rem", marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Tracks</h2>
                  <p style={{fontSize: "1.5rem"}}>Browse and save loops used in industry tracks across all genres.</p>
                    <Carousel
                       responsive={responsive} 
                       infinite={true}
                       removeArrowOnDeviceType={["tablet", "mobile"]} >
                           {songs?.map((song: any, i: number) => {
                               const image = resizeImageFromUrl(song.album?.artwork?.url, "l")
                               const altText = song.title;
                               const secondaryText = song.artistCollection?.items?.map((a: any) => a.name).join(", ");
                               const primaryText = song.title;
                                      
                               return (
                                 <NextLink key={i}  style={{color: "black"}} href={"/app"}>
                                   <AlbumCard title={primaryText} secondaryText={secondaryText} imageSrc={image} altText={altText}/>
                                 </NextLink>
                               )
                           })}
                       </Carousel>
                     <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse tracks</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Loopmakers & Composers</h2>
                  <p style={{fontSize: "1.5rem"}}>Discover and connect with your favorite loopmakers, composers, and music libraries.</p>
                  <Carousel
                      responsive={responsive} 
                      infinite={true}
                      removeArrowOnDeviceType={["tablet", "mobile"]} >
                          {loopPacks?.map((loopPack: any, i: number) => {
                              const image = resizeImageFromUrl(loopPack.artwork?.url, "l")
                              const altText = loopPack.title;
                              const secondaryText = loopPack.loopmakerCollection?.items?.map((a: any) => a.name).join(", ");
                              const primaryText = loopPack.title;
                                      
                              return (
                                <NextLink key={i}  style={{color: "black"}} href={"/app"}>
                                  <AlbumCard title={primaryText} secondaryText={secondaryText} imageSrc={image} altText={altText}/>
                                </NextLink>
                              )
                          })}
                      </Carousel>
                    <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse loopmakers</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Database</h2>
                  <p style={{fontSize: "1.5rem"}}>Contribute to our community-driven database of loops and sample libraries and help credit the loop makers in today&apos;s music industry.</p>
                  <Button size="lg" onClick={(e) => router.push(`/app/add-a-song`)}>Add a song</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Community</h2>
                  <p style={{fontSize: "1.5rem"}}>Share and discuss music production and composition resources and techniques with our community.</p>
                  <Button size="lg" onClick={(e) => router.push(`https://community.wholooped.com`)}>Join our community</Button>        
                </div>
                </div>
          </Container>
      </Desktop>
      <Mobile>
          <Container fluid style={{padding: "2.5%"}}>
            <Stack gap={3} style={{marginTop: "1rem"}}>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <BootstrapImage style={{maxWidth:"85%",maxHeight:"85%", padding: "10%" }} src={landingImageSrc} alt={"Who Looped"}/>
              </div>
              <div style={{textAlign: "center"}}>
                <h1><b>{landingText}</b></h1>
              </div>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse</Button>
              </div>        
            </Stack>
            <div style={{marginTop: "3rem", marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Tracks</h2>
                  <p style={{fontSize: "1.5rem"}}>Browse and save loops used in industry tracks across all genres.</p>
                    <Carousel
                      responsive={responsive} 
                      infinite={true}
                      removeArrowOnDeviceType={["tablet", "mobile"]} >
                           {songs?.map((song: any, i: number) => {
                               const image = resizeImageFromUrl(song.album?.artwork?.url, "m")
                               const altText = song.title;
                               const secondaryText = song.artistCollection?.items?.map((a: any) => a.name).join(", ");
                               const primaryText = song.title;
                                      
                               return (
                                 <NextLink key={i}  style={{color: "black"}} href={"/app"}>
                                   <AlbumCard title={primaryText} secondaryText={secondaryText} imageSrc={image} altText={altText}/>
                                 </NextLink>
                               )
                           })}
                      </Carousel>
                    <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse tracks</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Loopmakers & Composers</h2>
                  <p style={{fontSize: "1.5rem"}}>Discover and connect with your favorite loopmakers, composers, and music libraries.</p>
                  <Carousel
                      responsive={responsive} 
                      infinite={true}
                      removeArrowOnDeviceType={["tablet", "mobile"]} >
                          {loopPacks?.map((loopPack: any, i: number) => {
                              const image = resizeImageFromUrl(loopPack.artwork?.url, "m")
                              const altText = loopPack.title;
                              const secondaryText = loopPack.loopmakerCollection?.items?.map((a: any) => a.name).join(", ");
                              const primaryText = loopPack.title;
                                      
                              return (
                                <NextLink key={i}  style={{color: "black"}} href={"/app"}>
                                  <AlbumCard title={primaryText} secondaryText={secondaryText} imageSrc={image} altText={altText}/>
                                </NextLink>
                              )
                          })}
                      </Carousel>
                    <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse loopmakers</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Database</h2>
                  <p style={{fontSize: "1.5rem"}}>Contribute to our community-driven database of loops and sample libraries and help credit the loop makers in today&apos;s music industry.</p>
                  <Button size="lg" onClick={(e) => router.push(`/app/add-a-song`)}>Add a song</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Community</h2>
                  <p style={{fontSize: "1.5rem"}}>Share and discuss music production and composition resources and techniques with our community.</p>
                  <Button size="lg" onClick={(e) => router.push(`https://community.wholooped.com`)}>Join our community</Button>        
                </div>
          </Container>
      </Mobile>
    </section>
    </div>
  )
}

export const getStaticProps = async (context: any) => {
  const songs = await getFeaturedSongs();
  const loopPacks = await getFeaturedLoopPacks();
  
  return {
      props: {
          songs,
          loopPacks
      }
  }
}


export default Home