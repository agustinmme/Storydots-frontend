import React, { useState, useEffect } from "react";
import { SimpleGrid, Container, Text, Box } from "@chakra-ui/react";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Carousel from "../../components/carousel/Carousel";
import ProductCard from "../../components/cards/ProductCard";
import Pagination from "../../components/pagination/Pagination";
import api from "../../services/api-nodejs";
import SpinnerCustom from "../../components/spinner/Spinner";
import { isEmpty } from "../../../utils/utils";

function App() {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.getPageProduct(page);
        setData(response);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

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
    <Box>
      <Navbar />
      <Carousel />
      <Container py={4} maxW={"6xl"}>
        <Box
          display={"d-flex"}
          justifyContent={"center"}
          alignContent={"center"}
          mt={4}
        >
          <Text fontWeight={"600"} fontSize={{ base: "xl", md: "3xl" }} mb={2}>
            Conseguí los mejores productos:
          </Text>
        </Box>

        <Box
          display={"d-flex"}
          justifyContent={"center"}
          alignContent={"center"}
          mt={4}
        >
          <Box w={"50%"} bgColor={"primary.500"} h={{ base: 1, md: 2 }} />
        </Box>
        <SimpleGrid
          columns={pending ? { base: 1, md: 1 } : { base: 1, md: 3 }}
          spacing={2}
        >
          {pending ? (
            <SpinnerCustom />
          ) : (
            data.content.map(
              ({ id, name, description, image_url, price, brand }) => (
                <ProductCard
                  key={id}
                  name={name}
                  description={description}
                  img={image_url}
                  price={price}
                  brand={brand}
                />
              )
            )
          )}
        </SimpleGrid>
        {isEmpty(data)?null:<Pagination
          data={data}
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
        />}
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
