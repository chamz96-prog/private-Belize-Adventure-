import { useEffect, useState } from 'react';
import { Users, Map, CalendarDays, DollarSign } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import { api } from '../../api/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    tours: 0,
    bookings: 0,
    revenue: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, we'd have a specific stats endpoint
        // For now, we'll fetch lists and count them (inefficient but works for MVP)
        const [toursRes, bookingsRes] = await Promise.all([
          api.get('/tours'),
          // api.get('/admin/bookings') // We need to implement this endpoint
        ]);
        
        setStats({
          tours: toursRes.data.length,
          bookings: 12, // Mock for now
          revenue: 15400, // Mock for now
          users: 5, // Mock for now
        });
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tours"
          value={stats.tours}
          icon={Map}
          color="blue"
        />
        <StatCard
          title="Total Bookings"
          value={stats.bookings}
          icon={CalendarDays}
          color="green"
          trend="+12% from last month"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={DollarSign}
          color="yellow"
          trend="+8% from last month"
        />
        <StatCard
          title="Active Users"
          value={stats.users}
          icon={Users}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Bookings</h3>
          <div className="text-gray-500 text-center py-8">
            Chart or list will go here
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Tours</h3>
          <div className="text-gray-500 text-center py-8">
            Chart or list will go here
          </div>
        </div>
      </div>
    </div>
  );
}
