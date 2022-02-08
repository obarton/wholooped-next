import React from 'react';
import { getArtistBySlug, getArtists, getArtistSongs, getLoopmakers } from '../../../../lib/contentfulApi';
import { Desktop, Mobile } from '../../../../components/Responsive';
import PageContainer, { MobilePageContainer } from '../../../../components/PageContainer';
import NextLink from '../../../../components/NextLink';
import { resizeImageFromUrl } from '../../../../helper/image';
import IndexPageArtworkHeader from '../../../../components/IndexPageArtworkHeader';
import { useRouter } from 'next/router';
import { useLoopPack } from '../../../../hooks/useLoopPack';
import Spinner from "../../../../components/Spinner"
import SongList from '../../../../components/Shared/SongList';

//the-vintage-vxndals/the-scenic-route-volume-2

const LoopPack = () => {
    const router = useRouter()
    const {slug, loopmakerslug} = router.query
    const looppackSlug = slug as string;
    const loopmakerSlug = loopmakerslug as string;
    const { loopPack, songs, isLoading, isError} = useLoopPack(loopmakerSlug, looppackSlug)

    if (isError) return <div>Failed to load</div>
    if (isLoading) return <Spinner />

  const loopPackArtworkSrc = resizeImageFromUrl(loopPack?.imageUrl)
  const loopmakerName = loopPack?.loopmaker?.map((l: any) => l.name).join(", ")
  const description = "Songs containing loops from this sample pack"

  return (
  <>
    <Desktop>
        <PageContainer>
        <NextLink href="/looppacks">Go Back </NextLink>
          <IndexPageArtworkHeader 
            title={loopPack?.title} 
            subtitle={loopmakerName} 
            description={description}
            artworkSrc={loopPackArtworkSrc} 
          />
          <SongList 
                songs={songs}
            />
        </PageContainer>
      </Desktop>
      <Mobile>
        <MobilePageContainer>
        <NextLink href="/looppacks">Go Back </NextLink>
        <IndexPageArtworkHeader title={loopPack?.title} subtitle={loopmakerName} artworkSrc={loopPackArtworkSrc} />
          <SongList 
                songs={songs}
            />
        </MobilePageContainer>
      </Mobile>
  </>)
};

export default LoopPack;
