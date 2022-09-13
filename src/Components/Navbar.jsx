import React, { useState } from 'react';
import styled from 'styled-components';
import memories from '../Images/memories.png';
import logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from "../Utils/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";


export default function Navbar({ status }) {
    const [name, setname] = useState(" ");
    const navigate = useNavigate();
    const handleClick = () => {
        if (status === "createaccount")
            navigate("/signup");
        else if (status === "login")
            navigate("/");
    };
    const handleLogoutClick = () => {
        signOut(firebaseAuth);
    };
    setTimeout(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                setname(currentUser.displayName);
            }
        });
    }, 1000);
    return (
        <Container>
            <nav>
                <div className='right'>
                    <img src={memories} alt="memories" />
                    <img src={logo} alt="logo" />
                </div>
                <div className='left'>
                    {status === "logout" ? <button className='leftbutton'>{name.charAt(0).toUpperCase()}</button> : ""}
                    {status === "logout" ? <p>{name}</p> : ""}
                    {status === "createaccount" ? <button onClick={handleClick} className='rightbutton'>SIGN UP</button> : ""}
                    {status === "login" ? <button onClick={handleClick} className='rightbutton'>LOGIN</button> : ""}
                    {status === "logout" ? <button onClick={handleLogoutClick} className='rightbutton'>LOGOUT</button> : ""}
                </div>
            </nav>
        </Container>
    )
}
const Container = styled.div`
    nav{
        background-color: white;
        height: 5rem;
        width: 73rem;
        margin: 1.8rem;
        border-radius: 1rem;
        box-shadow: 0px 0px 10px grey;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .right{
            margin-left: 2rem;
            img{
                height: 2.5rem;
            }
            img:nth-child(2){
                margin-left: 0.8rem;
            }
        }
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 2.4rem;
            .leftbutton{
                border-radius: 50%;
                background-color: red;
                padding: 0.5rem 0.7rem;
                color: white;
                border: none;
                font-size: 1.1rem;
            }
            p{
                font-weight: bold;
                margin: 0 2rem;
            }
            .rightbutton{
                background-color: blueviolet;
                color: white;
                padding: 0.6rem 1rem;
                border-radius: 0.2rem;
                border: none;
                cursor: pointer;
            }
        }
    }
`;