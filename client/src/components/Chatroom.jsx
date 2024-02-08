import React from 'react'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'

export default function Chatroom() {
  const [currentRoom, setRoom] = useState('room1');

  const [myMessage, setMyMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ioClient] = useState(() => io.connect('http://localhost:8081'));

  useEffect(() => {

    ioClient.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    
    return () => {
      ioClient.off('receive_message');
      ioClient.disconnect();
    };
  }, [ioClient]);

  const sendMessage = () => {
    const room = 'room1';
    ioClient.emit('send_message', { message: myMessage, room });
   
    setMyMessage('');
  };

  return (
    <div>
      <h1>Chatroom</h1>
      <div>
        <label htmlFor="room-selection">Choose a room:</label>
        <select
          id="room-selection"
          value={currentRoom}
          onChange={(e) => setCurrentRoom(e.target.value)}
        >
          <option value="">Select a room</option>
          <option value="room1">Room 1</option>
          <option value="room2">Room 2</option>
          <option value="room3">Room 3</option>
          {/* Add more rooms as needed */}
        </select>
      </div>
      <input
        type="text"
        placeholder="Enter your message"
        value={myMessage}
        onChange={(e) => setMyMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
  
}
