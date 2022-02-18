import React from 'react';
import { Stack } from 'react-bootstrap';
import Artwork from '../Artwork';
import NextLink from '../NextLink';
import { Desktop, Mobile } from '../Responsive';

    //reduce your information or text 
const truncate = (input: string) => input?.length > 30 ? `${input.substring(0, 26)}...` : input;

const CreditsList = ({ credits }: any) => {
  return (
        <>
        <Desktop>
           {
            credits?.length > 0 ? 
                (
                <div style={{maxWidth: "100%"}}>
                <Stack gap={3}>
                    {credits.map((song: any) => {
                        const artistSlug = song.artist[0].slug;
                        const artist = song.artist.map((a: any) => a.name).join(", ")
    
                        const songSlug = song.slug;
                        const songTitle = song.title;
    
                        const loopmakerName = song.loop[0].loopmaker.map((l: any) => l.name).join(", ")
                        const loopTitle = song.loop[0].title;
    
                        const imageSrc = song.album.artwork.url ? `${song.album.artwork.url}?w=75&h=75&fm=png&q=100&fit=thumb` : "";
                        const altText = song.album.title;
    
                        return (
                            <div  key={song.title}>
                            <NextLink href={`/artists/${artistSlug}/${songSlug}`}>
                                <Stack direction="horizontal" gap={3}>
                                    <div>
                                        <Artwork src={imageSrc} alt={altText} />
                                    </div>
                                    <div>
                                        {artist}&apos;s {songTitle}  
                                        <br/>
                                        Loop of {loopmakerName}&apos;s {loopTitle}
                                    </div>
                                </Stack>
                            </NextLink>
                            </div>
                        )
                    })}
                </Stack>
            </div>

                ) : 
                (
                    <div style={{textAlign: "center"}}>
                    <p style={{color: "#666C7E"}}>No Credits found</p>
                    </div>
                )
            }
            </Desktop>
            <Mobile>
           {
            credits?.length > 0 ? 
                (
                <div style={{maxWidth: "100%"}}>
                <Stack gap={3}>
                    {credits.map((song: any) => {
                        const artistSlug = song.artist[0].slug;
                        const artist = song.artist.map((a: any) => a.name).join(", ")
    
                        const songSlug = song.slug;
                        const songTitle = song.title;
    
                        const loopmakerName = song.loop[0].loopmaker.map((l: any) => l.name).join(", ")
                        const loopTitle = song.loop[0].title;
    
                        const imageSrc = song.album.artwork.url ? `${song.album.artwork.url}?w=75&h=75&fm=png&q=100&fit=thumb` : "";
                        const altText = song.album.title;
    
                        return (
                            <div  key={song.title}>
                            <NextLink href={`/artists/${artistSlug}/${songSlug}`}>
                                <Stack direction="horizontal" gap={3}>
                                    <div>
                                        <Artwork src={imageSrc} alt={altText} />
                                    </div>
                                    <div>
                                        {artist}&apos;s {songTitle}  
                                        <br/>
                                        Loop of {loopmakerName}&apos;s {truncate(loopTitle)}
                                    </div>
                                </Stack>
                            </NextLink>
                            </div>
                        )
                    })}
                </Stack>
            </div>

                ) : 
                (
                    <div style={{textAlign: "center"}}>
                    <p style={{color: "#666C7E"}}>No Credits found</p>
                    </div>
                )
            }
            </Mobile>
        </>
    );
};

export default CreditsList;
