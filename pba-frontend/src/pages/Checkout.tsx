import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import type { Quote, Tour } from "../types";
import CheckoutLayout from "../components/checkout/CheckoutLayout";
import OrderSummary from "../components/checkout/OrderSummary";
import ContactForm from "../components/checkout/ContactForm";
import PaymentForm from "../components/checkout/PaymentForm";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quote, date, tour } = (location.state as { quote: Quote; date: string; tour: Tour }) || {};

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  if (!quote || !tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking details found</h2>
        <p className="text-gray-600 mb-8">Please select a tour to start your booking.</p>
        <button 
          onClick={() => navigate('/tours')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
        >
          Browse Tours
        </button>
      </div>
    );
  }

  const handleContactSubmit = () => {
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    try {
      // 1. Create Booking
      const bookingRes = await api.post("/bookings", {
        tourId: tour.id,
        date,
        adults: quote.adults,
        children: quote.children,
        guest: formData,
      });

      // 2. Process Payment (Mock)
      // In a real app, we would use Stripe/PayPal here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

      // 3. Navigate to Confirmation
      navigate("/confirmation", { 
        state: { 
          bookingId: bookingRes.data.id,
          tour,
          date,
          total: quote.total,
          guest: formData
        } 
      });
    } catch (err) {
      console.error(err);
      alert("Error processing booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <CheckoutLayout currentStep={step}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Forms */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <ContactForm 
              data={formData} 
              onChange={setFormData} 
              onSubmit={handleContactSubmit} 
            />
          )}
          
          {step === 2 && (
            <PaymentForm 
              onSubmit={handlePaymentSubmit} 
              onBack={() => setStep(1)}
              isProcessing={isProcessing}
            />
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary tour={tour} quote={quote} date={date} />
        </div>
      </div>
    </CheckoutLayout>
  );
}
