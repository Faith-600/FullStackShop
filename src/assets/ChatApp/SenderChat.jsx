import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";

function SenderChat({ receiver }) {
  const [messages, setMessages] = useState([]);
  const { username } = useContext(UserContext);

  // Function to fetch messages from the backend
  const fetchMessages = () => {
    if (receiver) {
      axios
        .get(`https://full-stack-shop-backend.vercel.app/messages/${username}/${receiver}`)
        .then((response) => {
          setMessages(response.data); // Update state with new messages
        })
        .catch((error) => console.error("Error fetching messages:", error));
    }
  };

  useEffect(() => {
    // Fetch messages initially when the component mounts or receiver changes
    fetchMessages();

    // Set up polling to fetch new messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds

    return () => {
      clearInterval(interval); // Cleanup on unmount
    };
  }, [username, receiver]); // Re-run this effect when username or receiver changes

  // Display message if no receiver is selected
  if (!receiver) {
    return <p className="text-gray-500 text-center">Select a user to start chatting.</p>;
  }

  return (
    <div className="p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start mb-4 ${
            message.sender === username ? "justify-end" : "justify-start"
          }`}
        >
          {message.sender !== username && (
            <img
              src={`https://robohash.org/${message.sender}`}
              alt={`${message.sender}'s Avatar`}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
          )}
          <div
            className={`inline-block px-4 py-2 rounded-lg ${
              message.sender === username
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <p className="font-semibold">
              {message.sender === username ? "You" : message.sender}
            </p>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SenderChat;
