import React,{useContext,useEffect,useState} from "react";
import { UserContext } from "../../App";
import axios from "axios";
import SenderChat from "./SenderChat";


const ChatWeb = () => {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const { username } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [lastMessages, setLastMessages] = useState({});
  const [messages, setMessages] = useState([]); 

  useEffect(() => {
    axios
      .get("https://full-stack-shop-backend.vercel.app/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    if (!receiver) return;

    const fetchMessages = () => {
      axios
        .get(`https://full-stack-shop-backend.vercel.app/messages/${username}/${receiver}`)
        .then((response) => {
          setMessages(response.data);

          // Update last messages for sorting
          if (response.data.length > 0) {
            const lastMessage = response.data[response.data.length - 1]; 
            setLastMessages((prevMessages) => ({
              ...prevMessages,
              [receiver]: { content: lastMessage.content, timestamp: new Date(lastMessage.timestamp) },
            }));
          }
        })
        .catch((error) => console.error("Error fetching messages:", error));
    };

    fetchMessages(); 
    const interval = setInterval(fetchMessages, 3000); 

    return () => clearInterval(interval);
  }, [receiver, username]);

  const sendMessage = () => {
    if (message.trim() && receiver) {
      const newMsg = { sender: username, receiver, content: message, timestamp: new Date() };

      axios
        .post("https://full-stack-shop-backend.vercel.app/messages", newMsg)
        .then(() => {
          setMessage("");
          setMessages((prevMessages) => [...prevMessages, newMsg]); 
          setLastMessages((prevMessages) => ({
            ...prevMessages,
            [receiver]: { content: newMsg.content, timestamp: new Date() },
          }));
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-white border-r border-gray-300 mt-6">
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
        </header>
        <div>
          <div className="flex mb-6">
            <div>
              {users.length === 0 ? (
                <p>No users found</p>
              ) : (
                users.map((user) => (
                  <li
                    key={user.id}
                    role="button"
                    onClick={() => setReceiver(user.name)}
                    onKeyDown={(e) => e.key === 'Enter' && setReceiver(user.name)}
                    className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
                    tabIndex="0"
                  >
                    <img
                      src={`https://robohash.org/${user.name}`}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <p className="font-semibold text-lg">
                      {user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}
                    </p>
                    <p className="text-sm text-gray-500">{lastMessages[user.name]?.content || ""}</p>
                  </li>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">{receiver || "Select a user to chat"}</h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          <SenderChat messages={messages} username={username} />
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
              onClick={sendMessage}
              disabled={username === "Guest"}>
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};




export default ChatWeb;



