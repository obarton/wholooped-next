import React from 'react';

interface SongPageHeaderProps {
    title: string;
    artist: string;
}

const SongPageHeader = ({title, artist}: SongPageHeaderProps) => {
  return (
    <div style={{textAlign: "center", marginTop: "2rem"}}>
        <h1 style={{marginBottom: "0"}}>{title}</h1>
        <h2 style={{padding: "0", margin: "0"}}>{artist}</h2>
    </div>
  );
};

export default SongPageHeader;
