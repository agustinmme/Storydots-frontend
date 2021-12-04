import React from "react";
import { Text } from "@chakra-ui/react";
const ListLink = ({ children, ...rest }) => {
  return (
    <Text
      fontWeight={"200"}
      fontSize={"sm"}
      mb={2}
      cursor={"pointer"}
      transition={"color 0.5s ease"}
      _hover={{
        color: "black",
      }}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ListLink;
