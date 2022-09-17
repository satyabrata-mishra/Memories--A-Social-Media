import React, { useState } from 'react'
import styled from 'styled-components';
import Navbar from '../Components/Navbar';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle, AiFillLock } from 'react-icons/ai';
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { firebaseAuth } from '../Utils/firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: ""
  });
  const handleShowPassword = () => {
    setshowPassword(!showPassword);
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  };
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.repeatpassword) {
      try {
        await createUserWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password).then(() => {
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            displayName: credentials.name
          });
        });
        navigate("/memories");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Password doesn't match.")
    }
  };
  const handleGoogleCreateAccount = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider);
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
        navigate("/memories");
    }
  });
  return (
    <Container>
      <Navbar status={"login"} />
      <div className="content">
        <form>
          <div className="lock"><AiFillLock /></div>
          <p>CREATE ACCOUNT</p>
          <input type="text" value={credentials.name} name="name" onChange={handleChange} placeholder='Name*' />
          <input type="email" value={credentials.email} name="email" onChange={handleChange} placeholder='Email Address*' />
          <input id='pass' type="password" value={credentials.password} name="password" onChange={handleChange} placeholder='Password*' />
          <div className="showpassword">
            {
              showPassword
                ? <AiOutlineEyeInvisible onClick={handleShowPassword} />
                : <AiOutlineEye onClick={handleShowPassword} />
            }
          </div>
          <input className='repeatpassword' type="password" value={credentials.repeatpassword} name="repeatpassword" onChange={handleChange} placeholder='Repeat Password*' />
          <button className='signin' onClick={handleCreateAccount}>CREATE ACCOUNT</button>
          <button className='googlesignin' onClick={handleGoogleCreateAccount}><AiOutlineGoogle />CREATE ACCOUNT WITH GOOGLE</button>
        </form>
      </div>
    </Container>
  )
}
const Container = styled.div`
    .content{
      height: 75vh;
      display: flex;
      justify-content: center;
      align-items: center;
      form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        padding: 1rem;
        box-shadow: 0px 0px 10px grey;
        .lock{
          background-color: red;
          border-radius: 50%;
            svg{
            color: white;
            font-size: 1.8rem;
            padding: 0.5rem;
          }
        }
        p{
          font-size: 1rem;
          font-weight: bold;
        }
        input{
          height: 2.4rem;
          width: 16rem;
          border: 1px solid grey;
          outline: none;
          border-radius: 3px;
          padding: 0 1rem;
          margin: 0.4rem 0;
          &:hover{
            border: 1px solid black;
          }
        }
        .showpassword{
          position: relative;
          bottom: 2.2rem;
          left: 7.7rem;
          svg{
            font-size: 1.1rem;
            cursor: pointer;
            color: gray;
            &:hover{
              color: black;
            }
          }
        }
        .repeatpassword{
          margin-top: -1rem;
          margin-bottom: 2rem;
        }
        .signin{
          width: 18rem;
          height: 2rem;
          border-radius: 2px;
          border: none;
          cursor: pointer;
          margin: 0.2rem;
          background-color: blueviolet;
          color: white;
          margin-top: -1rem;
          &:hover{
            background-color: #7235ab;
            transition: 0.2s ease-in;
          }
        }
        .googlesignin{
          width: 18rem;
          height: 2rem;
          border-radius: 2px;
          border: none;
          cursor: pointer;
          margin: 0.2rem;
          background-color: blueviolet;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover{
            background-color: #7235ab;
            transition: 0.2s ease-in;
          }
          svg{
            font-size: 1.3rem;
            margin: 0 0.3rem;
          }
        }
        p{
          font-size: 0.9rem;
          a{
            color: black;
            text-decoration: none;
            &:hover{
              text-decoration: underline;
            }
          }
        }
      }
    }
`;