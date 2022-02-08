import React from 'react';
import { Stack } from "react-bootstrap";
import ContentList from './ContentList';

interface ContentListSectionProps {
    contentLists: any[]
}

const ContentListSection = ({ contentLists } : ContentListSectionProps) => {
  return (
    <>
        <Stack gap={4}>
            {
                contentLists?.map((contentList: any, i: number) => {
                    return (
                        <ContentList contentList={contentList} key={contentList.title}/>
                    )
                })
            }
        </Stack>
    </>
  );
};

export default ContentListSection;
