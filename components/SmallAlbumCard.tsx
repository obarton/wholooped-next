import React from 'react'
import { Card, Image } from "react-bootstrap";
import TruncateMarkup from 'react-truncate-markup';
import TextTruncate from 'react-text-truncate';
import Link from "next/link"
import styled from 'styled-components';

const StyledLink = styled.a`
    color: black;
    text-decoration: none;
`
const SmallAlbumCard = ({title, secondaryText, imageSrc, altText, width, url}: any) => {
    return (
        <Link href={url || ""} passHref>
        <StyledLink>
        <div>
         {/* <div style={{display: "flex", justifyContent: "center" }}> */}
            <Card border="light" className="border-0" style={{textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
                <Card.Body style={{padding: "0"}}>
                <Image src={imageSrc} alt={altText} style={{ borderRadius: "4px"}}/>
                    <Card.Title style={{marginTop: '1rem', fontSize: "1rem"}}><b>                        <TextTruncate
                            line={1}
                            truncateText="…"
                            text={title}
                        /></b></Card.Title>
                    <Card.Text>
                        <TextTruncate
                            line={1}
                            truncateText="…"
                            text={secondaryText}
                        />
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        </StyledLink>
        </Link>
    )
}

export default SmallAlbumCard
