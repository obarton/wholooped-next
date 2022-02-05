import React from 'react';
import { Stack } from 'react-bootstrap';
import Pagination from './Pagination';
import { resizeImageFromUrl } from '../../helper/image';
import NextLink from '../NextLink';
import HorizontalDivider from '../HorizontalDivider';
import Artwork from '../Artwork';

interface LoopPackListProps {
  loopPacks: any;
  currentPage: string;
  totalPages: string;
}

const LoopPackList = ({ loopPacks, currentPage, totalPages }: LoopPackListProps) => {

    const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
    const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
      <>
        <div>
            {loopPacks.map((loopPack: any, index: number) => {
                    const imageSrc = resizeImageFromUrl(loopPack.artwork?.url);
                    const altText = loopPack.title;    
                    const { title, slug, loopmakerCollection } = loopPack;
                    const loopmakers = loopmakerCollection?.items;
                    const redirectUrl = `/looppacks/${loopmakers[0]?.slug}/${slug}`

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
                                    {loopmakers?.map((l: any, index: number) => {
                                      if(index == 0) {
                                        return <span style={{color: "#666C7E"}}>{l.name}</span>
                                      }

                                        return <span style={{color: "#666C7E"}}>, {l.name}</span>
                                    })}
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

export default LoopPackList;
