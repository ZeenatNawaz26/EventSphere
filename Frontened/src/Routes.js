import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./Components/Layouts/PublicLayout";
// import "./.style.css";
// ✅ Import public pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Speaker from "./Pages/Speaker";
import Schedule from "./Pages/Schedule";
import Sponsor from "./Pages/Sponsor";
import Contact from "./Pages/Contact";
import FeedbackForm from "./Pages/FeedbackForm";
// import BuyTicket from "./Pages/BuyTicket";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Public Pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="speaker" element={<Speaker />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="sponsor" element={<Sponsor />} />
        <Route path="contact" element={<Contact />} />
        <Route path="feedback" element={<FeedbackForm />} />
        {/* <Route path="buy-ticket" element={<BuyTicket />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
