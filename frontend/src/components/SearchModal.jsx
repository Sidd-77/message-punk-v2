import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import UserListItem from "./UserListItem";
import { useNavigate } from "react-router-dom";
import {uniqBy} from 'lodash'

const SearchModal = (props) => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const {user, setSelectedChat, chats, setChats} = ChatState();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!search) {
        toast.error("enter something to search");
        return;
    }

    try{
        setLoading(true);
        const config = {
            headers: {
                Authorization : `Bearer ${user.token}`,
            }
        }

        const {data} = await axios.get(`/api/user/?search=${search}`, config);
        setLoading(false);
        setSearchResult(data);
    }catch(err){
        toast.error(err.message);
        return;
    }
  };

  const accessChat = async (userId)=>{
    try {
        setLoading(true);

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }

        const {data} = await axios.post(`/api/chat`,{userId},config);
        
        let tp = [data, ...chats];
        tp = uniqBy(tp, '_id')
        setChats(tp);
        setSelectedChat(data);
        setLoading(false);
        navigate("/chat");
    } catch (error) {
        toast.error(error.message);
        return;
    }
  }

  return (
    <Modal isOpen={props.isOpen} size="lg" onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Search User
            </ModalHeader>
            <ModalBody>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button color="danger" variant="light" onClick={handleSearch}>
                Search
              </Button>
            </ModalBody>
            <div className="flex flex-col gap-2 mb-4">
                
                {loading? "" :
                    searchResult.map((userT)=>{
                        return <UserListItem key={userT._id} user={userT} handlefuction={ () => {accessChat(userT._id)} } />
                    })
                }
            </div>
          </>
        )}
      </ModalContent>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Modal>
  );
};
export default SearchModal;
