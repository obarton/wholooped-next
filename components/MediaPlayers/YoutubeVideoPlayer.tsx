import React from "react"

interface YoutubeVideoPlayerProps {
  videoId: string
  videoTitle: string
}

const YoutubeVideoPlayer = ({ videoId, videoTitle }: YoutubeVideoPlayerProps) => (
  <div className="video">
    <iframe 
    // width="560" 
    // height="315" 
    src={`https://www.youtube.com/embed/${videoId}`}
    title={videoTitle}
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen></iframe>
  </div>
)
export default YoutubeVideoPlayer