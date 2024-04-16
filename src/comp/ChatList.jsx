
import React from 'react';

const ChatList = ({ messages }) => {
  return (
    <div className="chat-list">
      {messages.map((msg, index) => (
        <div key={index} className="chat-message">
          <strong>{msg.user}</strong>: {msg.message}
          <span className="timestamp">{msg.timestamp}</span>
          <button className="like-button">Like<span className="like-count">0</span></button>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
