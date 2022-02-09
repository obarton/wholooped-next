import React, { useState, useEffect, useRef } from 'react'
import Container from "react-bootstrap/Container"
import * as contentful from "contentful-management"
import styled from "styled-components"
import { API } from "aws-amplify"
import Avatar from "@mui/material/Avatar"
import { Desktop, Mobile } from "../../../../components/Responsive"
import { Image, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { toast } from 'react-toastify';
import Spinner from '../../../../components/Spinner'
import { useUserProfile } from '../../../../hooks/useUserProfile'
import NextLink from '../../../../components/NextLink'
import { useLoopmakerCredits } from '../../../../hooks/useLoopmakerCredits'
import CreditsList from '../../../../components/CreditsList'
import AddSongModal from '../../../../components/AddSongModal'
import { resizeImageFromUrl } from '../../../../helper/image'
import { useUsers } from '../../../../hooks/useUsers'
import Layout from '../../../../components/Layout'
import { PageTitles } from '../../../../utils/page'

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
      accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || ""
    })
  
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || "")
    return await space.getEnvironment('master');
  }


const EditUser = () => {
  const { user, userProfile, isLoading, isError } = useUserProfile()
  const usersApiResponse = useUsers(userProfile?.name as string)
  
  const profile = userProfile?.profile;

  const [selectedProfilePhotoFile, setSelectedProfilePhotoFile] = useState(null)
  const [formChanged, setFormChanged] = useState(false)
  const [isSaving, setIsSaving] = useState(false);
  const [bio, setBio] = useState(profile?.bio);
  const [displayName, setDisplayName] = useState(profile?.displayName);
  const [usernameData, setUsernameData] = useState(profile?.name);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState();
  const profilePhotoInputRef = useRef()
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);
  const [uploads, setUploads] = useState(user?.contributions);
  const handleCloseAddCreditModal = () => setShowAddCreditModal(false);
  const handleShowAddCreditModal = () => setShowAddCreditModal(true);

  useEffect(() => {
    if(userProfile) {
      const { bio, name, displayName} = userProfile;

      setBio(bio)
      setDisplayName(displayName)
      setUsernameData(name)
    }

  }, [userProfile]);

  useEffect(() => {
    if(usersApiResponse.user) {
      const { contributions } = usersApiResponse.user;

      setUploads(contributions)
    }

  }, [usersApiResponse]);


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

  const onUsernameInput = ({ target: { value }}: any)  => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setUsernameData(value)
  }

  const getImgSrc = () => {
      if (profilePhotoPreview) {
          return profilePhotoPreview;
      }

      return resizeImageFromUrl(userProfile?.photo?.url)
  }

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

  const onProfileImgClick = () => {
      (profilePhotoInputRef?.current as any)?.click()
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
      const updatedProfile = profile;
      updatedProfile.name = displayName;
      updatedProfile.username = usernameData;
      updatedProfile.bio = bio;

      setIsSaving(true)

      if(selectedProfilePhotoFile && selectedProfilePhotoFile !== null) {
          const photoAssetId = await saveSelectedPhotoAsset(selectedProfilePhotoFile);
      
          updatedProfile.photo = {
              id: photoAssetId
          } 
      }

      const updateProfileRequestBody = {
          body: {
              ...updatedProfile
            }
      }
      const response = await API.put("UserProfileManagementApi", `/userProfile/${profile?.id}`, updateProfileRequestBody);

      setDisplayName(response?.profile?.name)
      setIsSaving(false)
      setFormChanged(false)
      toast.success("Profile updated!", {
          position: toast.POSITION.BOTTOM_CENTER
      });    
  }

  if (isError) { 
        return (
            <Layout title={PageTitles.EditLoopmakerProfile}>
            <div>Failed to load</div>
            </Layout>
        )
    }

    if (isLoading || usersApiResponse.isLoading) { 
        return (
            <Layout title={PageTitles.EditLoopmakerProfile}>
                <Spinner />
            </Layout>
        )
    }

  return (
    <Layout title={PageTitles.EditUserProfile}>
        <Desktop>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center" >
                <div className="card p-4" style={{width: "60%"}}>
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
                                placeholder="Username" 
                                onChange={onUsernameInput} 
                                value={usernameData}
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
                            <NextLink href={`/users/${usernameData}`}><p style={{textAlign: "center", color: "#4183c4"}}>View my profile</p></NextLink>
                        </div>
                        { formChanged && (<Form.Group as={Row} style={{marginTop: "1em"}}>
                                    <div style={{textAlign: "center"}}>
                                        <Button type="submit" variant="success" disabled={isSaving ? true : false}>{ isSaving ? "Saving..." : "Save Changes" }</Button>
                                    </div>
                                </Form.Group>)}
                        </Form>
                    </div>
                </div>
            </div>
            <Container style={{ marginBottom: "5em"}}>
                  <UserProfileSubHeading>Uploads</UserProfileSubHeading>
                  <div style={{textAlign: "center", marginBottom: "1rem"}}>
                    <AddCreditButton onClick={handleShowAddCreditModal}>+ Add A Song</AddCreditButton>
                  </div>
                <CreditsList credits={uploads}/>
            </Container>    
    </Desktop>
      <Mobile>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center" >
                <div className="card p-4" style={{width: "100%"}}>
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
                                placeholder="Username" 
                                onChange={onUsernameInput} 
                                value={usernameData}
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
                            <NextLink href={`/users/${usernameData}`}><p style={{textAlign: "center", color: "#4183c4"}}>View my profile</p></NextLink>
                        </div>
                        { formChanged && (<Form.Group as={Row} style={{marginTop: "1em"}}>
                                    <div style={{textAlign: "center"}}>
                                        <Button type="submit" variant="success" disabled={isSaving ? true : false}>{ isSaving ? "Saving..." : "Save Changes" }</Button>
                                    </div>
                                </Form.Group>)}
                        </Form>
                    </div>
                </div>
            </div>
            <Container style={{ marginBottom: "5em"}}>
                  <UserProfileSubHeading>Uploads</UserProfileSubHeading>
                  <div style={{textAlign: "center", marginBottom: "1rem"}}>
                    <AddCreditButton onClick={handleShowAddCreditModal}>+ Add A Song</AddCreditButton>
                  </div>
                <CreditsList credits={uploads}/>
            </Container>    
    </Mobile>
    <AddSongModal show={showAddCreditModal} onHide={handleCloseAddCreditModal}/>
    </Layout>
  );
};

export default EditUser;
