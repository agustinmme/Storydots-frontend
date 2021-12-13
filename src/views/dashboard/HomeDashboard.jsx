import React from "react";
import { Box, chakra, SimpleGrid } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardButton from "../../components/button/DashboardButton";

function HomeDashboard() {

  let navigate = useNavigate();


  return (
    <Box maxW="6xl" mx={"auto"} p={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={5}
        fontWeight={"bold"}
      >
        Bienvenido al Panel de Control
      </chakra.h1>
      <Box
        display={"d-flex"}
        justifyContent={"center"}
        alignContent={"center"}
        mb={7}
      >
        <Box w={"50%"} bgColor={"primary.500"} h={{ base: 1, md: 2 }} />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <DashboardButton
          title={"Productos"}
          onClick={() => {
            navigate("/dashboard/products");
          }}
        />
        <DashboardButton
          title={"Marcas"}
          onClick={() => {
            navigate("/dashboard/brands");
          }}
        />
      </SimpleGrid>

      <Outlet />
    </Box>
  );
}

export default HomeDashboard;
