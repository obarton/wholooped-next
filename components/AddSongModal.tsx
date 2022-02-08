import { API } from 'aws-amplify';
import React, { useState } from 'react';
import { Form, Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { useUserProfile } from '../hooks/useUserProfile';
import Spinner from './Spinner'
import { toast } from "react-toastify";

const AddSongModal = ({show, onHide } : any) => {
    const { userProfile, isLoading, isError } = useUserProfile()
    const [addCreditFormChanged, setAddCreditFormChanged] = useState(false);
    const [addCreditSongLink, setAddCreditSongLink] = useState("")
    const [addCreditLoopLink, setAddCreditLoopLink] = useState("")


    const handleSuccess = () => {
        toast.success("Successfully submitted credit for review!", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }

    const handleFailure = () => {
        toast.error("Error occurred when submitting credit. Please retry later.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }


    const onAddCreditSongLinkInput = ({ target: { value } }: any) => {
        if (!addCreditFormChanged) {
            setAddCreditFormChanged(true)
        }

        setAddCreditSongLink(value)
    }

    const onAddCreditLoopLinkInput = ({ target: { value } }: any) => {
        if (!addCreditFormChanged) {
            setAddCreditFormChanged(true)
        }

        setAddCreditLoopLink(value)
    }

    const onAddCreditFormSubmit = async (e: any) => {
        e.preventDefault();
        const loopmakerProfile = userProfile?.linkedLoopmaker;
        const username = loopmakerProfile ? loopmakerProfile?.username : userProfile?.name 
        const displayName = loopmakerProfile ? loopmakerProfile?.name : userProfile?.displayName 

        API.post("SubmissionsApi", "/submitcredit", {
            body: {
                username,
                displayName,
                songUrl: addCreditSongLink,
                loopUrl: addCreditLoopLink
            }
        }).then(() => {
            handleSuccess()

        }).catch(() => {
            handleFailure()
        })
        
        setAddCreditSongLink("");
        setAddCreditLoopLink("");
    }

    if (isError) return <div>Failed to load</div>
    if (isLoading) return <></>

  return (
      <>
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Form onSubmit={onAddCreditFormSubmit} style={{width: "100%"}}>
                <Modal.Header closeButton>
                <Modal.Title>Add a Credit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row style={{marginBottom : "1rem"}}>
                                <Col xs={12}>                                
                                <Form.Group style={{width: "100%"}}>
                                <Form.Label>
                                    <b>Link to Song</b>
                                    <p>Spotify, Apple Music, YouTube, SoundCloud links accepted</p>
                                    </Form.Label>
                                    <Form.Control 
                                        type="addCreditSongLink" 
                                        placeholder="Song url" 
                                        onChange={onAddCreditSongLinkInput} 
                                        value={addCreditSongLink}
                                        style={{width: "100%"}}
                                    />
                                </Form.Group>                   
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>                                
                                <Form.Group style={{width: "100%"}}>
                                <Form.Label>
                                    <b>Link to Loop</b>
                                    <p>Playable link to your loop</p>
                                    </Form.Label>
                                    <Form.Control 
                                        type="addCreditLoopLink" 
                                        placeholder="Loop url" 
                                        onChange={onAddCreditLoopLinkInput} 
                                        value={addCreditLoopLink}
                                        style={{width: "100%"}}
                                    />
                                </Form.Group>                   
                            </Col>
                        </Row>
                    </Container>
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" type="submit" disabled={!addCreditFormChanged || addCreditSongLink == "" || addCreditLoopLink == ""}>
                    Submit
                </Button>
                </Modal.Footer>
                </Form>
            </Modal>
      </>
  );
};

export default AddSongModal;
