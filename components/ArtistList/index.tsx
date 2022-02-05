import React from 'react';
import { Stack } from 'react-bootstrap';
import Link from "next/link"
import Pagination from './Pagination';

const ArtistList = ({ artists, currentPage, totalPages }: any) => {

    const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
    const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
      <>
  <div>
    {artists.map((artist: any, index: number) => {
            // const image = getImage(artist.photo)
            const altText = artist.photo?.title;   
            const { slug } = artist;

            return (
                <div style={{padding: "1em"}} key={index}>
                    <Stack direction="horizontal" gap={1}>
                        <div style={{ paddingRight: "0.5em"}}>
                            {/* <GatsbyImage image={image} alt={altText} style={{borderRadius: "50%"}}/> */}
                        </div>
                        <div>
                        <Link href={`/artists/${slug}`}>
                                {artist.name}
                        </Link>
                        </div>
                    </Stack>
                </div>
                )
            })}
    </div>
    <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      /></>
  );
};

export default ArtistList;
