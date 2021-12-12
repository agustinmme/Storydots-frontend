import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../views/pages/Home";
import Dashboard from "../views/dashboard/Dashboard";
import Hola from "../views/dashboard/Hola";
import Chau from "../views/dashboard/Chau";
import TabletProducts from "../components/tablets/TabletProducts";
function DashboardRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dashboard"} element={<Dashboard />}>
          <Route path={"products"} element={<TabletProducts />} />
          <Route path={"chau"} element={<Chau />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default DashboardRoutes;
