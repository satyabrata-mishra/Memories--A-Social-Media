import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

export default function Cards({ image, authorName, timeSpan, tags, name, desc, isLiked, noOfLikes }) {
  const [liked, setliked] = useState(isLiked);
  const [showFull, setshowFull] = useState(true);
  const [likeCount, setlikeCount] = useState(noOfLikes);
  const handleLike = () => {
    setliked(!liked);
    isLiked = liked;
    if(liked){
      setlikeCount(likeCount-1);
    }else{
      setlikeCount(likeCount+1);
    }
  };
  const descrptionController = () => {
    setshowFull(!showFull);
  };
  return (
    <Container>
      <div className="card">
        <img src={image} alt="" />
        <p className='author'>{authorName}</p>
        <p className='timespan'>{timeSpan}</p>
        <p className='tag'>#{tags}</p>
        <p className='name'>{name}</p>
        <p className='description'>{desc ? desc.length > 120 ? desc.substring(0, 120) : desc : ""}
          <span onClick={descrptionController}>{showFull ? "..." : desc.substring(120)}</span></p>
        {showFull ? <p className='like'>{liked ? <AiFillLike onClick={handleLike} /> : <AiOutlineLike onClick={handleLike} />}  {likeCount} LIKE</p> : ""}
      </div>
    </Container>
  )
}
const Container = styled.div`
    .card{
      min-height: 20rem;
      width: 17rem;
      margin-bottom: 1rem;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 0 10px gray;
      padding-bottom: 1rem;
      img{
        width: 17rem;
        height: 10rem;
        filter: brightness(50%);
      }
      .author{
        font-weight: 900;
        margin: 0 0 0 1rem;
        color: white;
        position: relative;
        top: -8.9rem;
      }
      .timespan{
        font-weight: 100;
        font-size: 0.6rem;
        margin: 0 0 0 1rem;
        color: white;
        position: relative;
        top: -8.4rem;
      }
      .tag{
        font-weight: 100;
        font-size: 0.8rem;
        margin: 0 0 0 1rem;
        position: relative;
        top: -1rem;
        color : #7c7979;
      }
      .name{
        font-weight: 600;
        font-size: 1rem;
        margin: 0 0 0 1rem;
        color: black;
        position: relative;
        top: -0.5rem;
      }
      .description{
        font-weight: 100;
        font-size: 0.8rem;
        margin: 0 0 0 1rem;
        position: relative;
        color : #7c7979;
      }
      .like{
        font-weight: 100;
        font-size: 0.85rem;
        margin: 0 0 0 1rem;
        position: relative;
        top: 1rem;
        color : black;
        user-select: none;
        svg{
          font-size: 1.4rem;
          position: relative;
          top: 0.2rem;
          cursor: pointer;
        }
      }
    }
`;