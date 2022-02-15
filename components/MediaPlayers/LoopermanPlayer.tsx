import React from 'react'
import AudioPlayer from "react-h5-audio-player"
import 'react-h5-audio-player/lib/styles.css';

const LoopermanPlayer = ({ url }: any) => {
    return (
        <div style={{paddingTop: "2em", paddingBottom: "2em"}}>
            <AudioPlayer style={{width: "300px"}} src={url} customAdditionalControls={[]} />
        </div>
    )
}

export default LoopermanPlayer