import React from 'react';
import { Stack } from 'react-bootstrap';
import TruncateMarkup from 'react-truncate-markup';
import NextLink from './NextLink';

interface SongDetailsProps {
    song: any;
}

const SongDetails = ({ song }: SongDetailsProps) => {
  return (
    <div style={{marginTop: "1em"}}>
    <Stack>
      <p><b>Artist</b> <TruncateMarkup lines={3}><span>{formatSongArtistLinksHtml(song?.artist)}</span></TruncateMarkup></p>
      <p><b>Produced By</b> <TruncateMarkup lines={3}><span>{formatSongProducersHtml(song?.producer)}</span></TruncateMarkup></p>
      <p><b>Album</b> {song?.album?.title}</p>
      <p><b>Source</b> {song?.platform?.name}</p>
    </Stack>
  </div>
  );
};

const formatSongProducersHtml = (songProducerList: any) => {
    if (songProducerList) {
      return songProducerList.map((p: any, i: any) => {
        return (<span key={i}>{p.name}{i == songProducerList.length - 1 ? "": ", "}</span>)
      })
    }
  }
  
  const formatSongArtistLinksHtml = (songArtistList: any) => {
  if (songArtistList) {
    return songArtistList.map((a: any, i: any) => {
      return (<NextLink href={`/artists/${a.slug}`} key={i}><span>{a.name}{i == songArtistList.length - 1 ? "": ", "}</span></NextLink>)
    })
  }
  }
    

export default SongDetails;
