import { useState, useRef, useEffect } from "react";
import { fetchUserResponse } from "../Utils/Api";
import "../assests/Styles/chatLayout.css"

interface ChatMessage {
  id: number;
  sender: string;
  time: string;
  message: string;
  status: string;
}

export default function ChatLayout() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "Obi-Wan Kenobi",
      time: "12:45",
      message: "You were the Chosen One!",
      status: "Delivered",
    },
    {
      id: 2,
      sender: "Anakin",
      time: "12:46",
      message: "I hate you!",
      status: "Seen at 12:46",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const textInputRef = useRef<HTMLTextAreaElement | null>(null);

  const addChatMessage = async (sender: string, message: string) => {
    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: sender,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      message: message,
      status: "Delivered",
    };

    // Use a promise to wait for the state update before resolving
    await new Promise(resolve => {
      setChatMessages(prevMessages => {
        const updatedMessages = [...prevMessages, newMessage];
        resolve(updatedMessages);
        return updatedMessages;
      });
    });
  };


  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        // Add the user message immediately to the chat
        addChatMessage("You", newMessage);

        const userResponse = await fetchUserResponse(newMessage);
        await addChatMessage("Bot", userResponse);
      } catch (error) {
        console.error("Error fetching user response", error);
      }
    }
  };
  useEffect(() => {
    scrollToBottom();

    setNewMessage("");

    // Focus on the text input after sending a message
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [chatMessages]);

  return (
    <div
      className="rounded-box p-4 flex flex-col overflow-hidden relative"
      data-theme="dark"
    >
      <div className="avatar py-2">
        <div className="w-10 rounded-full">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="User Avatar"
          />
        </div>
        <p>
          <p className="text-base ml-4 font-bold">Neeraj Kumar</p>
          <p className="text-xs ml-4 font-medium text-slate-500">Active</p>
        </p>
      </div>

      <div
        ref={chatContainerRef}
        id="journal-scroll"
        className="rounded-box p-4 bg-gray-700 flex-grow overflow-y-auto pb-16"
      >
        {/* Render existing chat messages */}
        {chatMessages.map((chat) => (
          <div
            key={chat.id}
            className={`chat ${
              chat.sender === "Bot" ? "chat-start" : "chat-end"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              {chat.sender + "\t"}
              <time className="text-xs opacity-50">{chat.time}</time>
            </div>
            <div className="chat-bubble">{chat.message}</div>
            <div className="chat-footer opacity-50">{chat.status}</div>
          </div>
        ))}
      </div>
      <div className="text-input-mine flex gap-2  absolute bottom-0 left-0 w-full p-8">
        <textarea
          ref={textInputRef}
          id="chat"
          rows={1}
          className="flex-grow no-scrollbar p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault(); 
              sendMessage();
            }
          }}
        ></textarea>
        <button className="btn px-4 " onClick={sendMessage}>
          <svg
            className="w-6 h-10"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#a)">
              <path d="m1 17 24 10 6-26L1 17Z" fill="#2F80ED" />
              <path d="m13 31 5.1-6.87L13 22v9Z" fill="#2F80ED" />
              <path
                d="m22 12-9 10v9l3-4M31 1 1 17l24 10 6-26Z"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h32v32H0z" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
}
