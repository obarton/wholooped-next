import React from 'react'
import { Card, Image } from "react-bootstrap";
import Link from "next/link"
import styled from "styled-components"
import Artwork from './Artwork';

const AlbumCard = ({title, secondaryText, imageSrc, altText, url}: any) => {
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
                        <Artwork src={imageSrc} alt={altText} />
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
