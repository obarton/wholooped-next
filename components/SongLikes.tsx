import React, { useState } from 'react';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { API } from "aws-amplify";

interface SongLikesProps {
    song: any;
    user: any;
    isSongLiked: any;
}

const SongLikes = ({ song, user, isSongLiked }: SongLikesProps) => {
    const [likesCount, setLikesCount] = useState(song?.likesCount || 0)
    const [isLiked, setIsLiked] = useState(isSongLiked);
    const itemId = `${song?.id}:${song?.loop[0].id}`;

    function sendLikeInteraction() {     
        return API.post("InteractionsApi", "/", {
          body: {
            interactionType: "LIKE",
            data: {
              userId: user?.sub,
              itemId
            }
          }
        });
      }
  
      function sendUnlikeInteraction() {
        
        return API.post("InteractionsApi", "/", {
          body: {
            interactionType: "UNLIKE",
            data: {
              userId: user?.sub,
              itemId
            }
          }
        });
      }
  
    const toggleLikeButton = () => {
        setIsLiked(!isLiked)
  
        if (isLiked) {
          let updatedLikeCount = likesCount - 1;
          sendUnlikeInteraction()
          setLikesCount(updatedLikeCount)
        }
  
        if (!isLiked) {
          let updatedLikeCount = likesCount + 1;
          sendLikeInteraction()
          setLikesCount(updatedLikeCount)
        }
    }

    const likeClickHandler = () => {
        if(user) {
            toggleLikeButton()
        }
    }


  return (
    <div style={{
        margin: 'auto',
        display: 'block',
        width: 'fit-content',
        verticalAlign: 'middle',
        paddingTop: "0.5rem"
      }}
        onClick={likeClickHandler}
      >
        {
          user ? 
          (
            isLiked ? <Favorite /> : <FavoriteBorder />
          ) 
          : 
          (
            <FavoriteBorder />
          )
        }
        <span style={{marginLeft: "0.4em"}}>{likesCount} like{likesCount == 1 ? "" : "s"}</span>
      </div>
  );
};

export default SongLikes;
