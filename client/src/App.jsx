import { Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./Pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./Context/UseContext";
import AccountPage from "./Pages/AccountPage";
import AccommodationsPage from "./Pages/AccommodationsPage";
import AccommodationFormPage from "./Pages/AccommodationFormPage";
import AccommodationPage from "./Pages/AccommodationPage";
import Bookings from "./Pages/BookingsPage";
import BookingPage from "./Pages/BookingPage";

axios.defaults.baseURL = "http://192.168.0.106:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/account/accommodations"
            element={<AccommodationsPage />}
          />
          <Route
            path="/account/accommodations/new"
            element={<AccommodationFormPage />}
          />

          <Route
            path="/account/accommodations/:id"
            element={<AccommodationFormPage />}
          />
          <Route path="/place/:id" element={<AccommodationPage />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
