import React from 'react'
import { Card } from "react-bootstrap";
import TruncateMarkup from 'react-truncate-markup';
import TextTruncate from 'react-text-truncate';
import Link from "next/link"
import styled from "styled-components"
import Artwork from './Artwork';
import InlineAvatar from './InlineAvatar';

const StyledLink = styled.a`
  color: black;
  text-decoration: none;
`

const UserAlbumCard = ({ url, title, secondaryText, imageSrc, altText, width, username, userDisplayName, userThumbnailUrl, userUrl}: any) => {
    return (
        <div>
            <Card border="light" className="border-0" style={{textAlign: "center"}}>
                <Card.Body>
                        <Link href={url || ""} passHref>
                            <StyledLink>
                                <Artwork src={imageSrc} alt={altText}/>
                                <Card.Title style={{marginTop: '1rem', fontSize: "1rem"}}><TruncateMarkup lines={1}><b>{title}</b></TruncateMarkup></Card.Title>
                                <Card.Text style={{marginBottom: "0.5em", width: "100%"}}>
                                <TextTruncate
                                        line={1}
                                        truncateText="…"
                                        text={secondaryText}
                                    />
                                </Card.Text>
                            </StyledLink>
                        </Link>
                    <Card.Text>
                    <p style={{padding: "0", margin: "0", color: "#666C7E", fontSize:"0.9em"}}>Uploaded by</p>
                    <div style={{display: "flex", justifyContent: "center", marginTop: "0.5em"}}> 
                        <InlineAvatar redirectUrl={userUrl} thumbnailUrl={userThumbnailUrl} text={userDisplayName}/>
                     </div>
                    </Card.Text>                        
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserAlbumCard
