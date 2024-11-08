import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthProvider';
import ReactMarkdown from 'react-markdown';

const GeminiChat = () => {

  const {user} = useContext(AuthContext);

  const [messages, setMessages] = useState([
    { id: 1, text: `Hello ${user.displayName}! Ask me anything about E-Bikes😊`, sender: 'bot' }
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

   
  };


  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  } , [messages]);

  return (
    <div className="flex flex-col h-[35rem] w-full mx-auto bg-base-200 lg:p-12 p-4 rounded-3xl lg:mt-32 mt-16 mb-10">

      {/* Chat Box */}
      <div className="flex-1 bg-base-100 h-1/2 shadow-md rounded-lg p-4 flex flex-col space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`chat-bubble p-3 rounded-lg shadow-sm lg:text-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-white'}`}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> 
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
