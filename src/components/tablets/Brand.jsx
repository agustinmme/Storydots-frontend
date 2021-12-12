import React from "react";
import { Flex, Text, SimpleGrid } from "@chakra-ui/react";
import BrandModal from "../modals/Brand/BrandModal";
import BrandDelete from "../modals/Brand/BrandDelete";
import BrandUpdate from "../modals/Brand/BrandUpdate";

function Brand({ id, name, image, reload }) {
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
        <Flex justify={{ md: "end" }}>
          <BrandModal
            title={"Vista Previa"}
            name={name}
            image={image}
            text={"VER"}
          />
          <BrandUpdate id={id} name={name} image={image} reload={reload}/>
          <BrandDelete id={id} name={name}  reload={reload} />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}

export default Brand;
