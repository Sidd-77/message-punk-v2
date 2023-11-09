
import {  Route, Routes, useNavigate } from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Chatpage from "./Pages/Chatpage"
import axios from "axios"
import { useEffect, useState } from "react";

function App() {
  
  axios.defaults.baseURL = "http://127.0.0.1:5000";
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(!userInfo) navigate('/');
  },[])

  return (

    <div>
      <Routes>
        <Route path="/" exact Component={Homepage} />
        <Route path="/chat" Component={Chatpage} />
      </Routes>
    </div>
  )
}

export default App
