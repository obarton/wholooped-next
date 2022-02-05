import React from 'react';
import ContentfulApi from '../../lib/contentfulApi';
import { Config } from '../../utils/config';
import IndexPageHeader from '../../components/IndexPageHeader';
import { Desktop, Mobile } from '../../components/Responsive';
import { PageContainer, MobilePageContainer} from '../../components/PageContainer';
import LoopPackList from '../../components/LoopPackList';

export interface LoopPackIndexPageProps {
  loopPacks: any;
  currentPage: string;
  totalPages: string;
}

const LoopPackIndex = ({ loopPacks, currentPage, totalPages }: LoopPackIndexPageProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pageTitle = "Loop Packs"

  return (
      <>
        <Desktop>
          <PageContainer>
            <IndexPageHeader title={pageTitle} />
              <LoopPackList 
                  loopPacks={loopPacks}
                  currentPage={currentPage}
                  totalPages={totalPages}
              />
          </PageContainer>
        </Desktop>
        <Mobile>
          <MobilePageContainer>
            <IndexPageHeader title={pageTitle} />
              <LoopPackList 
                  loopPacks={loopPacks}
                  currentPage={currentPage}
                  totalPages={totalPages}
              />
          </MobilePageContainer>
        </Mobile>
      </>
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
