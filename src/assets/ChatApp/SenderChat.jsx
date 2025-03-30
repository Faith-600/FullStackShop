import React from "react";



function SenderChat({ messages, username }) {
  if (!messages.length) {
    return <p className="text-gray-500 text-center">No messages yet.</p>;
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