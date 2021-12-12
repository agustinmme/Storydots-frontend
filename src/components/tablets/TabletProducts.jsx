import React, { useState, useEffect } from "react";
import ProductModal from "../modals/ProductModal";
import ProductUpdate from "../modals/ProductUpdate";
import ProductDelete from "../modals/ProductDelete";
import ProductAdd from "../modals/ProductAdd";
import { chakra, Flex, Text, Stack, SimpleGrid } from "@chakra-ui/react";
import CustomSpinner from "../spinner/Spinner";
import Pagination from "../pagination/Pagination";
import api from "../../services/api-nodejs";

export default function Tabletproducts() {
  const [data, setData] = useState({});
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const products = async () => {
      try {
        setPending(true);
        const response = await api.getPageProduct(page);
        setData(response);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    products();
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

  const reloadData = async () => {
    try {
      setPending(true);
      const response = await api.getPageProduct(page);
      setData(response);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack mt={10}>
      {!pending ? <ProductAdd reload={reloadData} /> : null}
      <Flex w="full" alignItems="center" justifyContent="center">
        <Stack direction={{ base: "column" }} w="full" spacing={5}>
          {pending ? (
            <CustomSpinner />
          ) : (
            data.content.map((product) => {
              return (
                <Flex
                  direction={{ base: "row", md: "column" }}
                  bg={"white"}
                  key={product.id}
                  border={"1px solid"}
                  _hover={{ color: "primary.400", bg: "secondary.50" }}
                >
                  <SimpleGrid
                    spacingY={5}
                    columns={{ base: 1, md: 3 }}
                    w="full"
                    py={3}
                    px={10}
                    fontWeight="hairline"
                    mt={2}
                  >
                    <Text pr={1}>{product.name}</Text>
                    <chakra.span
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                    >
                      {product.brand.name}
                    </chakra.span>
                    <Flex justify={{ md: "end" }}>
                      <ProductModal
                        name={product.name}
                        description={product.description}
                        img={product.image_url}
                        price={product.price}
                        brand={product.brand}
                        text={"VER"}
                      />
                      <ProductUpdate
                        name={product.name}
                        description={product.description}
                        image={product.image_url}
                        price={product.price}
                        id={product.id}
                        brand={product.brand.id}
                        reload={reloadData}
                      />
                      <ProductDelete
                        name={product.name}
                        id={product.id}
                        reload={reloadData}
                      />
                    </Flex>
                  </SimpleGrid>
                </Flex>
              );
            })
          )}
        </Stack>
      </Flex>
      {!pending ? (
        <Pagination
          totalPages={data.totalPages}
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      ) : null}
    </Stack>
  );
}
