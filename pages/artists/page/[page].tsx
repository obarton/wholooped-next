import React from 'react';
import { Desktop, Mobile } from "../../../components/Responsive"
import { PageContainer, MobilePageContainer } from "../../../components/PageContainer"
import IndexPageHeader from "../../../components/IndexPageHeader"
import ContentfulApi from '../../../lib/contentfulApi';
import { Config } from '../../../utils/config';
import ArtistList from '../../../components/ArtistList';

const ArtistIndexPage = ({ artists, currentPage, totalPages }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pageTitle = "Artists"

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

export async function getStaticPaths() {
    const totalArtists = await ContentfulApi.getTotalArtistsNumber();
    const totalPages = Math.ceil(totalArtists / Config.pagination.pageSize);
  
    const paths = [];
  
    /**
     * Start from page 2, so we don't replicate /blog
     * which is page 1
     */
    for (let page = 2; page <= totalPages; page++) {
      paths.push({ params: { page: page.toString() } });
    }
  
    return {
      paths,
      fallback: false,
    };
  }

export const getStaticProps = async ({ params }: any) => {
    const artists = await ContentfulApi.getPaginatedArtists(params.page);
    const totalPages = Math.ceil(artists.total / Config.pagination.pageSize);
  
    return {
      props: {
        artists: artists.items,
        totalPages,
        currentPage: params.page,
      },
    };
}

export default ArtistIndexPage;
