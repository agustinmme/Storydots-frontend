import React, { useState, useEffect } from "react";
import ProductAdd from "../modals/Product/ProductAdd";
import { Flex, Stack } from "@chakra-ui/react";
import CustomSpinner from "../spinner/Spinner";
import Pagination from "../pagination/Pagination";
import api from "../../services/api-nodejs";
import Product from "./Product";

export default function TabletProducts() {
  const [data, setData] = useState({});
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let isSubscribed  = true;
    const products = async () => {
      try {
        if(isSubscribed){
          setPending(true);
          const response = await api.getPageProduct(page);
          setData(response);
          setPending(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    products();
    return () => {
      isSubscribed = false;
    }
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
                <Product
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  image={product.image_url}
                  price={product.price}
                  brand={product.brand}
                  reload={reloadData}
                />
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
