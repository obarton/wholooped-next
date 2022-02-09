import React from 'react';
import ContentfulApi from '../../lib/contentfulApi';
import { Config } from '../../utils/config';
import { PageTitles } from '../../utils/page';
import ArtistList from '../../components/ArtistList';
import IndexPageHeader from '../../components/IndexPageHeader';
import { Desktop, Mobile } from '../../components/Responsive';
import { PageContainer, MobilePageContainer} from '../../components/PageContainer';
import Layout from '../../components/Layout';

const ArtistIndex = ({ artists, currentPage, totalPages }: any) => {
  return (
      <Layout title={PageTitles.Artists}>
        <Desktop>
          <PageContainer>
            <IndexPageHeader title={PageTitles.Artists} />
              <ArtistList 
                  artists={artists}
                  currentPage={currentPage}
                  totalPages={totalPages}
              />
          </PageContainer>
        </Desktop>
        <Mobile>
          <MobilePageContainer>
            <IndexPageHeader title={PageTitles.Artists} />
              <ArtistList 
                  artists={artists}
                  currentPage={currentPage}
                  totalPages={totalPages}
              />
          </MobilePageContainer>
        </Mobile>
      </Layout>
    )
};


export const getStaticProps = async () => {
    const artists = await ContentfulApi.getPaginatedArtists(1);
    const totalPages = Math.ceil(artists.total / Config.pagination.pageSize);
  
    return {
      props: {
        artists: artists.items,
        totalPages,
        currentPage: 1,
      },
    };
}

export default ArtistIndex;
