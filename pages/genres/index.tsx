import React from 'react';
import ContentfulApi from '../../lib/contentfulApi';
import IndexPageHeader from '../../components/IndexPageHeader';
import { Desktop, Mobile } from '../../components/Responsive';
import { PageContainer, MobilePageContainer} from '../../components/PageContainer';
import GenreList from '../../components/GenreList';

const GenreIndex = ({ genres }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pageTitle = "Genres";

  return (
      <>
        <Desktop>
          <PageContainer>
            <IndexPageHeader title={pageTitle} />
              <GenreList 
                  genres={genres}
              />
          </PageContainer>
        </Desktop>
        <Mobile>
          <MobilePageContainer>
            <IndexPageHeader title={pageTitle} />
            <GenreList 
                  genres={genres}
              />
          </MobilePageContainer>
        </Mobile>
      </>
    )
};


export const getStaticProps = async () => {
    const genres = await ContentfulApi.getGenres();
  
    return {
      props: {
        genres: genres.items,
      },
    };
}

export default GenreIndex;
