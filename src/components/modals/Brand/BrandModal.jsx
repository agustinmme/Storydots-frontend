import React from "react";
import RippledButton from "../../button/RippledButton";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Box,
  Text,
  Link,
  Image,
} from "@chakra-ui/react";

function BrandModal({ title, name, image, text = "VER MARCAR" }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <RippledButton
        mt={text.length > 4 ? 6 : 0}
        width={text.length > 4 ? "100%" : "20%"}
        scheme={"primary"}
        shadow={"base"}
        step1={"500"}
        step2={"600"}
        step3={"700"}
        size={"md"}
        onClick={onOpen}
      >
        {text}
      </RippledButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex
              flexDirection={"column"}
              alignItems="center"
              justifyContent="center"
            >
              {title}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bg="gray.300" p={5} w="full" rounded="lg" alignItems="center">
              <Image
                maxH={72}
                h={"auto"}
                w={"auto"}
                objectFit="cover"
                src={image}
                alt="Logo marca"
              />
            </Box>
          </ModalBody>
          <Flex
            flexDirection={"column"}
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight={"600"}>{name}</Text>
          </Flex>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Link
              href="https://regalalo.ar/stores/Lachi?search=juguetes&items=18"
              isExternal
            >
              <Button variant="ghost">Ir a su web</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BrandModal;
