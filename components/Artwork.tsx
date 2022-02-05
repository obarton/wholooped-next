import React from 'react';
import Image from "react-bootstrap/Image"
import { resizeImageFromUrl } from '../helper/image';

const FALLBACK_IMAGE_URL = resizeImageFromUrl("https://images.ctfassets.net/vwlltmjzgrb5/2prwzQoN8F6XMRHm7bgZKt/af355c589492088853b9728496c48c29/placeholder.jpg")

interface ArtworkProps {
    src: string;
    alt: string;
}

const Artwork = ({ src, alt}: ArtworkProps) => {
  return <Image src={src ?? FALLBACK_IMAGE_URL} alt={alt} style={{ borderRadius: "8px"}}/>;
};

export default Artwork;
