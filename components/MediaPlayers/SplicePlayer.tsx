import React from "react"
import Image from 'next/image'

interface SplicePlayerProps {
    url: string;
}

const SplicePlayer = ({ url }: SplicePlayerProps) => {
    return(
        <a target="_blank" href={url} rel="noreferrer">
            <div style={{width: "300px", height: "150px", backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Image src="/play-button-white.png" alt="me" width="24" height="24" />
            </div>
        </a>
    )
}

export default SplicePlayer