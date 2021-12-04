import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from "../views/pages/Home";
import Dashboard from "../views/dashboard/Dashboard";
function DashboardRoutes() {


  return (
    <Router>
      <Routes>
        <Route exact path={"/"} element={<Home/>} />
        <Route exact path={"/dashboard"} element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default DashboardRoutes;