import React from 'react';
import CircularAvatar from './CircularAvatar';
import HorizontalDivider from './HorizontalDivider';

interface IndexPageAvatarHeaderProps {
    title: string;
    avatarSrc: string;
}

const IndexPageAvatarHeader = ({ title, avatarSrc }: IndexPageAvatarHeaderProps) => {
  return (
        <div style={{textAlign: "center"}}>
            <CircularAvatar src={avatarSrc} alt={title}/>
            <h1 style={{marginTop: "1rem", marginBottom: "1rem"}}>{title}</h1>
            <HorizontalDivider />
        </div>
  );
};

export default IndexPageAvatarHeader;
