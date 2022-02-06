import React from 'react';
import { Stack } from 'react-bootstrap';
import { resizeImageFromUrl } from '../../helper/image';
import NextLink from '../NextLink';
import Artwork from '../Artwork';

interface GenreListProps {
  genres: any;
}

//TODO: Add pagination
const GenreList = ({ genres }: GenreListProps) => {
  return (
      <>
        <div>
            {genres.map((genre: any, index: number) => {
                    const imageSrc = resizeImageFromUrl(genre?.coverImage?.url);
                    const altText = genre?.name;    
                    const { name, slug } = genre;
                    const redirectUrl = `/genres/${slug}`

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
                                        {name}
                                    </p>
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

export default GenreList;
