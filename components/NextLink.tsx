import React from 'react';
import styled from "styled-components";
import Link from "next/link"

export const StyledLink = styled.a`
    color: black;
    text-decoration: none;
`
export const StyledLightLink = styled.a`
    color: white;
    text-decoration: none;
`

const NextLink = ({ children, href }: any) => {
  return  (
        <Link href={href || ""} passHref>
            <StyledLink>
                {children}
            </StyledLink>
        </Link>
  )
};

export const LightNextLink = ({ children, href }: any) => {
    return  (
          <Link href={href || ""} passHref>
              <StyledLightLink>
                  {children}
              </StyledLightLink>
          </Link>
    )
  };

export default NextLink;
