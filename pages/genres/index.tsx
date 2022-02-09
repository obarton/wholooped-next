import React from 'react';
import ContentfulApi from '../../lib/contentfulApi';
import IndexPageHeader from '../../components/IndexPageHeader';
import { Desktop, Mobile } from '../../components/Responsive';
import { PageContainer, MobilePageContainer} from '../../components/PageContainer';
import GenreList from '../../components/GenreList';
import Layout from '../../components/Layout';
import { PageTitles } from '../../utils/page';

const GenreIndex = ({ genres }: any) => {
  return (
      <Layout title={PageTitles.Genres}>
        <Desktop>
          <PageContainer>
            <IndexPageHeader title={PageTitles.Genres} />
              <GenreList 
                  genres={genres}
              />
          </PageContainer>
        </Desktop>
        <Mobile>
          <MobilePageContainer>
            <IndexPageHeader title={PageTitles.Genres} />
            <GenreList 
                  genres={genres}
              />
          </MobilePageContainer>
        </Mobile>
      </Layout>
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
