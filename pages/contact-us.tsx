import React from 'react'
import Layout from '../components/Layout'
import { Container } from 'react-bootstrap'
import { Desktop, Mobile } from "../components/Responsive"
import styled from 'styled-components'

const ContactUsPageContainer = styled.div`
  min-height: 100vh;
`

const ContactUs = () => {
    return (
        <>
        <Desktop>
            <ContactUsPageContainer>
              <Container style={{width: "60%", marginTop: "2.5%" }}>
              <div style={{textAlign: "center"}}>
              <h1>Contact Us</h1>
              <Container>
              <p>Email us at <a href="mailto: info@wholooped.com">info@wholooped.com</a> for all questions and inquiries.</p>
            </Container>
              </div>
              </Container>
              </ContactUsPageContainer>
              </Desktop>
              <Mobile>
                  <ContactUsPageContainer>
              <Container style={{ marginTop: "5%" }}>
              <div style={{textAlign: "center"}}>
              <h1>Contact Us</h1>
                <Container>
                    <p>Email us at <a href="mailto: info@wholooped.com">info@wholooped.com</a> for all questions and inquiries.</p>
                </Container>
              </div>
              </Container>
              </ContactUsPageContainer>
              </Mobile>
        </>
    )
}

export default ContactUs
