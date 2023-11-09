import { ChatState } from "../context/ChatProvider";
import MyChats from '../components/MyChats';

const Chatpage = () => {

  const {user} =  ChatState();
  console.log(user);
  return (
    <div className='flex felx-row bg-white h-screen'>
        {/* <MyChats />
        <ChatBox /> */}
        <MyChats/>
    </div>
  )
}
export default Chatpage;