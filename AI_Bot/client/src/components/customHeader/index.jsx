import React from "react";
import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Chat from "../chat";


const CustomerHeader = () => {
  return (
    <div className="chat_header">
      <div className="flexbeteen">
        <ChatBubbleLeftRightIcon className="icon-chat" />
        <h3 className="header-text">{Chat.title}</h3>
      </div>
      <div className="flexbeteen">
        <PhoneIcon className="icon-phone" />
        {Chat.description !== "⬅️ ⬅️ ⬅️" ? (
          <p className="header-text">{Chat.description}</p>
        ) : (
          <p className="header-text">no chat selected</p>
        )}
      </div> 
    </div>
  )
}

export default CustomerHeader