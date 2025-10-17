import React, { useEffect, useState } from 'react'
import {db} from '../config/firebase'
import { collection,getDocs,doc,addDoc,deleteDoc,updateDoc } from 'firebase/firestore';
const Store = () => {

    const dbreference=collection(db,"movies");

    const [title,setTitle]= useState("");
    const [rating,setRating]=useState(0);
    const [genre,setgenre]=useState("");
    const [updated,setUpdated]=useState("");
    const [movies,setMovies]=useState([]);

    const getMovies=async()=>{
        const result=await getDocs(dbreference);
        console.log(result.docs.map(c=>c.data()));
        setMovies(result.docs.map(c=>({...c.data(),id:c.id})))
    }
    useEffect(()=>{
        getMovies();
    },[])

    const createData=async()=>{
        //const data=doc(db,"movies");
        const create=await addDoc(dbreference,{
            title:title,
            rating:rating,
            genre:genre,
        });
        console.log(create.id);
        getMovies();
    }
    //console.log(movies)

    const deleteMovie=async(title)=>{
        const ref=doc(db,"movies",title);
        const result=await deleteDoc(ref);
        console.log(ref);
        getMovies();
    }
    const updateMovie=async(id)=>{
        const ref=doc(db,"movies",id);
        const result=await updateDoc(ref,{title:updated});
        getMovies();
    }
  return (
    <>
        <input type="text" placeholder='movie name' onChange={(e)=>setTitle(e.target.value)}/>
        <br />
        <input type="number" placeholder='rating' onChange={(e)=>setRating(e.target.value)}/>
        <br />
        <input type="text" placeholder='genre' onChange={(e)=>setgenre(e.target.value)}/>

        <br />
        <button onClick={createData}>Upload</button>

        <br />
        {movies.map((c,i)=>{
            return (
                <>
                    <li key={i}>{c.title}</li>
                    <button key={i} onClick={()=>deleteMovie(c.id)}>delete</button>
                    <input onChange={(e)=>setUpdated(e.target.value)}/>
                    <button onClick={()=>updateMovie(c.id)}>update</button>
                </>
            )
        })}
        
    </>
  )
}

export default Store