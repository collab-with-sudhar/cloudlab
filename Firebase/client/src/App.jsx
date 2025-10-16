import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { auth,db,provider } from '../config/firebase'
import {signInWithPopup} from "firebase/auth"
import {collection,doc,addDoc,getDocs,updateDoc,deleteDoc} from 'firebase/firestore'
function App() {
  const [inp,setInp]=useState("")
  const colref=collection(db,"movies");
  const getMovies=async()=>{
    try{
      
      const result=await getDocs(colref);
      console.log(result.docs.map(c=>c.data()))
    }
    catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getMovies();
  },[])
  const login=async()=>{
    try{
      await signInWithPopup(auth,provider);
      console.log("user logged");
      console.log(auth?.currentUser?.displayName);
    }catch(e){
      console.log(e);
    }
  }
  return(
    <>
        <button onClick={login}>Login</button>
        <br />
        <br />
        <input type="text" onChange={e=>setInp(e.target.value)} />

    </>
  )
}

export default App
