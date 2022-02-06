import React from 'react';
import { Stack } from 'react-bootstrap';
//import Pagination from './Pagination';
import { resizeImageFromUrl } from '../../helper/image';
import NextLink from '../NextLink';
import HorizontalDivider from '../HorizontalDivider';
import Artwork from '../Artwork';

interface SongListProps {
  songs: any;
  //currentPage: string;
  //totalPages: string;
}

//TODO: Add pagination
const SongList = ({ songs }: SongListProps) => {
    // const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
    // const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
      <>
        <div>
            {songs.map((song: any, index: number) => {
                    const imageSrc = resizeImageFromUrl(song?.album?.artwork?.url);
                    const altText = song?.title;    
                    const { title, slug, artistCollection } = song;
                    const artists = artistCollection?.items;
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
        {/* <HorizontalDivider /> */}
        {/* <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            nextDisabled={nextDisabled}
            prevDisabled={prevDisabled}
        /> */}
    </>
  );
};

export default SongList;
