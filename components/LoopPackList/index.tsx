import React from 'react';
import { Stack } from 'react-bootstrap';
// import Pagination from './Pagination';
import { resizeImageFromUrl } from '../../helper/image';
import CircularAvatar from '../CircularAvatar';
import NextLink from '../NextLink';
import HorizontalDivider from '../HorizontalDivider';

const LoopPackList = ({ loopPacks, currentPage, totalPages }: any) => {

    const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
    const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
      <>
        <div>
        {/* {loopPacks.map(loopPack => {
          const image = getImage(loopPack.artwork)
          const altText = loopPack.title;   
          const { title, slug, loopmaker } = loopPack;

          return (
          <div style={{padding: "1em"}}>
          <Stack direction="horizontal" gap={1}>
            <div style={{ paddingRight: "0.5em"}}>
                <Link to={`/looppacks/${loopmaker[0]?.slug}/${slug}`}>
                  <GatsbyImage image={image} alt={altText} style={{ borderRadius: "8px"}}/>
                </Link>
            </div>
            <div>
            <Link to={`/looppacks/${loopmaker[0]?.slug}/${slug}`}>
            <p style={{margin: "0"}}>
              {title}
            </p>
                {loopmaker?.map((l, index) => {
                  if(index == 0) {
                    return <span style={{color: "#666C7E"}}>{l.name}</span>
                  }

                    return <span style={{color: "#666C7E"}}>, {l.name}</span>
                })}
            </Link>
            </div>
          </Stack>
          </div>)
        })} */}
            {loopPacks.map((loopPack: any, index: number) => {
                    // const imageSrc = resizeImageFromUrl(artist.photo?.url);
                    // const altText = artist.photo?.title;   
                    // const { slug } = artist;

                    return (
                        <div style={{padding: "1em"}} key={index}>
                            {/* <Stack direction="horizontal" gap={1}>
                                <div style={{ paddingRight: "0.5em"}}>
                                    <CircularAvatar src={imageSrc} alt={altText}/>
                                </div>
                                <div>
                                <NextLink href={`/artists/${slug}`}>
                                    {artist.name}
                                </NextLink>
                                </div>
                            </Stack> */}
                        </div>
                        )
                    })}
        </div>
        <HorizontalDivider />
        {/* <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            nextDisabled={nextDisabled}
            prevDisabled={prevDisabled}
        /> */}
    </>
  );
};

export default LoopPackList;
