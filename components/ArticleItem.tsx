import React from 'react';
import Link from "next/link"

const ArticleItem = ({article}: any) => {
  return (
    <Link href="/article/[id]" as={`/article/${article.id}`}>
        <a>
            <h3>{article.title} &rarr;</h3>
            <h3>{article.body}</h3>
        </a>
    </Link>
  );
};

export default ArticleItem;
