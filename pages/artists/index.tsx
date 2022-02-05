import React from 'react';
import ContentfulApi from '../../lib/contentfulApi';
import { Config } from '../../utils/config';
import ArtistList from '../../components/ArtistList';
import IndexPageHeader from '../../components/IndexPageHeader';
import { Desktop } from '../../components/Responsive';
import Container from "react-bootstrap/Container"
import PageContainer from '../../components/PageContainer';

const ArtistIndex = ({ artists, currentPage, totalPages }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
      <>
        <Desktop>
          <PageContainer>
            <IndexPageHeader title={"Artists"} />
              <ArtistList 
                  artists={artists}
                  currentPage={currentPage}
                  totalPages={totalPages}
              />
          </PageContainer>
        </Desktop>
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
