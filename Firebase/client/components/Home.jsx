import React, { useState } from 'react'
import {auth,AuthProvider} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from 'firebase/auth'
const Home = () => {
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    console.log(auth?.currentUser?.email)
    const signIn=async()=>{
        try{
            await signInWithPopup(auth,AuthProvider)
        }
        catch(err){
            console.log(err);
        }
    }
    const signin=async ()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,pass);
        }
        catch(err){
            console.log(err);
        }
    }
    const logout=async()=>{
        try{
            await signOut(auth);
            console.log("user logged out");
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <>
        <input type="email" placeholder='enter your email' onChange={(e)=>setEmail(e.target.value)}/>
        <br />
        <input type="password" placeholder='enter password' onChange={(e)=>setPass(e.target.value)} name="" id="" />
        <br />
        <button onClick={signin}>Sign-In</button>
        <br />
        <button onClick={signIn}>Sign-In with Google</button>
        <br />
        <button onClick={logout}>Logout</button>
    </>
  )
}

export default Home;