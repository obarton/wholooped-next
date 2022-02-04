import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = ({articles}: any) => {
  return (
    <div>{articles.map((article: any, index: number) => <ArticleItem article={article} key={index}/>)}</div>
  );
};

export default ArticleList;
