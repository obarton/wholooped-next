import styled from "styled-components";
import Link from "next/link"

export const StyledLink = styled.a`
    color: black;
    text-decoration: none;
`
import React from 'react';

const NextLink = ({ children, href }: any) => {
  return  (
        <Link href={href || ""} passHref>
            <StyledLink>
                {children}
            </StyledLink>
        </Link>
  )
};

export default NextLink;
