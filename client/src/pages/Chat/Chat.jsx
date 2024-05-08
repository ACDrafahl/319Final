// Import necessary dependencies and components
import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from 'axios';
import InfoCard from '../../components/InfoCard/InfoCard'
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../../components/ProfileModal/ProfileModal";

// Define the Chat component
const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [newChatPhoneNumber, setNewChatPhoneNumber] = useState(""); // State to store new chat phone number input

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  // Function to handle creating a new chat
  const handleNewChat = async () => {
    try {
      // Send a request to get the user ID by phone number
      const response = await axios.get(`/user/getUserByPhoneNumber/${newChatPhoneNumber}`);
      const friendId = response.data.otherDetails._id;
      // Create a new chat with the current user's ID and the friend's ID
      const chatResponse = await axios.post('/chat/newChat', {
        userId: user._id,
        friendId: friendId
      });
      console.log('New chat created:', chatResponse.data);
      const { data } = await userChats(user._id);
      setChats(data);
      setNewChatPhoneNumber('');
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {/* New Chat Button and Phone Number Input */}
            <div className="New-chat">
              <input
                type="text"
                placeholder="Enter phone number"
                value={newChatPhoneNumber}
                onChange={(e) => setNewChatPhoneNumber(e.target.value)}
              />
              <button onClick={handleNewChat}>New Chat</button>
            </div>
            {/* Existing Chat Conversations */}
            {chats.map((chat) => (
              <div
                key={chat._id} // Add key prop to fix React warning
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage} 
          receivedMessage={receivedMessage}
        />
      </div>   
    </div>


  );
};

// Export the Chat component
export default Chat;
