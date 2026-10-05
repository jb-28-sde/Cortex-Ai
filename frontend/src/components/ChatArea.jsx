import React, { useEffect } from 'react'
import Navbar from './Navbar'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages'
import { setArtifacts, setMessages } from '../redux/messageSlice'

function ChatArea() {
  const {selectedConversation} = useSelector(state=>state.conversation)
  const dispatch = useDispatch()
// useEffect(() => {
//   let cancelled = false;

//   const loadMessages = async () => {
//     dispatch(setMessages([]));

//     if (!selectedConversation) return;

//     if (selectedConversation.title === "New Chat") return;

//     const data = await getMessages(selectedConversation._id);

//     if (!cancelled) {
//       dispatch(setMessages(data));
//     }
//   };

//   loadMessages();

//   return () => {
//     cancelled = true;
//   };
// }, [selectedConversation?._id]);
  useEffect(()=>{
  const getMessage = async ()=>{
    if(selectedConversation){
      if(selectedConversation.title=="New Chat")return;
      const data = await getMessages(selectedConversation?._id)
      console.log(data)
      dispatch(setMessages(data))
      const latestArtifactMessage=[...data].reverse().find(msg=>msg.artifacts && msg.artifacts.length>0)
      dispatch(setArtifacts(latestArtifactMessage?.artifacts || []))
    }
    
  }
  getMessage()
  },[selectedConversation?._id])
  return (
    <div className='flex-1 flex flex-col min-w-0'>
      <Navbar />
      <MessageList />
      <ChatInput />
    </div>
  )
}

export default ChatArea

