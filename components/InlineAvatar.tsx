import Link from 'next/link';
import React from 'react';
import { Stack } from 'react-bootstrap';
import styled from "styled-components"
import { Avatar } from "@mui/material"

const StyledLink = styled.a`
  color: black;
  text-decoration: none;
`

const StyledUserLink = styled.a`
text-decoration: none;
`

interface InlineAvatarProps {
    redirectUrl: string;
    thumbnailUrl: string;
    text: string;
}

const InlineAvatar = ({ redirectUrl, thumbnailUrl, text}: InlineAvatarProps) => {
  return (
    <Link href={redirectUrl || ""} passHref>
        <StyledUserLink>
            <Stack direction="horizontal" gap={1}>
            <Avatar src={thumbnailUrl} alt={text} sx={{ width: 20, height: 20 }} />
                <p style={{color: "#4183c4", margin: "0", padding: "0"}}>{text}</p>           
            </Stack>
        </StyledUserLink>
    </Link>
  );
};

export default InlineAvatar;
