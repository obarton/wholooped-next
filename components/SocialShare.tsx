import React from 'react';
import { Stack } from 'react-bootstrap';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon } from 'react-share';
import { getBrowserWindowUrl } from '../utils/browser';

const SocialShare = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1em"}}>
        <Stack direction="horizontal" gap={2}>
        <div><FacebookShareButton url={getBrowserWindowUrl()}><FacebookIcon size={32} round={true}/></FacebookShareButton></div>
        <div><TwitterShareButton url={getBrowserWindowUrl()}><TwitterIcon size={32} round={true}/></TwitterShareButton></div>
        <div><RedditShareButton url={getBrowserWindowUrl()}><RedditIcon size={32} round={true}/></RedditShareButton></div>
        </Stack>        
    </div>
  );
};

export default SocialShare;
