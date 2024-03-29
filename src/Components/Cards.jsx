import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineLike, AiFillLike, AiOutlineDelete } from 'react-icons/ai';
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs';
import { FcComments } from 'react-icons/fc'
import { FiEdit } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { host } from '../Utils/constants';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../Utils/firebase-config';

export default function Cards({ id, email, fetchAllData, showDelete, image, authorName, timeSpan, tags, name, desc, isLiked, noOfLikes, noOfComments, saved, calledFromSaved, removedFromPost }) {
  const navigate = useNavigate();
  const [showFull, setshowFull] = useState(true);
  const [editForm, seteditForm] = useState(false);
  const [isSaved, setisSaved] = useState(saved);
  const [details, setdetails] = useState({
    locationName: name,
    locationDesp: desc,
    location: tags,
    imageURL: image
  });
  const [currentUserEmail, setcurrentUserEmail] = useState("");

  useEffect(() => {
    setisSaved(saved);
  }, [saved]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setcurrentUserEmail(currentUser.email);
      }
    });
  }, []);

  const handleEdit = async () => {
    seteditForm(!editForm);
  };

  const descrptionController = () => {
    setshowFull(!showFull);
  };

  const handleChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleClear = (e) => {
    e.preventDefault();
    setdetails({
      locationName: "",
      locationDesp: "",
      location: "",
      imageURL: ""
    });
  };

  const handleLike = async () => {
    try {
      await fetch(`${host}/posts/likepost/${id}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });
      fetchAllData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${host}/posts/deleteapost/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchAllData();
    } catch (error) {
      alert(error.message);
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    seteditForm(false);
    try {
      await fetch(`${host}/posts/editapost/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          locationName: details.locationName,
          locationDesp: details.locationDesp,
          location: details.location,
          imageURL: details.imageURL
        })
      });
      fetchAllData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClick = () => {
    localStorage.setItem("id", id);
    navigate("/comments");
  };

  const addToSaved = async () => {
    try {
      await fetch(`${host}/saved/addtosaved`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": currentUserEmail,
          "post": id
        })
      });
      setisSaved(!isSaved);
    } catch (error) {
      alert(error.message);
    }
    if (calledFromSaved) {
      removedFromPost(id);
    }
  }
  return (
    <Container>
      <div className="card" >
        <img src={image} alt="Not Avaliable" />
        <p className='author'>{authorName}</p>
        <p className='timespan'>{timeSpan}</p>
        <div className="saved">
          <p className='tag'><GoLocation /> {tags}</p>
          <span onClick={addToSaved} className='bookmark'>{isSaved ? <BsBookmarks /> : <BsBookmarksFill />}</span>
        </div>
        <p className='name'>{name}</p>
        <p className='description'>
          {desc ? desc.length > 120 ? desc.substring(0, 120) : desc : ""}
          <span onClick={descrptionController}>{showFull && desc.length > 120 ? "..." : desc.substring(120)}</span>
        </p>
        {
          showFull
            ? <p className='like'>{isLiked ? <AiFillLike onClick={handleLike} />
              : <AiOutlineLike onClick={handleLike} />}
              {noOfLikes} LIKE  <FcComments onClick={handleClick} /> {noOfComments} COMMENTS
              <span className='edit'>{!calledFromSaved && showDelete ? <FiEdit onClick={handleEdit} title="Click to edit this memory." /> : ""}</span>
              <span className='delete'>{!calledFromSaved && showDelete ? <AiOutlineDelete onDoubleClick={handleDelete} title='Double click to delete this memory.' /> : ""}</span>
            </p> : ""
        }
      </div>
      {
        editForm && <form className='editform'>
          <input value={details.locationName} onChange={handleChange} type="text" name="locationName" placeholder='Loaction Name i.e: Nigra Falls' />
          <textarea value={details.locationDesp} onChange={handleChange} name="locationDesp" cols="30" rows="10" placeholder='Description'></textarea>
          <input value={details.location} onChange={handleChange} type="text" name="location" placeholder='Location i.e: State, Country' />
          <input value={details.imageURL} onChange={handleChange} type="text" name="imageURL" placeholder='Location Image URL' />
          <button className='submit' onClick={handleUpdate} >UPDATE</button>
          <button className='clear' onClick={handleClear} >CLEAR</button>
        </form>
      }
    </Container>
  )
}
const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
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
        filter: brightness(70%);
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
      .saved{
        display: flex;
        flex-direction: row;
        .bookmark{
          svg{
            position: relative;
            bottom: 3.5vh;
            left: 8.5vw;
            cursor: pointer;
          }
        }
        .tag{
          font-weight: 100;
          font-size: 0.8rem;
          margin: 0 0 0 1rem;
          position: relative;
          top: -1.4rem;
          color : #242323;
          svg{
            font-size: 0.8rem;
            position: relative;
            top: 0.1rem;
            color: #242323;
          }
          }
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
        font-weight: 400;
        font-size: 0.8rem;
        margin: 0 0 0 1rem;
        position: relative;
        color : #242323;
      }
      .like{
        font-weight: 600;
        font-size: 0.85rem;
        margin: 0 0 0 1rem;
        position: relative;
        top: 1rem;
        user-select: none;
        svg{
          font-size: 1.4rem;
          position: relative;
          top: 0.3rem;
          cursor: pointer;
        }
        .delete{
          svg{
            position: relative;
            left: 2rem;
            font-size: 1.3rem;
            color: #6b6868;
            &:hover{
              color: black;
            }
          }
        }
        .edit{
          svg{
            position: relative;
            left: 1.8rem;
            font-size: 1.2rem;
            color: #6b6868;
            &:hover{
              color: black;
            }
          }
        }
      }
    }
.editform{
  height: 20rem;
  width: 12rem;
  display: flex;
  flex-direction: column;
  padding-left:0.5rem;
  padding-top: 0.6rem;
  @media only screen and (max-width: 600px){
    margin-right:4rem;
    margin-bottom: 0.5rem;
    margin-top: -1rem;
  }
        input{
            height: 2rem;
            width: 14rem;
            margin: 0.2rem 0;
            padding: 0 0.5rem;
            outline: none;
            border: 1px solid gray;
        }
        textarea{
            width: 14rem;
            margin: 0.2rem 0;
            padding: 0.2rem 0.5rem;
            outline: none;
            border: 1px solid gray;
        }
        .submit{
            height: 1.8rem;
            width: 15rem;
            margin: 0.2rem 0;
            background-color: blueviolet;
            color: white;
            border: none;
            outline: none;
            cursor: pointer;
        }
        .clear{
            height: 1.5rem;
            width: 15rem;
            margin: 0.2rem 0;
            background-color: red;
            color: white;
            border: none;
            outline: none;
            cursor: pointer;
        }
}
`;