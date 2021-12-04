import React, { useState } from "react";
import RippledButton from "../button/RippledButton";
import api from "../../services/api-nodejs";
import MsgBox from "../message/MsgBox";
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
} from "@chakra-ui/react";

function ProductDelete(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);

  const close = () => {
    setMessage(initialState);
    onClose();
  };

  const onDelete = async () => {
    try {
      const response = await api.deleteProduct(props.id, props.token);
      setMessage({
        title: "Felicitaciones tu producto fue eliminado.",
        text: response.message,
      });
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

      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          {message.title !== "" ? (
            <MsgBox title={message.title} text={message.text} close={close} />
          ) : (
            <ModalBody>
              <Box
                display={"d-flex"}
                justifyContent={"center"}
                alignContent={"center"}
                m={6}
              >
                Eliminar
              </Box>
              <Text>
                Estas seguro de querer Eliminar al producto {props.name}{" "}
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

export default ProductDelete;
