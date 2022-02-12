import React from 'react';
import { Color } from '../types/Color';
import Artwork from './Artwork';
import HorizontalDivider from './HorizontalDivider';

interface IndexPageArtworkHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    artworkSrc: string;
}

const IndexPageArtworkHeader = ({ title, subtitle, description, artworkSrc }: IndexPageArtworkHeaderProps) => {
  return (
        <div style={{textAlign: "center"}}>
            <Artwork src={artworkSrc} alt={title}/>
            <div style={{marginTop: "1rem", marginBottom: "1rem"}}>
                <h1>{title}</h1>
                {subtitle && <h3 style={{ fontWeight: "normal"}}>{subtitle}</h3>}
            </div>  
            <HorizontalDivider />       
            {description && (
              <div style={{marginTop: "1rem", marginBottom: "1rem"}}>  
                <p>{description}</p>
            </div>          
            )}         
        </div>
  );
};

export default IndexPageArtworkHeader;
