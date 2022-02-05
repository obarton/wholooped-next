import React from 'react';
import ContentfulApi from '../../lib/contentfulApi';
import { Config } from '../../utils/config';
import ArtistList from '../../components/ArtistList';
import IndexPageHeader from '../../components/IndexPageHeader';
import { Desktop, Mobile } from '../../components/Responsive';
import { PageContainer, MobilePageContainer} from '../../components/PageContainer';

const ArtistIndex = ({ artists, currentPage, totalPages }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pageTitle = "Artists";

  return (
      <>
        <Desktop>
          <PageContainer>
            <IndexPageHeader title={pageTitle} />
              <ArtistList 
                  artists={artists}
                  currentPage={currentPage}
                  totalPages={totalPages}
              />
          </PageContainer>
        </Desktop>
        <Mobile>
          <MobilePageContainer>
            <IndexPageHeader title={pageTitle} />
              <ArtistList 
                  artists={artists}
                  currentPage={currentPage}
                  totalPages={totalPages}
              />
          </MobilePageContainer>
        </Mobile>
      </>
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
