import { useEffect, useState } from 'react';
import { api } from '../../api/client';

// Define Booking interface locally or import from types if available
interface Booking {
  id: number;
  tourId: number;
  userId: number;
  date: string;
  adults: number;
  children: number;
  totalPrice: number;
  status: string;
  contactName: string;
  contactEmail: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now since we don't have a full admin bookings endpoint yet
    // In a real app, fetch from /admin/bookings
    setBookings([
      {
        id: 1,
        tourId: 1,
        userId: 1,
        date: '2025-12-15',
        adults: 2,
        children: 0,
        totalPrice: 170,
        status: 'confirmed',
        contactName: 'John Doe',
        contactEmail: 'john@example.com',
      },
      {
        id: 2,
        tourId: 2,
        userId: 2,
        date: '2025-12-20',
        adults: 1,
        children: 2,
        totalPrice: 245,
        status: 'pending',
        contactName: 'Jane Smith',
        contactEmail: 'jane@example.com',
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Bookings Management</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Guests</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">#{booking.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{booking.contactName}</div>
                    <div className="text-sm text-gray-500">{booking.contactEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.adults} Ad, {booking.children} Ch
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${booking.totalPrice}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
