import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Contacts from "./pages/Contacts.jsx";
import AddContact from "./pages/AddContact.jsx";
import { ContextProvider } from "./store/flux.jsx";

const Layout = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="*" element={<h1 className="text-center mt-5">404 Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ContextProvider>
  );
};

export default Layout;
