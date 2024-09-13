import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const GeminiChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello Friend! Ask me anything about E-Bikes😊', sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { id: messages.length + 1, text: inputMessage, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputMessage('');

    try {
      const response = await axios.post('https://ebikes-ten.vercel.app/chat', {
        prompt: inputMessage
      });

      const botMessage = { id: messages.length + 2, text: response.data.text, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { id: messages.length + 2, text: 'Sorry, something went wrong.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom whenever messages change
  

  return (
    <div className="flex flex-col lg:h-[50rem] h-[35rem] w-full mx-auto bg-base-200 lg:p-12 p-4 rounded-3xl lg:mt-32 mt-16 mb-16 lg:mb-32">

      {/* Chat Box */}
      <div className="flex-1 bg-base-100 shadow-md rounded-lg p-4 flex flex-col space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`chat-bubble p-3 rounded-lg shadow-sm lg:text-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-black dark:text-white'}`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* This empty div helps in scrolling to the bottom */}
      </div>

      {/* Input Box */}
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default GeminiChat;