import React from 'react';
import { Desktop, Mobile } from '../../../../../components/Responsive';
import PageContainer, { MobilePageContainer } from '../../../../../components/PageContainer';
import { resizeImageFromUrl } from '../../../../../helper/image';
import IndexPageArtworkHeader from '../../../../../components/IndexPageArtworkHeader';
import { useRouter } from 'next/router';
import { useLoopPack } from '../../../../../hooks/useLoopPack';
import Spinner from "../../../../../components/Spinner"
import SongList from '../../../../../components/Shared/SongList';
import styled from "styled-components"
import Layout from '../../../../../components/Layout';

const LooppackPageContainer = styled.div`
  min-height: 100vh
`

const LoopPack = () => {
    const router = useRouter()
    const {slug, looppackslug} = router.query
    const loopmakerslug = slug as string;
    const looppackSlug = looppackslug as string;
    const { loopPack, songs, isLoading, isError} = useLoopPack(loopmakerslug, looppackSlug)
    
    
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

  const loopPackArtworkSrc = resizeImageFromUrl(loopPack?.imageUrl)
  const loopmakerName = loopPack?.loopmaker?.map((l: any) => l.name).join(", ")
  const description = "Songs containing loops from this sample pack"

  return (
  <Layout title={loopPack?.title}>
    <Desktop>
      <LooppackPageContainer>
        <PageContainer>
          <IndexPageArtworkHeader 
            title={loopPack?.title} 
            subtitle={loopmakerName} 
            description={description}
            artworkSrc={loopPackArtworkSrc} 
          />
          <SongList songs={songs}/>
        </PageContainer>
        </LooppackPageContainer>
      </Desktop>
      <Mobile>
        <LooppackPageContainer>
        <MobilePageContainer>
        <IndexPageArtworkHeader 
            title={loopPack?.title} 
            subtitle={loopmakerName} 
            description={description}
            artworkSrc={loopPackArtworkSrc} 
          />
        <SongList songs={songs}/>
        </MobilePageContainer>
        </LooppackPageContainer>
      </Mobile>
  </Layout>)
};

export default LoopPack;
