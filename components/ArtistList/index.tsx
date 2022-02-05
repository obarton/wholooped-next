import React from 'react';
import { Stack } from 'react-bootstrap';
import Pagination from './Pagination';
import { resizeImageFromUrl } from '../../helper/image';
import CircularAvatar from '../CircularAvatar';
import NextLink from '../NextLink';
import HorizontalDivider from '../HorizontalDivider';

interface ArtistListProps {
    artists: any;
    currentPage: string;
    totalPages: string;
  }

const ArtistList = ({ artists, currentPage, totalPages }: ArtistListProps) => {

    const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
    const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
      <>
        <div>
            {artists.map((artist: any, index: number) => {
                    const imageSrc = resizeImageFromUrl(artist.photo?.url);
                    const altText = artist.photo?.title;   
                    const { slug } = artist;

                    return (
                        <div style={{padding: "1em"}} key={index}>
                            <Stack direction="horizontal" gap={1}>
                                <div style={{ paddingRight: "0.5em"}}>
                                    <CircularAvatar src={imageSrc} alt={altText}/>
                                </div>
                                <div>
                                <NextLink href={`/artists/${slug}`}>
                                    {artist.name}
                                </NextLink>
                                </div>
                            </Stack>
                        </div>
                        )
                    })}
        </div>
        <HorizontalDivider />
        <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            nextDisabled={nextDisabled}
            prevDisabled={prevDisabled}
        />
    </>
  );
};

export default ArtistList;
