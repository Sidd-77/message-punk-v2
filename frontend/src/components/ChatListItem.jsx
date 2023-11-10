import { Avatar } from "@nextui-org/react"
import { ChatState } from "../context/ChatProvider";


const ChatListItem = ({chat}) => {

    const {user, selectedChat, setSelectedChat, chats, setChats} = ChatState();
    const displayName = ( user._id === chat.users[0]._id )? chat.users[1].username : chat.users[0].username ;
    

  return (
    <div className={"flex flex-row items-center p-2 gap-2 font-medium  rounded-lg " + (selectedChat === chat? " bg-gray-50 text-blue-600 shadow-md":" bg-blue-500 text-white")}
                    onClick={()=> setSelectedChat(chat)}>
        <Avatar src="https://robohash.org/u1" className="bg-white"/>
        <p>{chat.isGroupChat ? 
            chat.chatName : 
            displayName}</p>
    </div>
  )
}
export default ChatListItem