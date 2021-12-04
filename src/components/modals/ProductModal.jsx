import React from "react";
import RippledButton from "../button/RippledButton";
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
  chakra,
  Image,
  Box,
  Tooltip,
  Text,
  Link,
} from "@chakra-ui/react";


function ProductModal({
  title,
  description,
  img,
  price,
  brand,
  text = "VER PRODUCTO",
}) {
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
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              bg="gray.300"
              h={72}
              w="full"
              rounded="lg"
              bgSize="cover"
              bgPos="center"
              style={{
                backgroundImage: `url(${img})`,
              }}
              alt="Product"
            />
            <Box
              display="d-flex"
              alignContent="center"
              justifyContent="center"
              bg={"white"}
              shadow={"lg"}
              rounded="lg"
              mt={-16}
              h={16}
              w={36}
              p={2}
            >
              <Tooltip
                label={brand.name}
                aria-label={`${brand.name} is a product brand`}
              >
                <Image
                  h={"auto"}
                  w={"auto"}
                  px={"auto"}
                  objectFit="cover"
                  src={brand.logo_url}
                  alt="Brand logo"
                />
              </Tooltip>
            </Box>
            <Text mt={5}>{description}</Text>

            <Flex alignItems="center" justifyContent="space-between">
              <chakra.p
                fontSize={"2xl"}
                fontWeight="bold"
                color={"gray.700"}
                mt={3}
              >
                $ {price}
              </chakra.p>
            </Flex>

            <Flex alignItems="center" justifyContent="space-between"></Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Link
              href="https://regalalo.ar/stores/Lachi?search=juguetes&items=18"
              isExternal
            >
              <Button variant="ghost">Ir a la tienda</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProductModal;
