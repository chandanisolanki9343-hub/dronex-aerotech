import { useEffect, useState } from "react";
import api from "../services/api";

function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);

  const fetchSubscribers = async () => {
    try {
      const res = await api.get("/newsletter");
      setSubscribers(res.data.subscribers || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const deleteSubscriber = async (id) => {
    try {
      await api.delete(`/newsletter/${id}`);
      alert("Subscriber Deleted");
      fetchSubscribers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Newsletter Subscribers</h1>

      <h3>Total Subscribers: {subscribers.length}</h3>

      {subscribers.length === 0 ? (
        <p>No Subscribers Found</p>
      ) : (
        subscribers.map((sub) => (
          <div
            key={sub._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{sub.email}</h3>

            <button
              onClick={() => deleteSubscriber(sub._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminSubscribers;
