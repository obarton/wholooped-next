import React from "react"
import Image from 'next/image'
import NextLink from "../NextLink"

interface SplicePlayerProps {
    url: string;
}

const SplicePlayer = ({ url }: SplicePlayerProps) => {
    return(
        <NextLink href={url}>
            <div style={{width: "300px", height: "150px", backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Image src="/play-button-white.png" alt="me" width="24" height="24" />
            </div>
        </NextLink>
    )
}

export default SplicePlayer