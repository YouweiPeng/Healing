import React, { useState } from "react";
import { motion } from "framer-motion";
import SideBar from "../components/sideBar";
import { useGlobalContext } from "../context";
import PageHomeButton from "../components/PageHomeButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const CommunityPage = () => {
  const { isSidebarExpanded, setIsSidebarExpanded } = useGlobalContext();
  const { recFriends, setRecFriends } = useGlobalContext();
  const date = new Date();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [openChatModal, setOpenChatModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriend = (event) => {
    const newFriends = recFriends.map((item) => {
      if (item.id === parseInt(event.currentTarget.id)) {
        item.friend = true;
      }
      return item;
    });
    setRecFriends(newFriends);
  };

  const handleDeleteFriend = (event) => {
    const newFriends = recFriends.map((item) => {
      if (item.id === parseInt(event.currentTarget.id)) {
        item.friend = false;
      }
      return item;
    });
    setRecFriends(newFriends);
  };

  const handleOpenChat = (friend) => {
    setSelectedFriend(friend);
    setOpenChatModal(true);
  };

  const handleCloseChat = () => {
    setSelectedFriend(null);
    setOpenChatModal(false);
    setChatHistory([]);
    setChatMessage("");
  };
  const handleSendChat = () => {
    if (chatMessage.trim() !== "") {
      const newMessage = {
        sender: "You",
        message: chatMessage,
      };
      setChatHistory((prevChat) => [...prevChat, newMessage]);
      const newMessage2 = {
        sender: selectedFriend.name,
        message: "respond message from " + selectedFriend.name + "",
      };
      setChatHistory((prevChat) => [...prevChat, newMessage2]);
      setChatMessage("");
    }
  };
  return (
    <motion.div
      initial="page-entering"
      animate="page-entered"
      exit="page-entering"
      variants={{
        "page-entering": { opacity: 0 },
        "page-entered": { opacity: 1 },
      }}
      transition={{ duration: 1 }}
    >
      <div
        className="container-commu"
        style={{ marginLeft: isSidebarExpanded ? "200px" : "90px" }}
      >
        <PageHomeButton />
        <div className="Whole-box" style={{ left: isSidebarExpanded ? "230px" : "120px" }}>
          {recFriends.map((friend) => {
            if (!friend.friend) {
              return (
                <div className="friend-box">
                  <img className="friend-rec" src={friend.img} alt={friend.name} />
                  <p className="name">{friend.name}</p>
                  <p className="mutual">{friend.mutalFriends} mutual friends</p>
                  <button
                    id={friend.id}
                    key={friend.id}
                    className="Add-button"
                    onClick={handleAddFriend}
                  >
                    Add Friend
                  </button>
                </div>
              );
            }
          })}
        </div>
        <div className="right-sec">
          <div class="container-textbox">
            <div class="inbox-label">ALL INBOXES</div>
            {recFriends.map((friend) => {
              if (friend.friend) {
                return (
                  <div class="email">
                    <div class="sender-picture-container">
                      <img class="sender-picture" src={friend.img} alt={friend.name} />
                    </div>
                    <div class="email-content">
                      <div class="email-header">
                        <div class="sender-name">{friend.name}</div>
                        <div class="send-time">
                          {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:
                          {date.getMinutes() < 10 ? `0` + date.getMinutes() : date.getMinutes()}{" "}
                          {date.getHours() < 12 ? `AM` : `PM`}
                        </div>
                      </div>
                      <div class="subject">
                        {friend.name} is now your friend!
                      </div>
                      <div class="message">
                        Message your new friends!
                        <button
                          className="deleteFriend-button"
                          id={friend.id}
                          key={friend.id}
                          onClick={handleDeleteFriend}
                        >
                          X
                        </button>
                        <button className="Chat-button" onClick={() => handleOpenChat(friend)}>
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            <Dialog open={openChatModal} onClose={handleCloseChat}>
                          <DialogTitle>Chat with {selectedFriend && selectedFriend.name}</DialogTitle>
                          <DialogContent>
                            {selectedFriend && (
                              <div>
                                <div className="chat-history">
                                        <div style={{display:"flex",alignItems:'center'}}>
                            <img className="sender-picture" src={selectedFriend.img} alt={selectedFriend.name} />
                            <p style={{display:"inline-block", marginBottom:"5px", marginLeft:"10px"}}>{selectedFriend.name}</p>
                          </div>
                                  {chatHistory.map((message, index) => (
                                    <div key={index} className="chat-message">
                                      <span className="chat-sender">{message.sender}:</span>{" "}
                                      {message.message}
                                    </div>
                                  ))}
                                </div>
                                <div className="chat-input">
                                  <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    className="chat-input-box"
                                  />
                                  <button className="send-button" onClick={handleSendChat}>
                                    Send
                                  </button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
          </div>
        </div>
        <SideBar />
      </div>
    </motion.div>
  );
};

export default CommunityPage;
