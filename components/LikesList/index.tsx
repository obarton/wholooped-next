import React from 'react';
import { Stack } from 'react-bootstrap';
import Artwork from '../Artwork';
import NextLink from '../NextLink';

interface ListListProps {
    songs: any;
}

const LikesList = ({ songs }: ListListProps) => {
  return songs.map((song : any) => {
    const { title, slug, artist, album, loop} = song; 

    const imageSrc = album.artwork.url ? `${album.artwork.url}?w=75&h=75&fm=png&q=100&fit=thumb` : "";
    const altText = title;
    const artistNames = artist.map((a: any) => a.name).join(", ")
    const songTitle = title;
    const loopmakerNames = loop[0].loopmaker?.map((l: any) => l.name).join(", ")
    const loopTitle = loop[0].title;

    return (
        <div key={songTitle} style={{padding: "1em"}}>
            <Stack direction="horizontal" gap={1}>
                <div style={{ paddingRight: "0.5em"}}>
                    <Artwork src={imageSrc} alt={altText}/>
                </div>
            <div>
                <NextLink href={`/artists/${artist[0].slug}/${slug}`}>
                <p>
                    {artistNames}&apos;s {songTitle}  
                    <br/>
                    Loop of {loopmakerNames}&apos;s {loopTitle}
                </p>
                </NextLink>
            </div>
            </Stack>
        </div>
    )
})
}

export default LikesList
