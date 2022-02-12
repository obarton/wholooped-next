import React from 'react';
import { Desktop, Mobile } from "../../../components/Responsive"
import { PageContainer, MobilePageContainer } from "../../../components/PageContainer"
import IndexPageHeader from "../../../components/IndexPageHeader"
import ContentfulApi from '../../../lib/contentfulApi';
import { Config } from '../../../utils/config';
import LoopPackList from '../../../components/LoopPackList';
import { LoopPackIndexPageProps } from '..';
import Layout from '../../../components/Layout';
import { PageTitles } from '../../../utils/page';

const LoopPacksIndexPage = ({ loopPacks, currentPage, totalPages }: LoopPackIndexPageProps) => {
  return (
    <Layout title={PageTitles.LoopPacks}>
      <Desktop>
        <PageContainer>
          <IndexPageHeader title={PageTitles.LoopPacks} />
            <LoopPackList 
                loopPacks={loopPacks}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </PageContainer>
      </Desktop>
      <Mobile>
          <MobilePageContainer>
            <IndexPageHeader title={PageTitles.LoopPacks} />
              <LoopPackList 
                  loopPacks={loopPacks}
                  currentPage={currentPage}
                  totalPages={totalPages}
              />
          </MobilePageContainer>
        </Mobile>
    </Layout>
    )
};

export async function getStaticPaths() {
    const totalLoopPacks = await ContentfulApi.getTotalArtistsNumber();
    const totalPages = Math.ceil(totalLoopPacks / Config.pagination.pageSize);
  
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
      fallback: 'blocking'
    };
  }

export const getStaticProps = async ({ params }: any) => {
    const loopPacks = await ContentfulApi.getPaginatedLoopPacks(params.page);
    const totalPages = Math.ceil(loopPacks.total / Config.pagination.pageSize);
  
    return {
      props: {
        loopPacks: loopPacks.items,
        totalPages,
        currentPage: params.page,
      },
      revalidate: 10, // In seconds
    };
}

export default LoopPacksIndexPage;
