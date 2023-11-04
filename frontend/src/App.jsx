
import { Route, Routes } from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Chatpage from "./Pages/Chatpage"
import axios from "axios"

function App() {
  
  axios.defaults.baseURL = "http://127.0.0.1:5000";
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
