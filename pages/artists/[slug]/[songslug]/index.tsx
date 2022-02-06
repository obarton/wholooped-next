import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Tooltip from "@mui/material/Tooltip"
import YoutubeVideoPlayer from "../../../../components/MediaPlayers/YoutubeVideoPlayer"
import SoundCloudPlayer from "../../../../components/MediaPlayers/SoundCloudPlayer"
import { parseYoutubeIdFromUrl } from "../../../../utils/youtube"
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import LoopermanPlayer from "../../../../components/MediaPlayers/LoopermanPlayer"
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditIcon
} from 'react-share';
import TruncateMarkup from 'react-truncate-markup';
import { fancyTimeFormat } from "../../../../utils/timehelper"
import NextLink from "../../../../components/NextLink"
import { getArtistBySlug, getArtists, getArtistSongs } from "../../../../lib/contentfulApi"

const isBrowser = typeof window !== "undefined"

export const getBrowserWindowUrl = () => {
  if (!isBrowser) {
    return;
  }

  return window.location.href
}

const Song = (props: any) => {
    console.log(`Song page props ${JSON.stringify(props, null, 2)}`)
    // const [likeCount, setLikeCount] = useState(likesData || 0)
    // const loop = song.loop[0];

    // if(!loop.platformTrackId) {
    //   loop.platformTrackId = loop.platform?.trackId;
    // }

    return (
        <Container style={{ height: "100vh" }}>
        <div style={{textAlign: "center", marginTop: "2rem"}}>
          {/* <h1 style={{marginBottom: "0"}}>{song?.title}</h1> */}
          {/* <h2 style={{padding: "0", margin: "0"}}>{formatSongArtistLinksHtml(song?.artist)}</h2> */}
        </div>
        {/* <div style={{
            margin: 'auto',
            display: 'block',
            width: 'fit-content',
            verticalAlign: 'middle',
            paddingTop: "0.5rem"
          }}
          >
            <Tooltip title="Login to like this." arrow>
              <FavoriteBorder htmlColor="#666C7E"/>
            </Tooltip>
            <span style={{marginLeft: "0.4em"}}>{likeCount} like{likeCount == 1 ? "" : "s"}</span>
          </div>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1em"}}>
            <Stack direction="horizontal" gap={2}>
              <div><FacebookShareButton url={getBrowserWindowUrl() as string}><FacebookIcon size={32} round={true}/></FacebookShareButton></div>
              <div><TwitterShareButton url={getBrowserWindowUrl() as string}><TwitterIcon size={32} round={true}/></TwitterShareButton></div>
              <div><RedditShareButton url={getBrowserWindowUrl() as string}><RedditIcon size={32} round={true}/></RedditShareButton></div>
            </Stack>          
          </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Stack direction="horizontal" gap={5} style={{ padding: "2em", marginTop: "1em"}}>
          <div style={{height: "100%"}}>
            <YoutubeVideoPlayer videoId={parseYoutubeIdFromUrl(song?.url) as string} videoTitle={song?.title}/>
            <div style={{marginTop: "1em"}}>
              <Stack>
                <div style={{width: "300px", marginBottom: "1em"}}>
                  <p><b>Artist</b> <TruncateMarkup lines={3}><span>{formatSongArtistLinksHtml(song?.artist)}</span></TruncateMarkup></p>
                </div>
                <div style={{width: "300px", marginBottom: "1em"}}>
                  <p><b>Produced By</b> <TruncateMarkup lines={3}><span>{formatSongProducersHtml(song?.producer)}</span></TruncateMarkup></p>
                </div>
                <p><b>Album</b> {song?.album?.title}</p>
                <p><b>Source</b> {song?.platform?.name}</p>
              </Stack>
            </div>
          </div>
          <div style={{ height: "50%"}}>
            Contains a loop of
          </div>
          <div style={{height: "100%"}}>
          {
            loop?.platform && (loop?.platform?.name == "YouTube" ? <YoutubeVideoPlayer videoId={parseYoutubeIdFromUrl(loop?.url) as string} videoTitle={loop?.title}/>  : <></>)
          }
          {
            loop?.platform && (loop?.platform?.name == "SoundCloud" ? <SoundCloudPlayer trackId={loop?.platformTrackId}/>  : <></>)
          }
          {
            loop?.platform && (loop?.platform?.name == "Looperman" ? <LoopermanPlayer url={loop?.url}/> : <></>)
          }
            <div style={{marginTop: "1em"}}>
              <Stack>
                <p><b>Loop</b> {loop?.title}</p>
                <p><b>Appears at</b>  {fancyTimeFormat(song.loopStartTimeSeconds)}</p>
                <p><b>Source</b> {loop?.platform?.name}</p>
                <p><b>Created by</b> {loop?.loopmaker?.map((l: any) => l.name).join(", ")}</p>
                <p><b>Release</b> {formatLoopPackLinkHtml(loop)}</p>
              </Stack>
            </div>
          </div>
        </Stack>
        </div> */}
      </Container>
    )
}

const formatSongProducersHtml = (songProducerList: any) => {
    if (songProducerList) {
      return songProducerList.map((p: any, i: any) => {
        return (<span>{p.name}{i == songProducerList.length - 1 ? "": ", "}</span>)
      })
    }
  }
  
const formatSongArtistLinksHtml = (songArtistList: any) => {
  if (songArtistList) {
    return songArtistList.map((a: any, i: any) => {
      return (<NextLink href={`/artists/${a.slug}`}><span>{a.name}{i == songArtistList.length - 1 ? "": ", "}</span></NextLink>)
    })
  }
}

const formatLoopPackLinkHtml = (loop: any) => {
  if (loop) {
    const loopPackPath = `/looppacks/${loop?.loopmaker[0].slug}/${loop?.loopPack?.slug}`;
    return (<NextLink href={loopPackPath}>{loop?.loopPack?.title}</NextLink>)
  }
}

// export const getStaticProps = async (context: any) => {
//     const slug = context.params.slug;
//     const songSlug = context.params.songslug;
    
//     return {
//         props: {
//             slug,
//             songSlug
//         }
//     }
// }

// export const getStaticPaths = async () => {
//     const artists = await getArtists()
//     const artistIds = artists.map((artist: any) => artist?.sys?.id)
//     const songs = await getArtistsSongs(artistIds)

//     const slugs = artists.map((artist: any) => artist.slug);
//     const paths = slugs.map((slug: any) => ({params: {slug: slug.toString()}}))

//     return {
//         paths,
//         fallback: false
//     }
// }

export const getStaticProps = async (context: any) => {
    console.log(`getStaticProps context ${JSON.stringify(context, null, 2)}`)
    const slug = context.params.slug;
    const artist = await getArtistBySlug(slug)
    const songs = await getArtistSongs(artist?.sys?.id)
    
    return {
        props: {
            artist,
            songs
        }
    }
}

export const getStaticPaths = async () => {
    const paths: any[] = [];
    const artists = await getArtists()
    

    artists.forEach(async (artistResponse: any) => {
        const songs = await getArtistSongs(artistResponse?.sys?.id);

        songs?.forEach((song: any) => {
            song?.artistCollection?.items?.forEach((artist: any) => {
                paths.push({
                    params: {
                        slug: artist?.slug,
                        songslug: song?.slug,
                    }
                })     
            })
        })
    })

    await Promise.all(artists.map(async (a: any) => {
        await getArtistSongs(a?.sys?.id);
    }))


    console.log(`paths ${JSON.stringify(paths, null, 2)}`)

    return {
        paths,
        fallback: false
    }
}


export default Song;
