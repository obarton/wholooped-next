import React from 'react';
import { Container } from 'react-bootstrap';
import styled from "styled-components";

const StyledContainer = styled(Container)({
    width: "50%", 
    marginTop: "2rem", 
    marginBottom: "2rem"
})

const StyledMobileContainer = styled(Container)({
    marginTop: "2rem", 
    marginBottom: "2rem"
})

export const PageContainer = ({children}: any) => {
  return (
    <StyledContainer>
        {children}
    </StyledContainer>
  );
};

export const MobilePageContainer = ({children}: any) => {
    return (
      <StyledMobileContainer>
          {children}
      </StyledMobileContainer>
    );
  };

export default PageContainer;
