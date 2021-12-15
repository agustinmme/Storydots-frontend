import React from "react";
import ProductModal from "../modals/Product/ProductModal";
import { chakra, Box, Image, Flex, Tooltip } from "@chakra-ui/react";
import { paserCurrency } from "../../../utils/utils";

export default function ProductCard({ name, description, img, price, brand }) {
  return (
    <Flex pt={50} w="full" alignItems="center" justifyContent="center">
      <Box
        w="sm"
        mx="auto"
        bg={"white"}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Box
          bg="gray.300"
          h={64}
          w="full"
          rounded="lg"
          bgSize="cover"
          bgPos="center"
          style={{
            backgroundImage: `url(${img})`,
          }}
          alt="Product"
        ></Box>
        <Tooltip
          label={brand.name}
          aria-label={`${brand.name} is a product brand`}
        >
          <Box
            display="d-flex"
            alignContent="center"
            justifyContent="center"
            bg={"white"}
            shadow={"lg"}
            rounded="lg"
            mt={-24}
            ml={4}
            h={16}
            w={36}
            p={2}
          >
            <Image
              h={"auto"}
              w={"auto"}
              px={"auto"}
              objectFit="cover"
              src={brand.logo_url}
              alt="Brand logo"
            />
          </Box>
        </Tooltip>
        <Box py={4} px={4} mt={6}>
          <Flex alignItems="center" justifyContent="space-between">
            <chakra.h1 fontSize="xl" fontWeight="200" color={"gray.600"}>
              {name}
            </chakra.h1>
          </Flex>

          <Flex alignItems="center" justifyContent="space-between">
            <chakra.p
              fontSize={"2xl"}
              fontWeight="bold"
              color={"gray.700"}
              mt={3}
            >
              {paserCurrency(price)}
            </chakra.p>
          </Flex>

          <ProductModal
            title={name}
            description={description}
            brand={brand}
            price={price}
            img={img}
          />
        </Box>
      </Box>
    </Flex>
  );
}
