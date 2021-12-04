import React, { useState } from "react";

import { Box, chakra, SimpleGrid, Stack } from "@chakra-ui/react";
import Tablet from "../../components/tablet/Tablet";
import Pagination from "../../components/pagination/Pagination";
import api from "../../services/api-nodejs";
import SpinnerCustom from "../../components/spinner/Spinner";
import PanelButtons from "../../components/button/PanelButtons";

function HomeDashboard({ token }) {
  const [data, setData] = useState({});
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(0);
  const Products = async () => {
    try {
      setPending(true);
      const response = await api.getPageProduct(page);
      setData(response);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };
  const prevPage = async () => {
    try {
      setPending(true);
      const response = await api.getPageProduct(page - 1);
      setPage(page - 1);
      setData(response);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };
  const nextPage = async () => {
    try {
      setPending(true);
      const response = await api.getPageProduct(page + 1);
      setPage(page + 1);
      setData(response);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box maxW="6xl" mx={"auto"} p={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Bienvenido al Panel de Control
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <PanelButtons
          title={"Productos"}
          onClick={Products}
          isActive={data.name}
        />
        <PanelButtons title={"Marcas"} />
      </SimpleGrid>
      {Object.entries(data).length === 0 ? null : pending ? (
        <SpinnerCustom />
      ) : (
        <Stack>
          <Tablet data={data.content} token={token} />
          <Pagination
            data={data}
            page={page}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </Stack>
      )}
    </Box>
  );
}

export default HomeDashboard;
