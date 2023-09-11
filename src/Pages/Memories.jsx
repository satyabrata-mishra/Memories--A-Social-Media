import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../Utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import Cards from '../Components/Cards';
import CreateForm from '../Components/CreateForm';
import { host } from '../Utils/constants';


export default function Memories() {
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
  });
  const [allMemories, setallMemories] = useState([]);
  const [allPosts, setallPosts] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, [])

  useEffect(() => {
    checkUserPresentOrNot(userDetails.email);
    getAllPostsOfAnEmail(userDetails.email);
  }, [userDetails])


  async function fetchAllData() {
    try {
      const response = await fetch(`${host}/posts/getallposts`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      setallMemories(json);
    } catch (error) {
      alert(error.message);
    }
  };

  async function checkUserPresentOrNot(email) {
    if (email === "") {
      return;
    }
    try {
      await fetch(`${host}/saved/user`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async function getAllPostsOfAnEmail(email) {
    if (email === "") {
      return;
    }
    try {
      const response = await fetch(`${host}/saved/get/${email}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      setallPosts(json);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      } else {
        setuserDetails({
          name: currentUser.displayName,
          email: currentUser.email
        });
      }
    });
  }, []);
  return (
    <Container>
      <Navbar status={"logout"} />
      <div className="content">
        <div className="leftgrid">
          <div className="cards">
            {
              allMemories.slice(0).reverse().map((memories, index) => {
                return (<Cards
                  key={index}
                  id={memories._id}
                  fetchAllData={fetchAllData}
                  showDelete={memories.email === userDetails.email}
                  email={userDetails.email}
                  image={memories.imageURL}
                  authorName={memories.author}
                  timeSpan={memories.createdAt}
                  tags={memories.location}
                  name={memories.locationName}
                  desc={memories.locationDesp}
                  isLiked={memories.peopleLiked.indexOf(userDetails.email) === -1 ? false : true}
                  noOfLikes={memories.likedCount}
                  noOfComments={memories.comments.length / 2}
                  saved={allPosts.indexOf(memories._id) === -1}
                  calledFromSaved={false}
                  removedFromPost={() => { }}
                />)
              })
            }
          </div>
        </div>
        <div className="rightgrid">
          <CreateForm fetchAllData={fetchAllData} />
        </div>
      </div>
    </Container>
  )
}
const Container = styled.div`
    .content{
      min-height: 70vh;
      width: 100vw;
      display: grid;
      grid-template-columns: 75% 25%;
      @media only screen and (max-width: 600px){
        display: flex;
        flex-wrap: wrap;
        flex-direction: column-reverse;
      }
      .leftgrid{
        @media only screen and (max-width: 600px){
           margin-right : 1.6rem;
          }
        .cards{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      }
    }
`;