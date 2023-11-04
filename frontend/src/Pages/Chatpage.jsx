import axios from 'axios';
import { useEffect, useState } from 'react';

const Chatpage = () => {

    const [chats, setChats] = useState([]);

    const fetchChats = async ()=>{
        const {data} = await axios.get('/api/chat');
        setChats(data);
    }

    useEffect(()=>{
        fetchChats();
    }, []);

  return (
    <div>
        {
            chats.map((ch)=>{
                return <h1 key={ch._id}>{ch.chatName}</h1>
            })
        }
    </div>
  )
}
export default Chatpage;