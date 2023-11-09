import {Card, Avatar, Tooltip, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useState } from "react";
import SearchModal from "./SearchModal";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";



const MyChats = () => {
    const [isSearch, setIsSearch] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const navigate = useNavigate();
    
    const logoutHandler = ()=>{
        localStorage.removeItem("userInfo");
        navigate("/");
    }


  return (
    <div className="flex flex-col w-2/6 bg-blue-600 rounded-r-lg h-screen">
        <div className="flex flex-row justify-center  mt-5 mx-5 text-4xl gap-2 text-white text-center font-bold">
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9">
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
            </svg>
             Message-Punk
        </div>
        <div className="flex flex-row mt-5 mx-5 text-white text-2xl font-semibold">
            <div className="flex-grow">
                My Chats
            </div>
            <Tooltip content="Create a group chat" className=" bg-blue-600 text-white text-center" placement="right" offset={-1}>
                <button className="h-full hover:scale-110 active:border-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
                </svg>
                </button>
            </Tooltip>
        </div>
        <div className="my-5 mx-5">
            <Button onPress={onOpen} className="border-white  w-full bg-blue-500 text-white text-1xl" size="md" label="serach a user">
                Search a user...
            </Button>
            <SearchModal isOpen={isOpen}  onOpenChange={onOpenChange} />
        </div>
        <div className="flex-grow bg-blue-400">

        </div>
        <div>
            <Card className="my-4 mx-5 bg-blue-400 text-white font-semibold">
                <CardHeader className="flex justify-between">
                    <button className="flex gap-3 items-center bg-transparent text-white text-xl">
                        <Avatar src="https://robohash.org/default" className=""/>
                        <p className="">Current User</p>
                    </button>
                    <Button color="danger" onClick={logoutHandler} size="md" className=" font-medium">
                        Logout
                    </Button>
                </CardHeader>
                
            </Card>
        </div>
    </div>
  )
}
export default MyChats