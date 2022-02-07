import React from 'react';
import Image from "react-bootstrap/Image"
import { resizeImageFromUrl } from '../helper/image';
import { Desktop, Mobile } from './Responsive';

const FALLBACK_IMAGE_URL = resizeImageFromUrl("https://images.ctfassets.net/vwlltmjzgrb5/2prwzQoN8F6XMRHm7bgZKt/af355c589492088853b9728496c48c29/placeholder.jpg")

interface ArtworkProps {
    src: string;
    alt: string;
}

const Artwork = ({ src, alt}: ArtworkProps) => {
  return (
    <>
      <Desktop>
        <Image src={src ?? FALLBACK_IMAGE_URL} alt={alt} style={{ borderRadius: "8px"}}/>
      </Desktop>
      <Mobile>
        <Image src={src ?? FALLBACK_IMAGE_URL} alt={alt} style={{ borderRadius: "4px"}}/>
      </Mobile>
    </>
  )
  
};

export default Artwork;
