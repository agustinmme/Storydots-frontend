import React from "react";
import { Stat, StatNumber } from "@chakra-ui/react";

function PanelButtons({ title, onClick }) {
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={"gray.800"}
      rounded={"lg"}
      justity={"center"}
      align={"center"}
      _hover={{ color: "primary.400", bg: "secondary.50" }}
      cursor={"pointer"}
      onClick={onClick}
    >
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {title}
      </StatNumber>
    </Stat>
  );
}

export default PanelButtons;
