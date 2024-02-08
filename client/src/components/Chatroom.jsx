import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../AuthContext';

export default function Chatroom() {
  const [myMessage, setMyMessage] = useState('');
  const [currentRoom, setRoom] = useState('devops');
  const [changeRoom, setChangeRoom] = useState(false); 
  const { username } = useAuth();
  const [messages, setMessages] = useState([]);
  const ioClient = io.connect('http://localhost:8081'); 

  useEffect(() => {

    ioClient.emit('join_room', currentRoom, username);

    ioClient.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    ioClient.on('load_previous_messages', (previousMessages) => {
      setMessages(previousMessages);
    });

  
    return () => {
      ioClient.emit('leave_room', currentRoom, username);
      ioClient.disconnect();
    };
  }, [currentRoom, username]);

  const handleRoomChange = (e) => {
    const newRoom = e.target.value;
    setRoom(newRoom); 
    setMessages([])
    setChangeRoom(false); 

  };

  const sendMessage = () => {
    const messageData = {
      from_user: username,
      room: currentRoom,
      message: myMessage,
    };
    ioClient.emit('send_message', messageData);
    setMyMessage(''); 
  };

  return (
    <div className="chatroom-container">
    <h1 className="chatroom-header">Chatroom</h1>
    <h2 className="current-room-header">Current Room: {currentRoom}</h2>
    {changeRoom ? (
      <div className="room-selection-container">
        <label className="room-selection-label" htmlFor="room-selection">Choose a room:</label>
        <select
          id="room-selection"
          className="room-selection-dropdown"
          value={currentRoom}
          onChange={handleRoomChange}
        >
          <option value="devops">Devops</option>
          <option value="cybersecurity">Cybersecurity</option>
          <option value="cloud">Cloud Computing</option>
        </select>
      </div>
    ) : (
      <button className="change-room-button" onClick={() => setChangeRoom(true)}>Change Room</button>
    )}
    <div className="message-input-container">
      <input
        type="text"
        className="message-input-field"
        placeholder="Enter your message"
        value={myMessage}
        onChange={(e) => setMyMessage(e.target.value)}
      />
      <button className="send-message-button" onClick={sendMessage}>Send</button>
    </div>
    <ul className="message-list">
      {messages.map((message, index) => (
        <li className="message-item" key={index}>
          <strong>{message.from_user}: </strong>{message.message}
          <span className="message-timestamp"> {new Date(message.date_sent).toLocaleTimeString()}</span>
        </li>
      ))}
    </ul>
  </div>

  );
}
