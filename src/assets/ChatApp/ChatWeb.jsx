import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import SenderChat from "./SenderChat";

const ChatWeb = () => {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const { username } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    // Fetch users list
    axios
      .get("https://full-stack-shop-backend.vercel.app/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    // Poll for new messages every 3 seconds
    const interval = setInterval(() => {
      if (receiver) {
        axios
          .get(`https://full-stack-shop-backend.vercel.app/messages/${username}/${receiver}`)
          .then((response) => {
            const newMessages = response.data;
            setLastMessages((prevMessages) => ({
              ...prevMessages,
              [receiver]: newMessages,
            }));
          })
          .catch((error) => console.error("Error fetching messages:", error));
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [receiver, username]);

  const sendMessage = () => {
    if (message.trim() && receiver) {
      axios
        .post("https://full-stack-shop-backend.vercel.app/messages", {
          sender: username,
          receiver,
          content: message,
        })
        .then(() => {
          setMessage(""); // Clear message input after sending
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  const sortedUsers = users
    .map((user) => ({
      ...user,
      lastMessage: lastMessages[user.name]?.content || "",
    }))
    .sort((a, b) => (b.lastMessage ? 1 : 0)); // Sort users based on message availability

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-white border-r border-gray-300 mt-6">
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
        </header>
        <div>
          <ul>
            {sortedUsers.length === 0 ? (
              <p>No users found</p>
            ) : (
              sortedUsers.map((user) => (
                <li
                  key={user.id}
                  onClick={() => setReceiver(user.name)}
                  className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
                >
                  <img
                    src={`https://robohash.org/${user.name}`}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.lastMessage}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="flex-1">
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">{receiver || "Select a user to chat"}</h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {receiver && <SenderChat receiver={receiver} />}
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
              onClick={sendMessage}
              disabled={username === "Guest"}
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatWeb;
