import React from "react";
import { Text } from "@chakra-ui/react";
const ListHeader = ({ children, ...rest }) => {
  return (
    <Text
      fontWeight={"600"}
      fontSize={"md"}
      mb={2}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ListHeader;
