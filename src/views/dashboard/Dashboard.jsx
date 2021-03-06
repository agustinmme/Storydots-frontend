import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getTokenLocal } from "../../../utils/auth";
import Navbar from "../../components/navbar/Navbar";
import Login from "../pages/Login";
import HomeDashboard from "./HomeDashboard";
function Dashboard() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (getTokenLocal()) {
      setUser(true);
      return;
    }
  }, []);

  return (
    <>
      {user ? (
        <Box>
          <Navbar login={user}/>
          <HomeDashboard />
        </Box>
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
}

export default Dashboard;
