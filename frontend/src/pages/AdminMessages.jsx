import { useEffect, useState } from "react";
import api from "../services/api";

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/messages");
      setMessages(res.data.messages || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`/messages/${id}`);
      alert("Message Deleted");
      fetchMessages();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete");
    }
  };

  return (
    <div>
      <h1>Contact Messages</h1>

      {messages.length === 0 ? (
        <p>No Messages Found</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id}>
            <h3>{msg.name}</h3>

            <p><b>Email:</b> {msg.email}</p>

            <p><b>Subject:</b> {msg.subject}</p>

            <p>{msg.message}</p>

            <button onClick={() => deleteMessage(msg._id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default AdminMessages;
