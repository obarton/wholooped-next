import React from 'react';
import { Desktop, Mobile } from './Responsive';

interface SongPageHeaderProps {
    title: string;
    artist: string;
}

const SongPageHeader = ({title, artist}: SongPageHeaderProps) => {
  return (
    <>
    <Desktop>
    <div style={{textAlign: "center", marginTop: "2rem"}}>
        <h1 style={{marginBottom: "0"}}>{title}</h1>
        <h2 style={{padding: "0", margin: "0"}}>{artist}</h2>
    </div>
    </Desktop>
    <Mobile>
      <div style={{textAlign: "center"}}>
          <h1 style={{ fontSize: "1.5rem"}}>{title}</h1>
          <h2 style={{padding: "0", margin: "0", fontSize: "1.25rem"}}>{artist}</h2>
      </div>
    </Mobile>
    </>
  );
};

export default SongPageHeader;
