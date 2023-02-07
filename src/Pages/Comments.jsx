import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components'
import { host } from '../Utils/constants';
import { BiSend } from 'react-icons/bi';
import Commentbar from '../Components/Commentbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../Utils/firebase-config';
import squido from '../Images/squido.webp';
import { useNavigate } from 'react-router-dom';

export default function Comments() {
    const navigate = useNavigate();
    const [card, setCard] = useState({});
    const [comment, setComment] = useState("");
    const [details, setDetails] = useState("");

    useEffect(() => {
        getCard();
    }, []);

    async function getCard() {
        try {
            const response = await fetch(`${host}/posts/getsinglepost`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: localStorage.getItem("id")
                })
            });
            const json = await response.json();
            setCard(json);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (comment === "") {
            alert("Write something in the comment box.")
        }
        else {
            try {
                const response = await fetch(`${host}/posts/addcomment`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: card._id,
                        name: details,
                        comment: comment
                    })
                });
                const json = await response.json();
                console.log(json);
            } catch (error) {
                alert(error.message);
            }
            getCard();
            setComment("");
        }
    };

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (current) => {
            if (current) {
                setDetails(current.displayName);
            }
            else{
                navigate("/");
            }
        });
    }, []);

    return (
        <Container>
            <img src={card.imageURL} alt="Not Avaliable" />
            <p className='author'>{card.author}</p>
            <p className='timespan'>{card.createdAt}</p>
            <p className='tag'> {card.locationName} , {card.location}</p>
            {/* <p className='description'>{card.locationDesp}</p> */}
            <div className="commentsection">
                {card.comments ? card.comments.length === 0 ? <img src={squido} alt="" /> :
                    card.comments.map((value, index) => {
                        if (index % 2 === 0) {
                            return <Commentbar key={index} name={card.comments[index]} message={card.comments[index + 1]} owner={card.comments[index] === details} />;
                        }
                    })
                    : ""}
            </div>
            <div className="addcomment">
                <input value={comment} onChange={handleChange} name="comment" id='comm' type="text" placeholder='Write a comment...' />
                <button onClick={handleClick}><BiSend /></button>
            </div>
        </Container>
    )
}
const Container = styled.div`
padding-top: 1rem;
display: flex;
justify-content: space-around;
align-items: center;
min-height: 40vh;
flex-direction: column;
    img{
        width: 30vw;
        height: 35vh;
        filter: brightness(50%);
      }
      .author{
        font-weight: 900;
        margin: 0 0 0 1rem;
        color: white;
        position: relative;
        top: -11.5rem;
        right: 7rem;
      }
      .timespan{
        font-weight: 100;
        font-size: 0.6rem;
        margin: 0 0 0 1rem;
        color: white;
        position: relative;
        top: -11rem;
        right: 7.4rem;
      }
      .tag{
        font-weight: 600;
        font-size: 0.8rem;
        margin: 0 0 0 1rem;
        position: relative;
        top: -1rem;
        color : #242323;
        svg{
          font-size: 0.8rem;
          position: relative;
          top: 0.1rem;
          color: #242323;
        }
        }
      .description{
        font-weight: 400;
        font-size: 0.8rem;
        margin: 0 0 0 1rem;
        position: relative;
        color : #242323;
      }
      .commentsection{
        width: 30vw;
        height: 17rem;
        overflow-x: scroll;
        img{
            width: 14rem;
            margin: 1.5rem 4.5rem;
        }
      }
      .addcomment{
        width: 30vw;
        height: 2rem;
        display: flex;
        border: 1px solid black;
        input{
            height: 1.76rem;
            border: none;
            outline: none;
            width: 27vw;
        }
        button{
            border-radius: 50%;
            height: 2rem;
            width: 2.1rem;
            outline: none;
            border: none;
            background-color: white;
            svg{
                color: blue;
                font-size: 1.4rem;
            }
        }
      }
`;