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
import { useRouter } from "next/router";

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

export const saveSelectedContentfulPhotoAsset = async (selectedPhotoFile: any) => {
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
        .then((asset) => asset.processForAllLocales())
        .then((asset) => asset.publish())
        .catch(console.error)

        return (publishContentResponse as any).sys.id;
    }

    return null;
}


const CreateLoopmaker = () => {
  const { userProfile, isLoading, isError } = useUserProfile()
  
  const loopmakerProfile = userProfile?.linkedLoopmaker;
  const loopmakerCredits = useLoopmakerCredits(loopmakerProfile?.id);

  const [selectedProfilePhotoFile, setSelectedProfilePhotoFile] = useState(null)
  const [selectedHeaderPhotoFile, setSelectedHeaderPhotoFile] = useState(null)
  const [formChanged, setFormChanged] = useState(false)
  const [isSaving, setIsSaving] = useState(false);
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [usernameData, setUsernameData] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [profilePhotoPreview, setProfilePhotoPreview] = useState();
  const [headerPhotoPreview, setHeaderPhotoPreview] = useState();
  const profilePhotoInputRef = useRef()
  const headerPhotoInputRef = useRef()
  const router = useRouter();

  const onDisplayNameInput = ({ target: { value } }: any) => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setDisplayName(value)
  }

  const onTwitterUrlInput = ({ target: { value } }: any) => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setTwitterUrl(value)
  }

  const onFacebookUrlInput = ({ target: { value } }: any) => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setFacebookUrl(value)
  }

  const onInstagramUrlInput = ({ target: { value } }: any) => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setInstagramUrl(value)
  }

  const onBioInput = ({ target: { value } }: any) => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setBio(value)
  }

  const onWebsiteInput = ({ target: { value } }: any) => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setWebsite(value)
  }

  const onUsernameInput = ({ target: { value } }: any) => {
      if (!formChanged) {
          setFormChanged(true)
      }

      setUsernameData(value)
  }

  const getImgSrc = () => {
      if (profilePhotoPreview) {
          return profilePhotoPreview;
      }

      return ""
  }

  const getHeaderImgSrc = () => {
      if(headerPhotoPreview) {
          return headerPhotoPreview;
      }

      return "https://www.guardianoffshore.com.au/wp-content/uploads/2015/03/banner-placeholder.jpg"
  }

  useEffect(() => {
    console.log(`CreateLoopmakerProfile ${JSON.stringify(userProfile, null, 2)}`)
  }, [userProfile]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
      if (!selectedProfilePhotoFile) {
          setProfilePhotoPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedProfilePhotoFile)
      setProfilePhotoPreview(objectUrl as any)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedProfilePhotoFile])

  useEffect(() => {
      if (!selectedHeaderPhotoFile) {
          setHeaderPhotoPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedHeaderPhotoFile)
      setHeaderPhotoPreview(objectUrl as any)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedHeaderPhotoFile])


  const onProfileImgClick = () => {
      (profilePhotoInputRef?.current as any).click()
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

  const onFormSubmit = async (e: any) => {
      e.preventDefault()
      const loopmakerProfile = {
          name: displayName,
          username: userProfile?.name,
          bio,
          websiteUrl: website,
          twitterUrl,
          instagramUrl,
          facebookUrl
      };

      setIsSaving(true)

      if(selectedProfilePhotoFile && selectedProfilePhotoFile !== null) {
          const photoAssetId = await saveSelectedContentfulPhotoAsset(selectedProfilePhotoFile);
      
          (loopmakerProfile as any).profilePhoto = {
              id: photoAssetId
          } 
      }

      if(selectedHeaderPhotoFile && selectedHeaderPhotoFile !== null) {
          const photoAssetId = await saveSelectedContentfulPhotoAsset(selectedHeaderPhotoFile);
      
          (loopmakerProfile as any).headerPhoto = {
              id: photoAssetId
          } 
      }

      const createProfileRequestBody = {
          body: {
              userEntryId: userProfile.id,
              loopmakerProfile
            }
      }


      console.log(`createProfileRequestBody ${JSON.stringify(createProfileRequestBody, null, 2)}`);
      const response = await API.post("UserProfileManagementApi", `/loopmakerProfile`, createProfileRequestBody).then(() => {
          setDisplayName("")
          setBio("")
          setWebsite("");
          setUsernameData("");
          setTwitterUrl("");
          setFacebookUrl("");
          setInstagramUrl("");
          setIsSaving(false)
          setFormChanged(false)
          toast.success("Profile created!", {
              position: toast.POSITION.BOTTOM_CENTER
          });
          
      })
      .finally(() => {
          router.push("/profile/loopmaker/edit")
      });
  }


  if (isError) return <div>Failed to load</div>
  if (isLoading  ||  loopmakerCredits?.isLoading) return <Spinner />

  return (
    <>
      <Desktop>
      <>  
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-4" style={{width: "100%"}}>
                    <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                        <div style={{textAlign: "center"}}>
                            <h5 style={{textAlign: "center"}}>Profile Photo</h5>
                            <Avatar id="profileImg" onClick={onProfileImgClick} src={getImgSrc()} alt={displayName} sx={{ width: 100, height: 100 }} style={{cursor: "pointer"}}/>
                            <input ref={profilePhotoInputRef as any} type="file" style={{display : "none"}} onChange={profilePhotoFileSelectedHandler}/>
                        </div>
                        <Form onSubmit={onFormSubmit} style={{width: "100%"}}>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Name</b>
                            </Form.Label>
                            <Form.Control 
                                type="displayName" 
                                placeholder="Name" 
                                onChange={onDisplayNameInput} 
                                value={displayName}
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>                      
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Website</b>
                            </Form.Label>
                            <Form.Control 
                                type="website" 
                                placeholder="Website" 
                                onChange={onWebsiteInput} 
                                value={website}
                                style={{width: "100%", borderRadius: "0"}}
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
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Twitter Account</b>
                            </Form.Label>
                            <Form.Control 
                                type="website" 
                                placeholder="Ex: https://www.twitter.com/wholooped" 
                                onChange={onTwitterUrlInput} 
                                value={twitterUrl}
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Instagram Account</b>
                            </Form.Label>
                            <Form.Control 
                                type="website" 
                                placeholder="Ex: https://www.instagram.com/wholooped" 
                                onChange={onInstagramUrlInput} 
                                value={instagramUrl}
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Facebook Account</b>
                            </Form.Label>
                            <Form.Control 
                                type="website" 
                                placeholder="Ex: https://www.facebook.com/wholooped" 
                                onChange={onFacebookUrlInput} 
                                value={facebookUrl}
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>
                        <Form.Group as={Row} style={{marginTop: "1em"}}>
                            <div style={{textAlign: "center"}}>
                                <Button type="submit" style={{borderRadius: "0"}} variant="primary" disabled={!formChanged || (displayName == "") || (isSaving ? true : false)}>{ isSaving ? "Saving..." : "Continue" }</Button>
                            </div>
                        </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
                </>
      </Desktop>
      <Mobile>
      <>  
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-4" style={{width: "100%"}}>
                    <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                        <div style={{textAlign: "center"}}>
                            <h5 style={{textAlign: "center"}}>Profile Photo</h5>
                            <Avatar id="profileImg" onClick={onProfileImgClick} src={getImgSrc()} alt={displayName} sx={{ width: 100, height: 100 }} style={{cursor: "pointer"}}/>
                            <input ref={profilePhotoInputRef as any} type="file" style={{display : "none"}} onChange={profilePhotoFileSelectedHandler}/>
                        </div>
                        <Form onSubmit={onFormSubmit} style={{width: "100%"}}>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Name</b>
                            </Form.Label>
                            <Form.Control 
                                type="displayName" 
                                placeholder="Name" 
                                onChange={onDisplayNameInput} 
                                value={displayName}
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>                      
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Website</b>
                            </Form.Label>
                            <Form.Control 
                                type="website" 
                                placeholder="Website" 
                                onChange={onWebsiteInput} 
                                value={website}
                                style={{width: "100%", borderRadius: "0"}}
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
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Twitter Account</b>
                            </Form.Label>
                            <Form.Control 
                                type="website" 
                                placeholder="Ex: https://www.twitter.com/wholooped" 
                                onChange={onTwitterUrlInput} 
                                value={twitterUrl}
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Instagram Account</b>
                            </Form.Label>
                            <Form.Control 
                                type="website" 
                                placeholder="Ex: https://www.instagram.com/wholooped" 
                                onChange={onInstagramUrlInput} 
                                value={instagramUrl}
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>
                        <Form.Group style={{width: "100%"}}>
                        <Form.Label>
                            <b>Facebook Account</b>
                            </Form.Label>
                            <Form.Control 
                                type="website" 
                                placeholder="Ex: https://www.facebook.com/wholooped" 
                                onChange={onFacebookUrlInput} 
                                value={facebookUrl}
                                style={{width: "100%", borderRadius: "0"}}
                            />
                        </Form.Group>
                        <Form.Group as={Row} style={{marginTop: "1em"}}>
                            <div style={{textAlign: "center"}}>
                                <Button type="submit" style={{borderRadius: "0"}} variant="primary" disabled={!formChanged || (displayName == "") || (isSaving ? true : false)}>{ isSaving ? "Saving..." : "Continue" }</Button>
                            </div>
                        </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
                </>
    </Mobile>
    </>
  );
};

export default CreateLoopmaker;
