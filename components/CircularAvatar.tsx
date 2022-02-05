import React from 'react';
import Image from "react-bootstrap/Image"
import { resizeImageFromUrl } from '../helper/image';

const FALLBACK_IMAGE_URL = resizeImageFromUrl("https://images.ctfassets.net/vwlltmjzgrb5/2UfeBxr3ts2H4KFRNxAfen/306f7858a8c918c9e9d6d95c9a469430/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg")

interface CircularAvatarProps {
    src: string;
    alt: string;
}

const CircularAvatar = ({ src, alt}: CircularAvatarProps) => {
  return <Image src={src ?? FALLBACK_IMAGE_URL} alt={alt} style={{ borderRadius: "50%"}}/>;
};

export default CircularAvatar;
