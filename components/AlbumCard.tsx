import React from 'react'
import { Card, Image } from "react-bootstrap";
import TruncateMarkup from 'react-truncate-markup';
import Link from "next/link"
import styled from "styled-components"

const AlbumCard = ({title, secondaryText, imageSrc, altText, width, url}: any) => {
    const StyledLink = styled.a`
    color: black;
    text-decoration: none;
  `

    return (
        <Link href={url || ""} passHref>
            <StyledLink>
                <div>
                    <Card border="light" className="border-0" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
                        <Card.Body>
                        <Image src={imageSrc} alt={altText} style={{ borderRadius: "8px"}}/>
                            <Card.Title style={{marginTop: '1rem', fontSize: "1rem"}}><b>{title}</b></Card.Title>
                            <Card.Text style={{color: "#666C7E"}}>
                                {secondaryText}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </StyledLink>
        </Link>
    )
}

export default AlbumCard
