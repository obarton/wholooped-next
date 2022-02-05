import React from 'react';
import HorizontalDivider from './HorizontalDivider';

interface IndexPageHeaderProps {
    title: string;
}

const IndexPageHeader = ({ title }: IndexPageHeaderProps) => {
  return (
        <div>
            <h1 style={{textAlign: "center"}}>{title}</h1>
            <HorizontalDivider />
    </div>
  );
};

export default IndexPageHeader;
