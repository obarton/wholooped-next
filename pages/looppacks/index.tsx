import React from 'react';
import ContentfulApi from '../../lib/contentfulApi';
import { Config } from '../../utils/config';
import IndexPageHeader from '../../components/IndexPageHeader';
import { Desktop, Mobile } from '../../components/Responsive';
import { PageContainer, MobilePageContainer} from '../../components/PageContainer';
import LoopPackList from '../../components/LoopPackList';
import Layout from '../../components/Layout';
import { PageTitles } from '../../utils/page';

export interface LoopPackIndexPageProps {
  loopPacks: any;
  currentPage: string;
  totalPages: string;
}

const LoopPackIndex = ({ loopPacks, currentPage, totalPages }: LoopPackIndexPageProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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


export const getStaticProps = async () => {
    const loopPacks = await ContentfulApi.getPaginatedLoopPacks(1);
    const totalPages = Math.ceil(loopPacks.total / Config.pagination.pageSize);
  
    return {
      props: {
        loopPacks: loopPacks.items,
        totalPages,
        currentPage: 1,
      },
    };
}

export default LoopPackIndex;
