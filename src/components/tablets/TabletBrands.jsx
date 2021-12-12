import React, { useState, useEffect } from "react";
import ProductAdd from "../modals/Product/ProductAdd";
import { Flex, Stack } from "@chakra-ui/react";
import CustomSpinner from "../spinner/Spinner";
import Pagination from "../pagination/Pagination";
import api from "../../services/api-nodejs";
import Brand from "./Brand";

export default function TabletBrands() {
  const [data, setData] = useState({});
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    const brands = async () => {
      try {
        setPending(true);
        const response = await api.getPageBrand(page);
        setData(response);
        setPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    brands();
  }, []);

  const prevPage = async () => {
    try {
      setPending(true);
      const response = await api.getPageBrand(page - 1);
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
      const response = await api.getPageBrand(page + 1);
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
            data.content.map((brand) => {
              return (
                <Brand
                  key={brand.id}
                  id={brand.id}
                  name={brand.name}
                  image={brand.logo_url}
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
