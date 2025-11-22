import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "./../../components/context/StoreContext";
import { assets } from "./../../assets/assets";

const MyOrders = () => {
  const { url, token, fetchOrders, cancelOrder } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function load() {
      await fetchOrders();
    }
    if (token) {
      load();
    }
  }, [token, fetchOrders]);

  // Local state mirrors context orders for instant UI update
  useEffect(() => {
    async function loadOrders() {
      if (!token) return;
      const response = await fetch(`${url}/api/order/userorders`, {
        method: "POST",
        headers: { token },
      });
      const data = await response.json();
      setOrders(data.data || []);
    }
    loadOrders();
  }, [token, url]);

  const handleTrack = (order) => {
    alert(`Order #${order._id || order.id} is currently: ${order.status}`);
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    await cancelOrder(orderId);
    setOrders((prev) => prev.filter((o) => o._id !== orderId));
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img
                src={order.items[0]?.image || assets.food_placeholder}
                alt={order.items[0]?.name || "Food"}
              />
              <p>
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i !== order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>₹{order.amount}</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <div className="my-orders-actions">
                <button className="track" onClick={() => handleTrack(order)}>
                  Track Order
                </button>
                {order.status.toLowerCase() !== "delivered" && (
                  <button
                    className="cancel"
                    onClick={() => handleCancel(order._id || order.id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
