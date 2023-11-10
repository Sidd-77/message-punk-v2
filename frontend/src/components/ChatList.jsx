import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ChatListItem from "./ChatListItem";


const ChatList = () => {
  const [loggedUser, setLoggedUser] = useState();
  const {user, selectedChat, setSelectedChat, chats, setChats} = ChatState();

  const fetchChats = async()=>{
    console.log("in da fetchChat")
    try {
      const config = {
        headers: {
          Authorization : `Bearer ${user.token}`,
        }
      }
      
      const {data} = await axios.get('/api/chat', config);
      setChats(data);
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    console.log("used eeffect")
  }, []);

  return (
    <div className="flex flex-col gap-2 ">
      {chats.map((c)=>{
        return <ChatListItem chat={c} key={c._id} />
      })}
    </div>
  )
}
export default ChatList