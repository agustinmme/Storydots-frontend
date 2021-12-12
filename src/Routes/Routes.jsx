import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../views/pages/Home";
import Dashboard from "../views/dashboard/Dashboard";
import TabletProducts from "../components/tablets/TabletProducts";
import TabletBrands from "../components/tablets/TabletBrands";
function DashboardRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dashboard"} element={<Dashboard />}>
          <Route path={"products"} element={<TabletProducts />} />
          <Route path={"brands"} element={<TabletBrands />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default DashboardRoutes;
