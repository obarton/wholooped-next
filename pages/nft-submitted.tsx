import React from 'react'
import Layout from '../components/Layout'
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useRouter } from "next/router";
import 'react-h5-audio-player/lib/styles.css';
import "antd/dist/antd.css";

const CreateNFT = () => {
     const router = useRouter()

  return (
    <Layout>
        <Container style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "2rem", marginBottom: "2rem"}}>
            <Row>
                <Col>
                    <Container style={{padding: "1rem"}}>
                        <h1>NFT Submitted!</h1>
                        <Container style={{paddingLeft: "1rem", paddingRight: "1rem"}}>
                            <p>Your NFT has successfully been submitted!</p>
                            <p>Our team will reach out to you via email when your NFT is ready to deploy to the blockchain.</p>
                        </Container>
                    </Container>
                </Col>
            </Row>
            <Row>
            <Form.Group style={{marginTop: "1em"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => router.push(`/app`)}>Go To Dashboard</Button> 
                </div>
            </Form.Group>
            </Row>
        </Container>
    </Layout>
  )
}

export default CreateNFT