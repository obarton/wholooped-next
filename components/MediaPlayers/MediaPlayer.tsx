import React, { useEffect } from 'react';
import { PlatformType } from '../../types/Platform';
import { parseYoutubeIdFromUrl } from '../../utils/youtube';
import LoopermanPlayer from './LoopermanPlayer';
import SoundCloudPlayer from './SoundCloudPlayer';
import YoutubeVideoPlayer from './YoutubeVideoPlayer';

interface MediaPlayerProps {
    platform: string;
    mediaUrl: string;
    title: string;
    mediaId?: string;
}

const MediaPlayer = ({ platform, title, mediaUrl, mediaId }: MediaPlayerProps) => {
  return (
        <>
            {
                (platform === PlatformType.YouTube ? <YoutubeVideoPlayer videoId={parseYoutubeIdFromUrl(mediaUrl) as string} videoTitle={title}/>  : <></>)
            }
            {
                (platform === PlatformType.SoundCloud ? <SoundCloudPlayer trackId={mediaId}/>  : <></>)
            }
            {
                (platform === PlatformType.Looperman ? <LoopermanPlayer url={mediaUrl}/> : <></>)
            }
        </>
  );
};

export default MediaPlayer;
