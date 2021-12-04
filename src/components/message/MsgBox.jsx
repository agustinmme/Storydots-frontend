import { Box, Heading, Text, Button } from "@chakra-ui/react";
export default function MsgBox({ title, text, close }) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {title}
      </Heading>
      <Text color={"gray.500"}>
        {text !== ""
          ? text
          : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto rerum natus asperiores necessitatibus velit saepe incidunt at reiciendis, iste tempore ullam distinctio placeat officia minus, voluptates errorobcaecati omnis dignissimos?"}
      </Text>
      {close ? (
        <Button mt={5} colorScheme={"secondary"} onClick={close}>
          Cerrar
        </Button>
      ) : null}
    </Box>
  );
}
