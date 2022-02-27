import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import { Container, Row, Col, Form, Stack, Button, Image } from "react-bootstrap"
import { Steps, Descriptions } from 'antd';
import AudioPlayer from "react-h5-audio-player"
import 'react-h5-audio-player/lib/styles.css';
import "antd/dist/antd.css";
import AWS from 'aws-sdk'
import { API } from 'aws-amplify';
import { useUserProfile } from '../hooks/useUserProfile';

const { Step } = Steps;
const S3_BUCKET = process.env.NEXT_AWS_S3_BUCKET as string;
const REGION = process.env.NEXT_AWS_REGION as string;
const ACCESS_KEY = process.env.NEXT_AWS_ACCESS_KEY as string;
const SECRET_ACCESS_KEY = process.env.NEXT_AWS_SECRET_ACCESS_KEY as string;

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const CreateNFT = () => {
    const [contractName, setContractName] = useState()
    const [description, setDescription] = useState()
    const [selectedArtworkFile, setSelectedArtworkFile] = useState(null)
    const [selectedLoopFile, setSelectedLoopFile] = useState(null)
    const [symbol, setSymbol] = useState()
    const [step, setStep] = useState(0)
    const [artworkPreview, setArtworkPreview] = useState();
    const [loopPreview, setLoopPreview] = useState()
    const [progress , setProgress] = useState(0);
    const headerPhotoInputRef = useRef()
    const { user, userProfile, isLoading, isError } = useUserProfile()

    useEffect(() => {
      console.log(`user ${JSON.stringify(user, null, 2)}`)
      console.log(`userProfile ${JSON.stringify(userProfile, null, 2)}`)
    }, [user, userProfile])
    

    const onContractNameInput = ({ target: { value }}: any)  => {
        setContractName(value)
    }

    const onDescriptionInput = ({ target: { value }}: any)  => {
        setDescription(value)
    }

    const onSymbolInput = ({ target: { value }}: any)  => {
        setSymbol(value)
    }

    const uploadFileToS3 = async (file: any, key: string) => {
        if(file) {
            try 
            {
                const fileParams = {
                        ACL: 'public-read',
                        Body: file,
                        Bucket: S3_BUCKET,
                        Key: key
                    };
            
                myBucket.putObject(fileParams as any)
                    .on('httpUploadProgress', (evt: any) => {
                        setProgress(Math.round((evt.loaded / evt.total) * 100))
                    })
                    .send((err) => {
                        if (err) console.log(err)
                        console.log(fileParams)
                    })
            }
           catch(e: any) {
            console.log(`upload error ${e}`)
           }
        }
    }

    const onFormSubmit = async (e: any) => {
        e.preventDefault()
        console.log(`contractName ${contractName}`)
        console.log(`description ${description}`)
        console.log(`symbol ${symbol}`)
        console.log(`selectedArtworkFile ${selectedArtworkFile}`)
        console.log(`selectedLoopFile ${selectedLoopFile}`)
        
        const submitNftResponse = await API.post("Web3Api", "/nft/submit", {
            body: {
                userId: user?.sub,
                displayName: userProfile?.displayName,
                contractName,
                description,
                symbol
            }
          });
        
        const { id } = submitNftResponse;

        const artworkKey = `${user?.sub}-${id}-${contractName}-${(selectedArtworkFile as any)?.name}`;
        const loopKey = `${user?.sub}-${id}-${contractName}-${(selectedLoopFile as any)?.name}`;

        await uploadFileToS3(selectedArtworkFile, artworkKey);
        await uploadFileToS3(selectedLoopFile, loopKey);
    }

    const onNextClick = () => {
        setStep(step + 1)
    }

    const onBackClick = () => {
        setStep(step - 1)
    }

    const getArtworkSrc = () => {
        if(artworkPreview) {
            return artworkPreview;
        }
  
        return ""
    }

    const getLoopSrc = () => {
        if(loopPreview) {
            return loopPreview;
        }
  
        return ""
    }

    useEffect(() => {
        if (!selectedArtworkFile) {
            setArtworkPreview(undefined)
            return
        }
  
        const objectUrl = URL.createObjectURL(selectedArtworkFile) as any
        setArtworkPreview(objectUrl)
  
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedArtworkFile])

    const artworkFileSelectedHandler = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedArtworkFile(null)
            return
        }
  
        setSelectedArtworkFile(e.target.files[0])
    }

    const handleRemoveArtworkImageClick = (e: any) => {
        setArtworkPreview(undefined)
        setSelectedArtworkFile(null)
      }
    
    const loopFileSelectedHandler = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedLoopFile(null)
            return
        }
  
        setSelectedLoopFile(e.target.files[0])
    }

    useEffect(() => {
        if (!selectedLoopFile) {
            setLoopPreview(undefined)
            return
        }
  
        const objectUrl = URL.createObjectURL(selectedLoopFile) as any
        setLoopPreview(objectUrl)
  
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedLoopFile])

    const renderTitleSwitch = (value: any): any => {
        switch (value) {
            case 0:
                return "Create Contract";
            case 1:
                return "Upload Files";
            case 2:
                return "Confirm";            
            default:
                break;
        }
    }

    const renderSwitch = (value: any): any => {
        switch (value) {
            case 0:   
                return (
                    <>
                    <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Contract Name</b>
                            </Form.Label>
                            <Form.Control 
                                type="contractName" 
                                placeholder="E.x. Who Looped" 
                                onChange={onContractNameInput} 
                                value={contractName}
                                style={{width: "100%"}}
                            />
                        </Form.Group>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Token Symbol (Ticker)</b>
                            </Form.Label>
                            <Form.Control 
                                type="contractName" 
                                placeholder="E.x. WLP" 
                                onChange={onSymbolInput} 
                                value={symbol}
                                style={{width: "100%"}}
                            />
                        </Form.Group>
                    </>
                )
                case 1:   
                return (
                    <>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Artwork</b>
                            </Form.Label>
                            <Form.Control 
                                as="input" 
                                type="file" 
                                onChange={artworkFileSelectedHandler} 
                                style={{width: "100%"}}
                            />
                        </Form.Group>
                        { 
                            selectedArtworkFile && (
                                <>
                                    <div style={{textAlign: "center"}}>
                                        <Image alt="header-photo" src={getArtworkSrc()} thumbnail style={{width: "300px", height: "300px", objectFit: "cover", padding: "0"}}/>
                                    </div>
                                    <div style={{textAlign: "center"}}>
                                        <Button style={{marginTop: "1rem"}} onClick={handleRemoveArtworkImageClick}>Remove Artwork</Button>
                                    </div>
                                </>
                            ) 
                        }
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Loop</b>
                            </Form.Label>
                            <Form.Control 
                                as="input" 
                                type="file" 
                                onChange={loopFileSelectedHandler} 
                                style={{width: "100%"}}
                            />
                        </Form.Group>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Description</b>
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Description" 
                                onChange={onDescriptionInput} 
                                value={description}
                                style={{width: "100%"}}
                            />
                        </Form.Group>
                    </>
                )
            case 2: 
            return (
                <div>
                    <Descriptions
                    bordered
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                    >
                        <Descriptions.Item label="Contract Name">{contractName}</Descriptions.Item>
                        <Descriptions.Item label="Symbol">{symbol}</Descriptions.Item>
                        <Descriptions.Item label="Description">{description}</Descriptions.Item>
                        <Descriptions.Item label="Artwork">
                            <div style={{textAlign: "center"}}>
                                <Image alt="header-photo" src={getArtworkSrc()} thumbnail style={{width: "300px", height: "300px", objectFit: "cover", padding: "0"}}/>
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Audio">
                            <div style={{textAlign: "center"}}>
                                <AudioPlayer style={{width: "100%", marginTop: "2em"}} src={getLoopSrc()} customAdditionalControls={[]} />
                            </div>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            )
            default:
                break;
        }
    }

  return (
    <Layout>
        <Container style={{paddingLeft: "15%", paddingRight: "15%", marginTop: "2rem", marginBottom: "2rem"}}>
        <Form onSubmit={onFormSubmit} style={{width: "100%"}}>
        <Steps progressDot current={step}>
            <Step title="Create Contract" description="Define your NFT" />
            <Step title="Upload Files" description="Add metadata to your NFT" />
            <Step title="Confirm" description="Submit for approval" />
        </Steps>
            <Row>
                <Col>
                    <Container style={{padding: "1rem"}}>
                        <h1>{renderTitleSwitch(step)}</h1>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Container style={{paddingLeft: "1rem", paddingRight: "1rem"}}>
                    <Stack gap={3}>
                        {
                            renderSwitch(step)
                        }
                    </Stack>
                </Container>
            </Row>
            <Row>
            <Form.Group style={{marginTop: "1em"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Stack direction="horizontal" gap={2}>
                        { (step !== 0) && <Button onClick={() => onBackClick()}>Back</Button> }
                        { (step !== 2) && <Button onClick={() => onNextClick()}>Next</Button> }
                        { (step === 2) && <Button type="submit">Submit</Button> }
                    </Stack>
                </div>
            </Form.Group>
            </Row>
            </Form>
        </Container>
    </Layout>
  )
}

export default CreateNFT