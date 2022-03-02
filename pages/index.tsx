import Head from 'next/head'
import Image from 'next/image';
import router from 'next/router';
import { Row, Col, Container, Stack, Button, Image as BootstrapImage } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import styled from 'styled-components';
import AlbumCard from '../components/AlbumCard';
import NextLink from '../components/NextLink';
import Layout from '../components/Layout';
import { Desktop, Mobile } from '../components/Responsive';
import { responsive } from '../helper/carousel';
import { getFeaturedLoopPacks, getFeaturedSongs } from '../lib/contentfulApi';
import 'react-multi-carousel/lib/styles.css';
import { resizeImageFromUrl } from '../helper/image';
import { Site } from '../utils/page';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import HorizontalDivider from '../components/HorizontalDivider';
import { Color } from '../types/Color';

const StyledLandingText = styled.h1`
  font-size: 3.5em;
  display: block;
`

const fadeImages = [
  {
    url: "https://images.ctfassets.net/vwlltmjzgrb5/1LTavRNkjzLIO7dzXvXIGA/9e28aaefa4d6a9665d5e80001e4571e6/Screwed_Soul_Cover_2048x.png?w=400&h=400&q=100&fm=webp",
  },
  {
    url: "https://images.ctfassets.net/vwlltmjzgrb5/50h9NnH1UeH8cunIIG5bkN/dd4678bc8a3ff404530183b2096c9814/Kingsway_Music_Library_-_Coop_The_Truth_Sample_Pack_1024x1024.jpg?w=400&h=400&q=100&fm=webp",
  },
  {
    url: "https://images.ctfassets.net/vwlltmjzgrb5/3ECLr2WC4aLCqmzXhVaBQM/757ddf167efe601ff9735d801e548f0c/VV_sr2_900x.jpg?w=400&h=400&q=100&fm=webp",
  },
  {
    url: "https://images.ctfassets.net/vwlltmjzgrb5/1sEGczV8ALvBDhDhV0QZhG/5bab05757b037d18f5c77b5e17e22f0b/1534525738.jpg?w=400&h=400&q=100&fm=webp"
  }
];
const Home = ({ songs, loopPacks }: any) => {
  const landingText = "Discover loops and sound packs used in today's songs.";

  return (
    <Layout title={Site.Description}>
     <section>
      <Desktop>
          <Container fluid style={{paddingBottom: "4rem"}}>
            <Row >
              <Col xs={6} md={6}>
                  <Row>
                    <Col>
                      <div style={{paddingLeft: "25%", paddingRight: "5%", paddingBottom: "15%", paddingTop: "15%"}}>
                        <StyledLandingText><b>{landingText}</b></StyledLandingText>
                        <div style={{textAlign: "center", marginTop: "2rem"}}>
                          <Button size="lg" onClick={(e) => router.push(`/app/dashboard`)}>Browse</Button>
                        </div> 
                      </div> 
                    </Col>
                  </Row>
              </Col>
              <Col xs={6} md={6}>
              <Row>
                <Col>
                  <Fade arrows={false} style={{padding: "0", margin: "0"}}> 
                      {fadeImages.map((fadeImage, index) => {
                        return (
                            <div key={index}>
                              <NextLink href={`/app`}>
                                <BootstrapImage style={{maxWidth:"100%",maxHeight:"100%", padding: "10%"}} src={fadeImage.url} alt={"Who Looped"}/>
                              </NextLink> 
                            </div>
                          )
                        })
                      }  
                    </Fade> 
                </Col> 
                </Row>
              </Col>
            </Row>
            <Row>
                  <Col>
                  <div style={{paddingTop: "2rem", paddingBottom: "2rem", justifyContent: "center"}}>
                  <HorizontalDivider />
                  </div>
                  </Col>
                </Row>
            <Row>
            <div style={{paddingLeft: "5%", paddingRight: "5%"}}>
            <div style={{marginTop: "3rem", marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Tracks</h2>
                  <p style={{fontSize: "1.5rem", color: Color.SECONDARY_TEXT}}>Browse and save loops used in industry tracks across all genres.</p>
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
                                   <AlbumCard url={`/artists/${song.artistCollection?.items[0].slug}/${song.slug}`} key={i}  title={primaryText} secondaryText={secondaryText} imageSrc={image} altText={altText}/>
                               )
                           })}
                       </Carousel>
                     <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse tracks</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Loopmakers & Composers</h2>
                  <p style={{fontSize: "1.5rem", color: Color.SECONDARY_TEXT}}>Discover and connect with your favorite loopmakers, composers, and music libraries.</p>
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
                                  <AlbumCard key={loopPack.title} url={`/loopmakers/${loopPack.loopmakerCollection?.items[0].slug}/packs/${loopPack.slug}`} title={primaryText} secondaryText={secondaryText} imageSrc={image} altText={altText}/>
                              )
                          })}
                      </Carousel>
                    <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse loopmakers</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Database</h2>
                  <p style={{fontSize: "1.5rem", color: Color.SECONDARY_TEXT}}>Contribute to our community-driven database of loops and sample libraries and help credit the loop makers in today&apos;s music industry.</p>
                  <Button size="lg" onClick={(e) => router.push(`/app`)}>Add a song</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Community</h2>
                  <p style={{fontSize: "1.5rem", color: Color.SECONDARY_TEXT}}>Share and discuss music production and composition resources and techniques with our community.</p>
                  <Button size="lg" onClick={(e) => router.push(`https://community.wholooped.com`)}>Join our community</Button>        
                </div>
                </div>
                </Row>
          </Container>
      </Desktop>
      <Mobile>
          <Container fluid style={{padding: "2.5%"}}>
            {/* <BootstrapImage style={{maxWidth:"85%",maxHeight:"85%", padding: "10%" }} src={landingImageSrc} alt={"Who Looped"}/> */}
            <Row>
              <Col>
                <Fade arrows={false} style={{padding: "0", margin: "0"}}> 
                          {fadeImages.map((fadeImage, index) => {
                            return (
                                <div key={index} >
                                  <NextLink href={`/app`}>
                                    <BootstrapImage style={{maxWidth:"100%",maxHeight:"100%", padding: "10%"}} src={fadeImage.url} alt={"Who Looped"}/>
                                  </NextLink> 
                                </div>
                              )
                            })
                          }  
                </Fade> 
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{textAlign: "center"}}>
                  <h1><b>{landingText}</b></h1>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{textAlign: "center"}}>
                  <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse</Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div style={{paddingTop: "2rem", paddingBottom: "2rem"}}>
              <HorizontalDivider />
              </div>
              </Col>
            </Row>
            <Row>
            <div style={{ marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Tracks</h2>
                  <p style={{fontSize: "1.5rem", color: Color.SECONDARY_TEXT}}>Browse and save loops used in industry tracks across all genres.</p>
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
                                <AlbumCard key={i} url={`/artists/${song.artistCollection?.items[0].slug}/${song.slug}`} title={primaryText} secondaryText={secondaryText} imageSrc={image} altText={altText}/>
                               )
                           })}
                      </Carousel>
                    <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse tracks</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Loopmakers & Composers</h2>
                  <p style={{fontSize: "1.5rem", color: Color.SECONDARY_TEXT}}>Discover and connect with your favorite loopmakers, composers, and music libraries.</p>
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
                                  <AlbumCard key={i} url={`/loopmakers/${loopPack.loopmakerCollection?.items[0].slug}/packs/${loopPack.slug}`} title={primaryText} secondaryText={secondaryText} imageSrc={image} altText={altText}/>
                              )
                          })}
                      </Carousel>
                    <Button size="lg" onClick={(e) => router.push(`/app`)}>Browse loopmakers</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Database</h2>
                  <p style={{fontSize: "1.5rem", color: Color.SECONDARY_TEXT}}>Contribute to our community-driven database of loops and sample libraries and help credit the loop makers in today&apos;s music industry.</p>
                  <Button size="lg" onClick={(e) => router.push(`/add-a-song`)}>Add a song</Button>
                </div>
                <div style={{marginBottom: "3rem", textAlign: "center"}}>
                  <h2>Community</h2>
                  <p style={{fontSize: "1.5rem", color: Color.SECONDARY_TEXT}}>Share and discuss music production and composition resources and techniques with our community.</p>
                  <Button size="lg" onClick={(e) => router.push(`https://community.wholooped.com`)}>Join our community</Button>        
                </div>
                </Row>
          </Container>
      </Mobile>
    </section>
    </Layout>
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