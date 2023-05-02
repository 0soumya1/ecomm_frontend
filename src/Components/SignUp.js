import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const SignUp =()=>{
    const[name, setName]= useState("");
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    const navigate = useNavigate();

    const url = "https://ecomm-backend-mocha.vercel.app/"
    // const url = "http://localhost:5000/"

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        } 
    }, [])
    
    const collectData= async()=>{
        console.log(name,email,password); 
        let result = await fetch(url+'register', {
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json()
        console.log(result, "resullt");
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        navigate('/')
    }

    return(
        <div className="register">
            <h1>Register </h1>
            <input className="inputbox" type="text" placeholder="Enter Name"
             value={name} onChange={(e)=>setName(e.target.value)} ></input>

            <input className="inputbox" type="text" placeholder="Enter Email"
            value={email} onChange={(e)=>setEmail(e.target.value)} ></input>

            <input className="inputbox" type="password" placeholder="Enter Password"
            value={password} onChange={(e)=>setPassword(e.target.value)}></input>

            <button onClick={collectData} className="appbutton" type="button">SignUp</button>
        </div>
    )
}

export default SignUp;