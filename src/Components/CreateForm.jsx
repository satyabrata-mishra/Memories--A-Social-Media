import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from "../Utils/firebase-config";

export default function CreateForm() {
    const [userDetails, setuserDetails] = useState({
        name: "",
        email: ""
    });
    const [details, setdetails] = useState({
        title: "",
        message: "",
        tags: "",
        photos: null
    });
    const handleChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.files[0] });
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userDetails);
        console.log(details);
        setdetails({
            title: "",
            message: "",
            tags: "",
            photos: null
        });
    };
    const handleClear = (e) => {
        e.preventDefault();
        setdetails({
            title: "",
            message: "",
            tags: "",
            photos: null
        });
    }
    return (
        <Container>
            <form>
                <p>Creating A Memory</p>
                <input value={details.title} onChange={handleChange} type="text" name="title" placeholder='Title' />
                <textarea value={details.message} onChange={handleChange} name="message" cols="30" rows="10" placeholder='Message'></textarea>
                <input value={details.tags} onChange={handleChange} type="text" name="tags" placeholder='Tags' />
                <input type="file" name='photos' className='image' onChange={handleImageChange} />
                <button className='submit' onClick={handleSubmit}>SUBMIT</button>
                <button className='clear' onClick={handleClear}>CLEAR</button>
            </form>
        </Container>
    )
}
const Container = styled.div`
margin: 0 1rem;
box-shadow: 0px 0px 10px gray;
text-align: center;
    p{
        font-weight: 600;
    }
    form{
        display: flex;
        flex-direction: column;
        padding-left:0.5rem;
        padding-bottom: 0.6rem;
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
    }
`;