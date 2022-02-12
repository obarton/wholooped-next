import React, { useState } from 'react'
import Layout from '../../../../components/Layout';
import { Desktop, Mobile } from '../../../../components/Responsive';
import { useRouter } from 'next/router';
import IndexPageHeader from '../../../../components/IndexPageHeader';
import Spinner from '../../../../components/Spinner';
import { PageContainer, MobilePageContainer } from '../../../../components/PageContainer';
import { useLoop } from '../../../../hooks/useLoop';
import IndexPageArtworkHeader from '../../../../components/IndexPageArtworkHeader';
import { resizeImageFromUrl } from '../../../../helper/image';
import SongList from '../../../../components/Shared/SongList';

const Loop = () => {
    const router = useRouter()
    const {slug, loopslug} = router.query
    const loopmakerSlug = slug as string;
    const loopSlug = loopslug as string;
    
    const { loop, songs, isLoading, isError} = useLoop(loopmakerSlug, loopSlug)

    if (isError) { 
        return (
            <Layout>
            <div>Failed to load</div>
            </Layout>
        )
    }
    
    if (isLoading) { 
        return (
            <Layout>
                <Spinner />
            </Layout>
        )
    }

    const pageTitle = loop.title;
    const pageSubtitle = loop.loopmaker?.map((l: any) => l.name)
    const artworkSrc = resizeImageFromUrl(loop.loopPack?.imageUrl)
    const description = "Songs that use this loop";
    
        return (
            <Layout title={pageTitle}>
            <Desktop>
              <PageContainer>
                <IndexPageArtworkHeader 
                    title={pageTitle} 
                    subtitle={pageSubtitle} 
                    artworkSrc={artworkSrc}
                    description={description}
                />
                <SongList songs={songs}/>
              </PageContainer>
            </Desktop>
            <Mobile>
              <MobilePageContainer>
                <IndexPageArtworkHeader 
                    title={pageTitle} 
                    subtitle={pageSubtitle} 
                    artworkSrc={artworkSrc}
                    description={description}
                />
                <SongList songs={songs}/>
              </MobilePageContainer>
            </Mobile>
          </Layout>
        )
}

export default Loop