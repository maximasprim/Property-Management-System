import { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8081");

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.current.onclose = () => console.log("WebSocket Disconnected");

    return () => ws.current?.close();
  }, []);

  const sendMessage = () => {
    if (ws.current && input.trim() !== "") {
      const message = isAdmin ? `Admin: ${input}` : `User: ${input}`;
      ws.current.send(message);
      setMessages((prev) => [...prev, message]);
      setInput("");
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg h-full">
      <div className="flex place-content-center">
      <h1 className="text-2xl font-bold mb-4">Live Chat</h1>
      </div>
      <div className="h-64 overflow-y-auto border border-gray-600 p-2 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-1 ${msg.startsWith("Admin") ? "text-red-400 font-bold" : ""}`}
          >
            {msg}
          </div>
        ))}
      </div>
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={() => setIsAdmin(!isAdmin)}
          className="mr-2"
        />
        <label>Send as Admin</label>
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-green-500 px-4 py-2 ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
