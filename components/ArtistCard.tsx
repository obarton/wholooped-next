import React from 'react'
import { Card, Image } from "react-bootstrap";
import Link from "next/link"
import styled from "styled-components"

const ArtistCard = ({title, imageSrc, altText, url}: any) => {
    const StyledLink = styled.a`
    color: black;
    text-decoration: none;
  `

    return (
        <Link href={url || ""} passHref>
            <StyledLink>
                <div>
                    <Card border="light" className="border-0" style={{ textAlign: "center" }}>
                        <Card.Body>
                            <Image src={imageSrc} alt={altText} style={{ borderRadius: "50%"}}/>
                            <Card.Title style={{marginTop: '1rem'}}><b>{title}</b></Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </StyledLink>
        </Link>
    )
}

export default ArtistCard
