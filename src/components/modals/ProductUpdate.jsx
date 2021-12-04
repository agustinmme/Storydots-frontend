import React, { useState } from "react";
import * as Yup from "yup";
import RippledButton from "../button/RippledButton";
import api from "../../services/api-nodejs";
import MsgBox from "../message/MsgBox";
import { Formik } from "formik";
import {
  InputControl,
  SubmitButton,
  ResetButton,
  TextareaControl,
} from "formik-chakra-ui";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Box,
} from "@chakra-ui/react";

function ProductUpdate(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);

  const close = () => {
    setMessage(initialState);
    onClose();
  };

  const onSubmit = async (values) => {
    try {
      const response = await api.updateProduct({
        name: values.name,
        description: values.description,
        image_url: values.image,
        price: values.price,
        id: props.id,
        token: props.token,
      });
      setMessage({
        title: "Felicitaciones tu producto fue actulizado.",
        text: response.message,
      });
    } catch (error) {
      setMessage({
        title: error.response.statusText,
        text: error.response.data.message,
      });
    }
  };

  const initialValues = {
    name: props.name,
    description: props.description,
    image: props.image,
    price: parseInt(props.price),
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
    image: Yup.string().required(),
    price: Yup.number().required(),
  });

  return (
    <>
      <RippledButton
        scheme={"green"}
        shadow={"base"}
        step1={"500"}
        step2={"600"}
        step3={"700"}
        size={"md"}
        onClick={onOpen}
        ml={2}
      >
        ACTUALIZAR
      </RippledButton>

      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          {message.title !== "" ? (
            <MsgBox title={message.title} text={message.text} close={close} />
          ) : (
            <ModalBody>
              <ModalCloseButton />
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ handleSubmit }) => (
                  <Box maxWidth={800} as="form" onSubmit={handleSubmit} p={3}>
                    <Box
                      display={"d-flex"}
                      justifyContent={"center"}
                      alignContent={"center"}
                      m={6}
                    >
                      MODIFICAR PRODUCTO
                    </Box>
                    <InputControl
                      name="name"
                      label="Nombre"
                      Props={{ placeholder: "MAIL" }}
                    />
                    <TextareaControl
                      name="description"
                      label="Descripcion"
                      mt={3}
                    />
                    <InputControl name="image" label="Imagen" mt={3} />
                    <InputControl name="price" label="Precio" mt={3} />
                    <Flex justifyContent="space-between">
                      <SubmitButton colorScheme="primary" w={"30%"} mt={5}>
                        Aceptar
                      </SubmitButton>
                      <ResetButton
                        variant={"ghost"}
                        colorScheme="secondary"
                        w={"30%"}
                        mt={5}
                      >
                        Cancelar
                      </ResetButton>
                    </Flex>
                  </Box>
                )}
              </Formik>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProductUpdate;
