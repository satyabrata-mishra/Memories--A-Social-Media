import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../Components/Navbar';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle, AiFillLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseAuth } from '../Utils/firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
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
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password);
      navigate("/memories");
    } catch (error) {
      alert(error.message);
    }
  };
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth,provider);
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate("/memories");
    }
  });
  return (
    <Container>
      <Navbar status={"createaccount"} />
      <div className="content">
        <form>
          <div className="lock"><AiFillLock /></div>
          <p>LOGIN</p>
          <input type="email" value={credentials.email} name="email" onChange={handleChange} placeholder='Email Address*' />
          <input id='pass' type="password" value={credentials.password} name="password" onChange={handleChange} placeholder='Password*' />
          <div className="showpassword">
            {
              showPassword
                ? <AiOutlineEyeInvisible onClick={handleShowPassword} />
                : <AiOutlineEye onClick={handleShowPassword} />
            }
          </div>
          <button className='signin' onClick={handleSignIn}>LOGIN</button>
          <button className='googlesignin' onClick={handleGoogleSignIn}><AiOutlineGoogle />GOOGLE LOGIN</button>
          <p>DON'T HAVE AN ACCOUNT? <Link to="/signup">SIGN UP</Link> </p>
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
          svg{
            font-size: 1.3rem;
            margin: 0 0.3rem;
          }
          &:hover{
            background-color: #7235ab;
            transition: 0.2s ease-in;
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