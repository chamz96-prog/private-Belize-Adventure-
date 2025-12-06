import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      await api.post("/payments/mock-pay", { bookingId: Number(id) });
      navigate("/confirmation");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md text-center">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <p className="mb-6">Booking ID: {id}</p>
      <div className="bg-yellow-100 p-4 rounded mb-6">
        <p className="text-yellow-800">
          <strong>Test Mode:</strong> No real money will be charged.
        </p>
      </div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded font-bold hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now (Test Mode)"}
      </button>
    </div>
  );
}
