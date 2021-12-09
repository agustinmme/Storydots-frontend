import React,{} from "react";
import {
  Text,
  Flex,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Pagination({data,page,prevPage,nextPage}) {

  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Flex>
        <HStack spacing={5}>
        <IconButton
            variant="ghost"
            colorScheme="secondary"
            aria-label="Atras"
            fontSize="20px"
            disabled={page===0}
            icon={<IoIosArrowBack />}
            boxSize={6}
            onClick={prevPage}
          />
          <Text cursor={"default"} _hover={{color:"secondary.600"}}>{page+1 }</Text>
          <Text cursor={"default"} _hover={{color:"secondary.600"}}>OF</Text>
          <Text cursor={"default"} _hover={{color:"secondary.600"}} >{data.totalPages || 1}</Text>
          <IconButton
            variant="ghost"
            colorScheme="secondary"
            aria-label="Adelante"
            fontSize="20px"
            disabled={(page+1)>=data.totalPages}
            icon={<IoIosArrowForward />}
            boxSize={6}
            onClick={nextPage}
          />
        </HStack>
      </Flex>
    </Flex>
  );
}
