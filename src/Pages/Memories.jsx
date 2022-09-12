import React from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../Utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import Cards from '../Components/Cards';
import CreateForm from '../Components/CreateForm';
import kilimangaro from '../Images/kilimanjaro.jpg';


export default function Memories() {
  const navigate = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      navigate("/");
    }
  })
  return (
    <Container>
      <Navbar status={"logout"} />
      <div className="content">
        <div className="leftgrid">
          <div className="cards">
            <Cards
            image={kilimangaro}
            authorName={"Satyabrata Mishra"}
            timeSpan ={"6 hours ago"}
            tags={"kilimangaro"}
            name={"Mount Kilimanjaro"}
            desc={"In contrast to the persistent slope glaciers, the glaciers on Kilimanjaro's crater plateau have appeared and disappeared repeatedly during the Holocene epoch, with each cycle lasting a few hundred years.[36]: 1088  It appears that decreasing specific humidity instead of temperature changes has caused the shrinkage of the slope glaciers since the late 19th century. No clear warming trend at the elevation of those glaciers occurred between 1948 and 2005"}
            isLiked={false}
            noOfLikes={0}
             />
          </div>
        </div>
        <div className="rightgrid">
          <CreateForm />
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
      .leftgrid{
        .cards{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      }
    }
`;