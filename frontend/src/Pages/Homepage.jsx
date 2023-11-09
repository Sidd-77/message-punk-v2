import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

//import { useHistory } from 'react-router-dom';

import axios from 'axios';


const Homepage = () => {

    const [isLogin, setisLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    //const history = useHistory();

    const signUpHandler = async ()=>{
        if(!email || !password || !username){
            toast.error('Please enter required fields');
        }
        else{
            try{
                const {data} = await axios.post('/api/user',{
                    username,
                    email,
                    password
                })
                if(data){
                    toast('Signed In!');
                    localStorage.setItem('userInfo', JSON.stringify(data));
                }
                navigate("/chat");
            }catch(err){
                toast.error(err.response.data.message)
            }
        }
    }
        
    

    const loginHandler = async ()=>{
        if(!email || !password){
            toast.error("Please enter all fileds")
        }else{
            try{
                const {data} = await axios.post('/api/user/login',{
                    email,
                    password
                });
                if(data){
                    toast.success('Logged in successfully')
                    localStorage.setItem('userInfo', JSON.stringify(data));
                }
                navigate("/chat");
            }catch(err){
                toast.error(err.response.data.message)
            }
        }
    }

  return (
    <div className="flex flex-row h-screen">
        <Toaster 
            position="bottom-center"
            reverseOrder={false}
        />
        <div className="w-3/6 text-white bg-blue-600  h-screen flex  flex-col items-start  ">
            <div className="h-1/3"></div>
            <div className="h-1/3 ml-5">
                <p className="text-8xl mb-5 font-bold ">Message Punk</p>
                <p className="text-2xl font-medium">This is web-based chat-app build using React, Express, Node, MongoDB, Socket.io and NextUI</p>
            </div>
            <div className="h-1/3">
            </div>
        </div>
        <div className="w-3/6 h-screen bg-gray-100 flex items-center">

            <Card className="flex w-full m-10 shadow-2xl shadow-blue-200">
                <CardHeader className="flex-row gap-2">
                    <Button onClick={()=> setisLogin(true)} className=" basis-1/2" color="primary">
                        Login
                    </Button>
                    <Button onClick={()=>setisLogin(false)} className=" basis-1/2" color="secondary">
                        SignUp
                    </Button>
                </CardHeader>
                <Divider/>
                <CardHeader>
                    {isLogin? (
                            <form className="flex flex-col gap-5 m-5 w-full ">
                                <Input
                                    key={0}
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    labelPlacement={"inside"}
                                    className="flex"
                                    id="email"
                                    />

                                <Input
                                    key={0}
                                    type="password"
                                    label="Password"
                                    id="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    labelPlacement={"inside"}
                                    className="flex"
                                    />

                                <Button color="primary" size="lg" onClick={loginHandler}>
                                    Login
                                </Button>
                            </form>
                    ):(
                        <form className="flex flex-col gap-5 m-5 w-full " onSubmit={signUpHandler}>
                                <Input
                                    key={0}
                                    type="email"
                                    label="Email"
                                    id="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    labelPlacement={"inside"}
                                    className="flex"
                                    />

                                <Input
                                    key={0}
                                    type="username"
                                    label="Username"
                                    id="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    labelPlacement={"inside"}
                                    className="flex"
                                    />

                                <Input
                                    key={0}
                                    type="password"
                                    label="Password"
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    labelPlacement={"inside"}
                                    className="flex"
                                    />

                                <Button color={isLogin?"primary":"secondary"} size="lg" onClick={signUpHandler}>
                                    Sign Up
                                </Button>
                            </form>
                    )}
                </CardHeader>
            </Card>

        </div>
    </div>
  )
}
export default Homepage