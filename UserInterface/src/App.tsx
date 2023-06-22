import React from "react";
import { BrowserRouter as Router, Routes, Route, useSearchParams, useLocation } from "react-router-dom";

import Sidebar from "./components/SideBar/Sidebar";

import Redirecting from './pages/Redirecting';
import Home from "./pages/Home";
import DeliveryPackage from "./pages/delivery_packages/DeliveryPackage";
import Delivery from "./pages/deliveries/Delivery";
import Path from "./pages/paths/Path";
import Warehouse from "./pages/warehouses/Warehouse";
import Truck from "./pages/trucks/Truck";
import Planning from "./pages/planning/Planning";
import User from "./pages/users/User";
import HandleLogin from "./pages/HandleLogin";
import Trip from "./pages/trips/Trip";

const App: React.FunctionComponent = () => {

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delivery_packages" element={<DeliveryPackage />} />
          <Route path="/deliveries" element={<Delivery />} />
          <Route path="/paths" element={<Path />} />
          <Route path="/warehouses" element={<Warehouse />} />
          <Route path="/trucks" element={<Truck />} />
          <Route path="/planning" element={<Planning />} />
          <Route path='/users' element={<User />} />
          <Route path='/trips' element={<Trip />} />
          <Route path='/model3d' element={<Redirecting />} />
          <Route path='/logged-in' element={<HandleLogin />} />
        </Routes>
      </Router>
    </>
  );
};


export default App;
