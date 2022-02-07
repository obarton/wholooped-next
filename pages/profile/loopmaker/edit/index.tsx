import React, { useState, useEffect, useRef } from 'react'
//import { Link } from "gatsby"
import Container from "react-bootstrap/Container"
import * as contentful from "contentful-management"
//import UserProfileSongListSection from "../UserProfileLikesSection"
import styled from "styled-components"
import { API } from "aws-amplify"
import Avatar from "@mui/material/Avatar"
import { Desktop, Mobile } from "../../../../components/Responsive"
import { Image, Row, Col, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'semantic-ui-css/semantic.min.css'
//import Header from '../Header';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AccountLoadingSpinner from "../AccountLoadingSpinner"
import Layout from '../../../../components/Layout'
import Spinner from '../../../../components/Spinner'
import { useUserProfile } from '../../../../hooks/useUserProfile'
import NextLink from '../../../../components/NextLink'
import { useLoopmakerCredits } from '../../../../hooks/useLoopmakerCredits'
import SongList from '../../../../components/SongList'
import Artwork from '../../../../components/Artwork'
import CreditsList from '../../../../components/CreditsList'

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

const ContentContainer = styled.div`
  padding-bottom: 6rem;    /* Footer height */
`

const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4rem;            /* Footer height */
`

const UserProfileSubHeading = styled.h2({
    textAlign: "center",
    marginTop: "1rem"
})

const AddCreditButton = styled.button`
    height: 40px;
    width: 150px;
    border: none;
    background-color: #0d6efd;
    color: white;
    font-size: 15px
`

async function Connect() {
    const client = await contentful.createClient({
      accessToken: process.env.GATSBY_CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || ""
    })
  
    const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID || "")
    return await space.getEnvironment('master');
  }


const EditLoopmaker = ({ username }: any) => {
  const { user, userProfile, isLoading, isError } = useUserProfile()
  
  const loopmakerProfile = userProfile?.linkedLoopmaker;
  const loopmakerCredits = useLoopmakerCredits(loopmakerProfile?.id);


  const [selectedProfilePhotoFile, setSelectedProfilePhotoFile] = useState(null)
  const [selectedHeaderPhotoFile, setSelectedHeaderPhotoFile] = useState(null)
  const [userProfileData, setUserProfileData] = useState()
  const [isLoopmakerProfile, setIsLoopmakerProfile] = useState()
  //const [isLoading, setIsLoading] = useState(true)
  const [formChanged, setFormChanged] = useState(false)
  const [isSaving, setIsSaving] = useState(false);
  const [bio, setBio] = useState(loopmakerProfile?.bio);
  const [website, setWebsite] = useState(loopmakerProfile?.websiteUrl);
  const [displayName, setDisplayName] = useState(loopmakerProfile?.name);
  const [usernameData, setUsernameData] = useState(loopmakerProfile?.username);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState();
  const [headerPhotoPreview, setHeaderPhotoPreview] = useState();
  const profilePhotoInputRef = useRef()
  const headerPhotoInputRef = useRef()
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);
  const [addCreditFormChanged, setAddCreditFormChanged] = useState(false);
  const [addCreditSongLink, setAddCreditSongLink] = useState("")
  const [addCreditLoopLink, setAddCreditLoopLink] = useState("")
  const [credits, setCredits] = useState(loopmakerCredits?.credits);

  useEffect(() => {
    if(loopmakerProfile) {
      const { bio, websiteUrl, name, username} = loopmakerProfile;

      setBio(bio)
      setWebsite(websiteUrl)
      setDisplayName(name)
      setUsernameData(username)
    }

  }, [loopmakerProfile]);

  useEffect(() => {
    if(loopmakerCredits) {
      const { credits } = loopmakerCredits;

      setCredits(credits)
    }

  }, [loopmakerCredits]);
  

  const handleCloseAddCreditModal = () => setShowAddCreditModal(false);
  const handleShowAddCreditModal = () => setShowAddCreditModal(true);

  const onAddCreditSongLinkInput = ({ target: { value }}: any) => {
      if (!addCreditFormChanged) {
          setAddCreditFormChanged(true)
      }

      setAddCreditSongLink(value)
  }

  const onAddCreditLoopLinkInput = ({ target: { value }}: any)  => {
      if (!addCreditFormChanged) {
          setAddCreditFormChanged(true)
      }

      setAddCreditLoopLink(value)
  }

  const onDisplayNameInput = ({ target: { value }}: any)  => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setDisplayName(value)
  }

  const onBioInput = ({ target: { value }}: any)  => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setBio(value)
  }

  const onWebsiteInput = ({ target: { value }}: any)  => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setWebsite(value)
  }

  const onUsernameInput = ({ target: { value }}: any)  => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setUsernameData(value)
  }

  // const userProfile = userProfileData;
  const twitterUrl = loopmakerProfile?.twitterUrl;
  const facebookUrl = loopmakerProfile?.facebookUrl;
  const instagramUrl = loopmakerProfile?.instagramUrl;

  const getImgSrc = () => {
      if (profilePhotoPreview) {
          return profilePhotoPreview;
      }

      return loopmakerProfile?.profilePhoto?.url ? `${loopmakerProfile?.profilePhoto?.url}?w=175&h=175&fm=png&q=100&fit=thumb` : ""
  }

  const getHeaderImgSrc = () => {
      if(headerPhotoPreview) {
          return headerPhotoPreview;
      }

      return loopmakerProfile?.headerPhoto?.url ? `${loopmakerProfile?.headerPhoto?.url}?w=720&h=200&fm=png&q=100` : ""
  }

  // useEffect(() => {
  //   if (loopmakerProfile) {
  //     API.get("LoopmakerApi", `/loopmaker/${loopmakerProfile?.id}/credits`).then(credits => {
  //         console.log(`loopmakerProfile ${JSON.stringify(loopmakerProfile, null, 2)}`);
  //         setCredits(credits) 
  //         setDisplayName(loopmakerProfile?.name)
  //         setUsernameData(username)
  //         setBio(loopmakerProfile?.bio)
  //         setWebsite(loopmakerProfile?.websiteUrl)   
  //     }).then(
  //         setIsLoading(false)
  //     )
  //   }
  // }, [loopmakerProfile])

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
      if (!selectedProfilePhotoFile) {
          setProfilePhotoPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedProfilePhotoFile) as any
      setProfilePhotoPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedProfilePhotoFile])

  useEffect(() => {
      if (!selectedHeaderPhotoFile) {
          setHeaderPhotoPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedHeaderPhotoFile) as any
      setHeaderPhotoPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedHeaderPhotoFile])


  const onProfileImgClick = () => {
      (profilePhotoInputRef?.current as any)?.click()
  }

  const onHeaderImgClick = () => {
      (headerPhotoInputRef?.current as any)?.click()
  }

  const profilePhotoFileSelectedHandler = (e: any) => {
      if (!formChanged) {
          setFormChanged(true)
      }
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedProfilePhotoFile(null)
          return
      }

      setSelectedProfilePhotoFile(e.target.files[0])
  }

  const headerPhotoFileSelectedHandler = (e: any) => {
      if (!formChanged) {
          setFormChanged(true)
      }
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedHeaderPhotoFile(null)
          return
      }

      setSelectedHeaderPhotoFile(e.target.files[0])
  }

  const saveSelectedPhotoAsset = async (selectedPhotoFile: any) => {
      if (selectedPhotoFile && selectedPhotoFile != {}) {
          const env = await Connect();
          const title = selectedPhotoFile?.name;
          const description = "description";
          const contentType = "image/*";
          const fileName = selectedPhotoFile?.name;
          const file = selectedPhotoFile

          const publishContentResponse = await env.createAssetFromFiles({
            fields: {
              title: {
                'en-US': title
              },
              description: {
                'en-US': description
              },
              file: {
                'en-US': {
                  contentType: contentType,
                  fileName: fileName,
                  file: file
                }
              }
            }
          })
          .then((asset: any) => asset.processForAllLocales())
          .then((asset: any) => asset.publish())
          .catch(console.error)

          return publishContentResponse.sys.id;
      }

      return null;
  }

  const onFormSubmit = async (e: any) => {
      e.preventDefault()
      const updatedProfile = loopmakerProfile;
      updatedProfile.name = displayName;
      updatedProfile.username = username;
      updatedProfile.bio = bio;
      updatedProfile.websiteUrl = website;

      setIsSaving(true)

      if(selectedProfilePhotoFile && selectedProfilePhotoFile !== null) {
          const photoAssetId = await saveSelectedPhotoAsset(selectedProfilePhotoFile);
      
          updatedProfile.profilePhoto = {
              id: photoAssetId
          } 
      }

      if(selectedHeaderPhotoFile && selectedHeaderPhotoFile !== null) {
          const photoAssetId = await saveSelectedPhotoAsset(selectedHeaderPhotoFile);
      
          updatedProfile.headerPhoto = {
              id: photoAssetId
          } 
      }

      const updateProfileRequestBody = {
          body: {
              ...updatedProfile
            }
      }
      console.log(`updateProfileRequestBody ${JSON.stringify(updateProfileRequestBody, null, 2)}`);
      const response = await API.put("UserProfileManagementApi", `/loopmakerProfile/${loopmakerProfile?.id}`, updateProfileRequestBody);

      //setDisplayName(response?.profile?.name)
      setIsSaving(false)
      setFormChanged(false)
      toast.success("Profile updated!", {
          position: toast.POSITION.BOTTOM_CENTER
      });    
  }

  const onAddCreditFormSubmit = async (e: any) => {
      e.preventDefault();
      toast.success("Successfully submitted credit for review!", {
          position: toast.POSITION.BOTTOM_CENTER
        });
        API.post("SubmissionsApi", "/submitcredit", {
          body: {
              username: loopmakerProfile?.username,
              displayName: loopmakerProfile?.displayName,
              songUrl: addCreditSongLink,
              loopUrl: addCreditLoopLink
          }
      })
      handleCloseAddCreditModal();
      setAddCreditSongLink("");
      setAddCreditLoopLink("");
  }

  useEffect(() => {
    console.log(`credits ${JSON.stringify(credits, null, 2)}`);
  }, [credits]);
  


  if (isError) return <div>Failed to load</div>
  if (isLoading  ||  loopmakerCredits?.isLoading) return <Spinner />

  return (
    <>
      <Desktop>
      <div style={{position: "relative"}}>
                <div style={{position: "absolute", 
                    top: "0px", 
                    width: "100%", 
                }}>
                    <Image style={{ objectFit: "cover", width: "100%", height: "40vh", cursor: "pointer"}} fluid id="headerImg" src={getHeaderImgSrc()} alt={displayName}/>
                    <input ref={headerPhotoInputRef as any} type="file" style={{display : "none"}} onChange={headerPhotoFileSelectedHandler}/>
                </div>
            </div>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-4" style={{width: "50%"}}>
                    <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                        <div>
                            <Avatar id="profileImg" onClick={onProfileImgClick} src={getImgSrc()} alt={displayName} sx={{ width: 100, height: 100 }} style={{cursor: "pointer"}}/>
                            <input ref={profilePhotoInputRef as any} type="file" style={{display : "none"}} onChange={profilePhotoFileSelectedHandler}/>
                        </div>
                        <Form onSubmit={onFormSubmit} style={{width: "100%"}}>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Name</b>
                            </Form.Label>
                            <Form.Control 
                                type="name" 
                                placeholder="Name" 
                                onChange={onDisplayNameInput} 
                                value={displayName}
                                style={{width: "100%"}}
                            />
                        </Form.Group>    
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Username</b>
                            </Form.Label>
                            <Form.Control 
                                type="username" 
                                placeholder="username" 
                                onChange={onUsernameInput} 
                                value={usernameData}
                                style={{width: "100%"}}
                            />
                        </Form.Group>                      
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Website</b>
                            </Form.Label>
                            <Form.Control 
                                type="website" 
                                placeholder="website" 
                                onChange={onWebsiteInput} 
                                value={website}
                                style={{width: "100%"}}
                            />
                        </Form.Group>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Bio</b>
                            </Form.Label>
                            <Form.Control 
                                as="textarea" 
                                type="bio" 
                                rows={3}
                                placeholder="Bio" 
                                onChange={onBioInput} 
                                value={bio}
                                style={{width: "100%"}}
                            />
                        </Form.Group>
                        <div style={{marginTop: "1rem"}}>
                            <NextLink href={`/loopmakers/${loopmakerProfile?.username}`}><p style={{textAlign: "center"}}>View my profile</p></NextLink>
                        </div>
                        <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><a href={loopmakerProfile?.twitterUrl} style={{color: "black"}}><FontAwesomeIcon size="lg" icon={faTwitter} /></a></span> <span><a href={loopmakerProfile?.facebookUrl} style={{color: "black"}}><FontAwesomeIcon size="lg" icon={faFacebook} /></a></span> <span><a href={loopmakerProfile?.instagramUrl} style={{color: "black"}}><FontAwesomeIcon size="lg" icon={faInstagram} /></a></span> <span></span> </div>
                        { formChanged && (<Form.Group as={Row} style={{marginTop: "1em"}}>
                                    <div style={{textAlign: "center"}}>
                                        <Button type="submit" variant="success" disabled={isSaving ? true : false}>{ isSaving ? "Saving..." : "Save Changes" }</Button>
                                    </div>
                                </Form.Group>)}
                        </Form>
                    </div>
                </div>
            </div>
            <Container style={{ marginBottom: "5em" }}>
                <>
                  <UserProfileSubHeading>Credits</UserProfileSubHeading>
                  <div style={{textAlign: "center", marginBottom: "1rem"}}>
                    <AddCreditButton onClick={handleShowAddCreditModal}>+ Add a Credit</AddCreditButton>
                  </div>
                  <CreditsList credits={credits}/>
                </>
                </Container>
      </Desktop>
    </>
  );
};

export default EditLoopmaker;
