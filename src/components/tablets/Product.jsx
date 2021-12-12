import React from 'react'
import ProductModal from "../modals/Product/ProductModal";
import ProductUpdate from "../modals/Product/ProductUpdate";
import ProductDelete from "../modals/Product/ProductDelete";
import { chakra, Flex, Text, Stack, SimpleGrid } from "@chakra-ui/react";


function Product({id,name,description,image,price,brand,reload}) {
    return (
        <Flex
        direction={{ base: "row", md: "column" }}
        bg={"white"}
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
          <Text pr={1}>{name}</Text>
          <chakra.span
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {brand.name}
          </chakra.span>
          <Flex justify={{ md: "end" }}>
            <ProductModal
              name={name}
              description={description}
              img={image}
              price={price}
              brand={brand}
              text={"VER"}
            />
            <ProductUpdate
              name={name}
              description={description}
              image={image}
              price={price}
              id={id}
              brand={brand.id}
              reload={reload}
            />
            <ProductDelete
              name={name}
              id={id}
              reload={reload}
            />
          </Flex>
        </SimpleGrid>
      </Flex>
    )
}

export default Product
