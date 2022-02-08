import React from 'react';
import { Stack } from 'react-bootstrap';
//import Pagination from './Pagination';
import { resizeImageFromUrl } from '../../helper/image';
import NextLink from '../NextLink';
import HorizontalDivider from '../HorizontalDivider';
import Artwork from '../Artwork';

interface SongListProps {
  songs: any;
}

//TODO: Add pagination
const SongList = ({ songs }: SongListProps) => {
  return (
      <>
        <div>
            {songs.map((song: any, index: number) => {
                    const imageSrc = resizeImageFromUrl(song?.album?.artwork?.url);
                    const altText = song?.title;    
                    const { title, slug, artist } = song;
                    const artists = artist;
                    const redirectUrl = `/artists/${artists[0]?.slug}/${slug}`

                    return (
                        <div style={{padding: "1em"}} key={index}>
                            <Stack direction="horizontal" gap={1}>
                                <div style={{ paddingRight: "0.5em"}}>
                                    <NextLink href={redirectUrl}>
                                      <Artwork src={imageSrc} alt={altText}/>
                                    </NextLink>
                                </div>
                                <div>
                                <NextLink href={redirectUrl}>
                                <p style={{margin: "0"}}>
                                  {title}
                                </p>
                                    {artists?.map((l: any, index: number) => {
                                      if(index == 0) {
                                        return <span key={l.name} style={{color: "#666C7E"}}>{l.name}</span>
                                      }

                                        return <span key={l.name} style={{color: "#666C7E"}}>, {l.name}</span>
                                    })}
                                </NextLink>
                                </div>
                            </Stack>
                        </div>
                        )
                    })}
        </div>
    </>
  );
};

export default SongList;
