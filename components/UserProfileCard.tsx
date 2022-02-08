import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { Avatar } from "@mui/material"
import styled from "styled-components"
import { useRouter } from "next/router"

interface UserProfileCardProps {
    avatarSrc: string; 
    username: string;
    displayName: string;
    websiteUrl?: string;
    bio?: string;
    uploads?: any;
    twitterUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    canEdit?: boolean;
}

const EditProfileButton = styled.button`
    height: 40px;
    width: 150px;
    border: none;
    background-color: #000;
    color: white;
    font-size: 15px
`


const UserProfileCard = ({ 
    avatarSrc, 
    websiteUrl,
    username,
    displayName,
    bio, 
    uploads,
    twitterUrl,
    facebookUrl,
    instagramUrl,
    canEdit
}: UserProfileCardProps) => {

    const router = useRouter()
    
  return (
    <div className="card p-4" style={{width: "100%"}}>
        <div className=" image d-flex flex-column justify-content-center align-items-center"> 
            <Avatar src={avatarSrc} sx={{ width: 100, height: 100 }}/>
        <span className="name mt-3" style={{fontWeight: "700", fontSize: "1.5rem"}}><b>{displayName}</b></span> <span className="idd" style={{fontWeight: "600", fontSize: "1rem"}}><b>@{username}</b></span>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
                <span className="idd1"><a href={websiteUrl}>{websiteUrl}</a></span> <span><i className="fa fa-copy"></i></span> 
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
                <span className="number" style={{fontSize: "1.5rem", fontWeight: "bold"}}>{uploads?.length} <span className="follow" style={{fontSize: "12px", fontWeight: "500", color: "#444444"}}>Uploads</span></span> 
            </div>
            {
            canEdit && (
                <div className=" d-flex mt-2">
                    <EditProfileButton className="btn-dark" onClick={() => router.push(`/profile/user/edit`)}>Edit Profile</EditProfileButton> 
                </div>
            )
            }

            <div className="text mt-3"> <span>{bio?.split('\n').map((i: any, key: any) => <p key={key}>{i}</p>)}</span> </div>
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">{twitterUrl && <span><a href={twitterUrl} style={{color: "black"}}><FontAwesomeIcon size="lg" icon={faTwitter} /></a></span>}{facebookUrl && <span><a href={facebookUrl} style={{color: "black"}}><FontAwesomeIcon size="lg" icon={faFacebook} /></a></span>}{instagramUrl && <span><a href={instagramUrl} style={{color: "black"}}><FontAwesomeIcon size="lg" icon={faInstagram} /></a></span>} <span></span> </div> 
            {/* <div className=" px-2 rounded mt-4 date "> <span className="join">Joined {moment(dateJoined).format("MMM YYYY")}</span> </div> */}
        </div>
    </div>
  );
};

export default UserProfileCard;
