import React from 'react';
import { Container } from 'react-bootstrap';
import styled from "styled-components";

const StyledContainer = styled(Container)({
    width: "50%", 
    marginTop: "2rem", 
    marginBottom: "2rem"
})

const PageContainer = ({children}: any) => {
  return (
    <StyledContainer>
        {children}
    </StyledContainer>
  );
};

export default PageContainer;
