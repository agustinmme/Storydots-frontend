import React from "react";
import { Text, Box, Spinner, Stack } from "@chakra-ui/react";

function SpinnerCustom() {
  return (
    <Box
      display={"d-flex"}
      justifyContent={"center"}
      alignContent={"center"}
      my={52}
    >
      <Stack spacing={5}>
        <Spinner
          thickness={"10px"}
          speed={"0.65s"}
          emptyColor={"gray.200"}
          color={"secondary.500"}
          size={"xl"}
          mx={"auto"}
        />
        <Text>Estamos cargando la informacion...</Text>
      </Stack>
    </Box>
  );
}

export default SpinnerCustom;
