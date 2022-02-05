import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

const LoopermanPlayer = ({ url }: any) => {
    return (
        <div style={{paddingTop: "3.5em", paddingBottom: "3.5em"}}>
        <ReactAudioPlayer
        src={url}
        controls
        />
        </div>
    )
}

export default LoopermanPlayer