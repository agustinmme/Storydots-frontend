import React from "react";
import ProductModal from "../modals/ProductModal";
import ProductUpdate from "../modals/ProductUpdate";
import ProductDelete from "../modals/ProductDelete";
import ProductAdd from "../modals/ProductAdd";
import { chakra, Flex, Text, Stack, SimpleGrid } from "@chakra-ui/react";

export default function Tablet({ data, token,Products }) {
  return (
    <Stack mt={24}>
      <ProductAdd token={token} Products={Products}/>
      <Flex w="full" alignItems="center" justifyContent="center">
        <Stack direction={{ base: "column" }} w="full" spacing={5}>
          {data.map((product) => {
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
                      token={token}
                      Products={Products}
                    />
                    <ProductDelete
                      name={product.name}
                      id={product.id}
                      token={token}
                      Products={Products}
                    />
                  </Flex>
                </SimpleGrid>
              </Flex>
            );
          })}
        </Stack>
      </Flex>
    </Stack>
  );
}
