import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Calendar, MapPin, Printer, Home } from "lucide-react";
import type { Tour } from "../types";

export default function Confirmation() {
  const location = useLocation();
  const { bookingId, tour, date, total, guest } = (location.state as any) || {};

  if (!bookingId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-gray-600 mb-4">No booking information found.</p>
        <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-green-100 text-lg">Your adventure awaits. We've sent a confirmation email to {guest.email}.</p>
          </div>

          {/* Booking Details */}
          <div className="p-8">
            <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Booking Reference</p>
                <p className="text-2xl font-mono font-bold text-gray-900">#{bookingId.toString().padStart(6, '0')}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">${Number(total).toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Tour Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img src={(tour as Tour).images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{(tour as Tour).title}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3 mr-1" /> {(tour as Tour).departureLocation}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Guest Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium text-gray-900">Name:</span> {guest.name}</p>
                  <p><span className="font-medium text-gray-900">Email:</span> {guest.email}</p>
                  <p><span className="font-medium text-gray-900">Phone:</span> {guest.phone}</p>
                  {guest.notes && (
                    <p className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                      <span className="font-bold block mb-1">Note:</span> {guest.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-100">
              <button 
                onClick={() => window.print()}
                className="flex items-center justify-center px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Printer className="w-5 h-5 mr-2" /> Print Receipt
              </button>
              <Link
                to="/"
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
              >
                <Home className="w-5 h-5 mr-2" /> Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
