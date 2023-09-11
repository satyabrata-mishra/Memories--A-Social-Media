import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from "../Utils/firebase-config";
import { host } from '../Utils/constants';
import { Link } from 'react-router-dom';

export default function CreateForm({ fetchAllData, isUpdate = false }) {
    const [userDetails, setuserDetails] = useState({
        name: "",
        email: ""
    });
    const [details, setdetails] = useState({
        locationName: "",
        locationDesp: "",
        location: "",
        imageURL: ""
    });
    const handleChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                setuserDetails({
                    name: currentUser.displayName,
                    email: currentUser.email
                });
            }
        });
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(details.imageURL || details.location || details.locationDesp || details.locationName)) {
            alert("Fillup all the sections of the form.");
            return;
        }
        try {
            const response = await fetch(`${host}/posts/createpost`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userDetails.email,
                    author: userDetails.name.replace(/\s+/g, ' ').trim(),
                    locationName: details.locationName,
                    locationDesp: details.locationDesp,
                    location: details.location,
                    imageURL: details.imageURL
                })
            });
            const json = await response.json();
            console.log(json);
            setdetails({
                locationName: "",
                locationDesp: "",
                location: "",
                imageURL: ""
            });
            fetchAllData();
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleClear = (e) => {
        e.preventDefault();
        setdetails({
            locationName: "",
            locationDesp: "",
            location: "",
            imageURL: ""
        });
    }
    return (
        <Container>
            <form>
                <p>Creating A Memory</p>
                <input value={details.locationName} onChange={handleChange} type="text" name="locationName" placeholder='Loaction Name i.e: Nigra Falls' />
                <textarea value={details.locationDesp} onChange={handleChange} name="locationDesp" cols="30" rows="10" placeholder='Description'></textarea>
                <input value={details.location} onChange={handleChange} type="text" name="location" placeholder='Location i.e: State, Country' />
                <input value={details.imageURL} onChange={handleChange} type="text" name="imageURL" placeholder='Location Image URL' />
                <button className='submit' onClick={handleSubmit}>UPLOAD</button>
                <button className='clear' onClick={handleClear}>CLEAR</button>
                <Link to="/saved">MY SAVED</Link>
            </form>
        </Container>
    )
}
const Container = styled.div`
margin: 0 1rem;
box-shadow: 0px 0px 10px gray;
text-align: center;
@media only screen and (max-width: 600px){
    width:17rem ;
    margin-bottom: 1rem;
}
    form{
        display: flex;
        flex-direction: column;
        padding-left:0.5rem;
        padding-bottom: 0.6rem;
        @media only screen and (max-width: 600px){
            
        }
        p{
            font-weight: 600;
        }
        input{
            height: 2rem;
            width: 15rem;
            margin: 0.2rem 0;
            padding: 0 0.5rem;
            outline: none;
            border: 1px solid gray;
        }
        textarea{
            width: 15rem;
            margin: 0.2rem 0;
            padding: 0.2rem 0.5rem;
            outline: none;
            border: 1px solid gray;
        }
        .image{
            height: auto;
            width: auto;
            margin: 0.2rem 0;
            padding: 0 0.5rem;
            border: none;
        }
        .submit{
            height: 1.8rem;
            width: 16rem;
            margin: 0.2rem 0;
            background-color: blueviolet;
            color: white;
            border: none;
            outline: none;
            cursor: pointer;
        }
        .clear{
            height: 1.5rem;
            width: 16rem;
            margin: 0.2rem 0;
            background-color: red;
            color: white;
            border: none;
            outline: none;
            cursor: pointer;
        }
        a{
            height: 1.5rem;
            width: 16rem;
            margin: 0.2rem 0;
            background-color: gray;
            color: white;
            border: none;
            outline: none;
            cursor: pointer;
            text-decoration: none;
        }
    }
`;