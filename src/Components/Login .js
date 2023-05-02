import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const url = "https://ecomm-backend-mocha.vercel.app/"
  // const url = "http://localhost:5000/"

    useEffect(()=>{
         const auth = localStorage.getItem('user');
         if(auth){
            navigate('/')
         }
    }, [])

    const handleLogin = async ()=>{
        console.log("email, password", email, password);
        let result = await fetch(url+"login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result= await result.json();
        console.log(result,"result");
      // camelCase
      //in localStorage undefined User,token should not be stored
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.User));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/')
        }else{
            alert('please enter correct details');
        }
    }

    return (
        <div className="login">
             <h1>Login</h1>
            <input type="text" className="inputbox" placeholder="Enter Email"
            onChange={(e)=>setEmail(e.target.value)} value={email} />
            <input type="password" className="inputbox" placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appbutton" type="button">Login</button>
        </div>
    )
}
    
export default Login