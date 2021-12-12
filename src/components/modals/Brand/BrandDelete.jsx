import React, { useState } from "react";
import RippledButton from "../../button/RippledButton";
import api from "../../../services/api-nodejs";
import MsgBox from "../../message/MsgBox";
import { getTokenLocal } from "../../../../utils/auth";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Flex,
  Button,
  Text,
  Box,
  chakra
} from "@chakra-ui/react";


function BrandDelete(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);

  const close = () => {
    setMessage(initialState);
    onClose();
  };

  const onDelete = async () => {
    try {
      const response = await api.deleteBrand(props.id, getTokenLocal());
      setMessage({
        title: "Felicitaciones la marca fue eliminada.",
        text: response.message,
      });
      props.reload();
    } catch (error) {
      setMessage({
        title: error.response.statusText,
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <RippledButton
        scheme={"red"}
        shadow={"base"}
        step1={"500"}
        step2={"600"}
        step3={"700"}
        size={"md"}
        onClick={onOpen}
        ml={2}
      >
        ELIMINAR
      </RippledButton>

      <Modal isOpen={isOpen} onClose={close} isCentered>
        <ModalOverlay />
        <ModalContent>
          {message.title !== "" ? (
            <MsgBox title={message.title} text={message.text} close={close} />
          ) : (
            <ModalBody p={6}>
              <Box
                display={"d-flex"}
                justifyContent={"center"}
                alignContent={"center"}
                m={6}
              >
                <Text fontSize="2xl" fontWeight={"bold"}>
                  Eliminar
                </Text>
              </Box>
              <Text>
                Estas seguro de querer{" "}
                <chakra.span textColor={"red"} fontWeight={"bold"}>
                  Eliminar
                </chakra.span>{" "}
                a la marca{" "}
                <chakra.span fontWeight={"bold"}>{props.name}</chakra.span>{" "}
              </Text>
              <Flex justifyContent="space-between" mt={10}>
                <Button
                  colorScheme="primary"
                  w={"30%"}
                  mt={5}
                  onClick={onDelete}
                >
                  Aceptar
                </Button>
                <Button
                  variant={"ghost"}
                  colorScheme="secondary"
                  w={"30%"}
                  mt={5}
                  onClick={close}
                >
                  Cancelar
                </Button>
              </Flex>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default BrandDelete;