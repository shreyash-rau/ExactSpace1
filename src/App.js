// App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import UserList from './comp/UserList';
import ChatList from './comp/ChatList';
// import "emoji-mart/css/emoji-mart.css";
import { Picker } from 'emoji-mart';
import './App.css'; // Import the CSS file

const socket = io('http://localhost:3001');

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeUser, setActiveUser] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

  useEffect(() => {
    socket.on('chat message', msg => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });
  }, []);

  const submitMessage = (e) => {
    e.preventDefault();
    const user = user_list[Math.floor(Math.random() * user_list.length)];
    const timestamp = new Date().toLocaleString();
    const msg = { user, message, timestamp };
    socket.emit('chat message', msg);
    setMessages(prevMessages => [...prevMessages, msg]);
    setActiveUser(user);
    setMessage('');
  };

  const addEmoji = (emoji) => {
    setMessage(message + emoji.native);
  };

  return (
    <div className="chat-container">
     
    <UserList users={user_list} activeUser={activeUser} setActiveUser={setActiveUser} />
    
    <ChatList messages={messages.filter(msg => msg.user === activeUser)} />
    <div className='chat-div'>
      <form onSubmit={submitMessage} className="chat-input">
      <input value={message} onChange={e => setMessage(e.target.value)} className="input-field" />

      <button type='button' onClick={() => setShowEmojis(!showEmojis)}>😀</button>
        {showEmojis && <span className="emoji-picker"><Picker onSelect={addEmoji} /></span>}
        
      <button type='submit' className="send-button">Send</button>
    </form>
    </div>
  </div>
  );
};

export default App;
