import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Input } from "@nextui-org/react";
import { useState } from "react";


const Homepage = () => {

    const [isLogin, setisLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className="flex flex-row h-screen">
        <div className="w-3/6 text-white bg-gray-900  h-screen flex  flex-col items-start  ">
            <div className="h-1/3"></div>
            <div className="h-1/3 ml-5">
                <p className="text-8xl mb-5 font-bold ">Message Punk</p>
                <p className="text-2xl font-medium">This is web-based chat-app build using React, Express, Node, MongoDB and NextUi</p>
            </div>
            <div className="h-1/3">
            </div>
        </div>
        <div className="w-3/6 h-screen bg-gray-800 flex items-center">

            <Card className="flex w-full m-10">
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

                                <Button color="primary" size="lg">
                                    Login
                                </Button>
                            </form>
                    ):(
                        <form className="flex flex-col gap-5 m-5 w-full ">
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

                                <Button color={isLogin?"primary":"secondary"} size="lg">
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