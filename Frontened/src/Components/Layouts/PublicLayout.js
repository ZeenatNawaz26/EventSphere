// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Header from "../navbar/Header";
// import Footer from "../navbar/Footer";

// // ✅ Import public pages
// import Home from "../../Pages/Home";
// import About from "../../Pages/About";
// import Speaker from "../../Pages/Speaker";
// import Sponsor from "../../Pages/Sponsor";
// import Contact from "../../Pages/Contact";

// const PublicLayout = () => {
//   return (
//     <div className="public-container">
//       <Header />
//       <main>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/speaker" element={<Speaker />} />
//           <Route path="/sponsors" element={<Sponsor />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default PublicLayout;
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../navbar/Header";
import Footer from "../navbar/Footer";

const PublicLayout = () => {
  return (
    <div className="public-container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
