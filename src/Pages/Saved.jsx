import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../Utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import { host } from '../Utils/constants';
import Cards from '../Components/Cards';
import Navbar from '../Components/Navbar';
import nosaved from '../Images/nosaved.png'

export default function Saved() {
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
  });
  const [allMemories, setallMemories] = useState([]);
  const [filteredMemories, setfilteredMemories] = useState([]);
  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    getAllPostsOfAnEmail(userDetails.email);
  }, [allMemories, userDetails]);


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
      await response.json().then((data) => {
        const filter = allMemories.filter((value) => {
          return data.indexOf(value._id) !== -1;
        });
        setfilteredMemories(filter);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const removedFromPost = (id) => {
    setfilteredMemories(filteredMemories.filter((value) => {
      return value._id !== id;
    }));
  }
  return (
    <Container>
      <Navbar status={"logout"} />
      <div className="content">
        <div className="leftgrid">
          <div className="cards">
            {
              filteredMemories.length === 0 ? <img src={nosaved} alt="NA" /> : filteredMemories.slice(0).reverse().map((memories, index) => {
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
                  saved={false}
                  calledFromSaved={true}
                  removedFromPost={removedFromPost}
                />)
              })
            }
          </div>
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