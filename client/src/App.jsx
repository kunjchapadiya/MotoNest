import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// User side Pages
import Home from './pages/Home';
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Signup from './pages/Signup'
import Login from './pages/Login'

// Admin side Pages
import Dashboard from './pages/admin/Dashboard'
import ManageCar from './pages/admin/ManageCar'
import ManageUser from './pages/admin/ManageUser'
import AddCar from './components/forms/AddCar'
import CarDetail from './components/CarDetail'
import PaymentDetail from './pages/admin/PaymentDetail'
import ManageQuery from './pages/admin/ManageQuery'
import AddBrand from './components/forms/Addbrand'
import ManageMessage from './pages/admin/ManageMessage'
//brand pages
import BrandPage from './pages/BrandwiseCar'
import Brand from './pages/mobile/Brand' // for mobile screen
// body categories
import BodyTypePage from './pages/BodyType'
import Categories from './pages/mobile/Categories' // for mobile screen
import ProtectUserRoute from './components/ProtectUserRoute';

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <AppContent />
        <ToastContainer />
      </Router>
    </>

  );
};

const MobileOnly = ({ children }) => {
  if (window.innerWidth > 768) {
    return <h1 className="text-center mt-20">This page is only available on mobile.</h1>;
  }
  return children;
};

const AppContent = () => {
  const location = useLocation();

  // pages where navbar & footer should be hidden
  const hideLayout = ["/signup", "/login", "/admin", "/admin/managecar", "/admin/manageuser", "/admin/addcar", "/admin/paymentdetail", "/admin/managequery", "/admin/managebrand", "/admin/managemessage"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Protected User Routes (Blocked for Admins) */}
        <Route element={<ProtectUserRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/brand/:brand" element={<BrandPage />} />
          <Route path="/category/:type" element={<BodyTypePage />} />
          <Route
            path="/brands"
            element={
              <MobileOnly>
                <Brand />
              </MobileOnly>
            } />
          <Route
            path="/categories"
            element={
              <MobileOnly>
                <Categories />
              </MobileOnly>
            } />
        </Route>

        {/* Auth pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Admin pages */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/managecar" element={<ManageCar />} />
        <Route path="/admin/managebrand" element={<AddBrand />} />
        <Route path="/admin/manageuser" element={<ManageUser />} />
        <Route path="/admin/addcar" element={<AddCar />} />
        <Route path="/admin/paymentdetail" element={<PaymentDetail />} />
        <Route path="/admin/managequery" element={<ManageQuery />} />
        <Route path="/admin/managemessage" element={<ManageMessage />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
