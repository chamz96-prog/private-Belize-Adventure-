import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TourDetail from "./pages/TourDetail";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import ToursListPage from "./pages/ToursListPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTours from "./pages/admin/AdminTours";
import AdminTourForm from "./pages/admin/AdminTourForm";
import AdminTourCategories from "./pages/admin/AdminTourCategories";
import AdminTourAttributes from "./pages/admin/AdminTourAttributes";
import AdminTourAttributeEdit from "./pages/admin/AdminTourAttributeEdit";
import AdminTourAttributeTerms from "./pages/admin/AdminTourAttributeTerms";
import AdminTourTermEdit from "./pages/admin/AdminTourTermEdit";
import AdminTourAvailability from "./pages/admin/AdminTourAvailability";
import AdminTourBookingCalendar from "./pages/admin/AdminTourBookingCalendar";
import AdminTourRecovery from "./pages/admin/AdminTourRecovery";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminLocations from "./pages/admin/AdminLocations";
import AdminLocationCategories from "./pages/admin/AdminLocationCategories";
import AdminLocationCategoryEdit from "./pages/admin/AdminLocationCategoryEdit";
import AdminLocationEditor from "./pages/admin/AdminLocationEditor";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminPages from "./pages/admin/AdminPages";
import AdminPageEditor from "./pages/admin/AdminPageEditor";
import PageViewer from "./pages/PageViewer";
import { AuthProvider } from "./api/AuthContext";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import LocationDetail from "./pages/LocationDetail";

// Force HMR update
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Header />
          <main className="py-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tours" element={<ToursListPage />} />
              <Route path="/tours/destination/:destinationSlug" element={<ToursListPage />} />
              <Route path="/tours/category/:categorySlug" element={<ToursListPage />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
              <Route path="/belize-tours-destination/:slug" element={<LocationDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />
              
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/p/:slug" element={<PageViewer />} />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="locations" element={<AdminLocations />} />
                <Route path="locations/categories" element={<AdminLocationCategories />} />
                <Route path="locations/categories/:id/edit" element={<AdminLocationCategoryEdit />} />
                <Route path="locations/new" element={<AdminLocationEditor />} />
                <Route path="locations/edit/:id" element={<AdminLocationEditor />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="pages/new" element={<AdminPageEditor />} />
                <Route path="pages/edit/:id" element={<AdminPageEditor />} />
                <Route path="tours" element={<AdminTours />} />
                <Route path="tours/new" element={<AdminTourForm />} />
                <Route path="tours/edit/:id" element={<AdminTourForm />} />
                <Route path="tours/categories" element={<AdminTourCategories />} />
                <Route path="tours/attributes" element={<AdminTourAttributes />} />
                <Route path="tours/attributes/:id/edit" element={<AdminTourAttributeEdit />} />
                <Route path="tours/attributes/:id/terms" element={<AdminTourAttributeTerms />} />
                <Route path="tours/attributes/:id/terms/:termId/edit" element={<AdminTourTermEdit />} />
                <Route path="tours/availability" element={<AdminTourAvailability />} />
                <Route path="tours/booking-calendar" element={<AdminTourBookingCalendar />} />
                <Route path="tours/recovery" element={<AdminTourRecovery />} />
                <Route path="bookings" element={<AdminBookings />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
