import React, { useState } from "react";
import logo from "../../assets/storydots-footer.svg";
import * as Yup from "yup";
import RippledButton from "../button/RippledButton";
import api from "../../services/api-nodejs";
import MsgBox from "../message/MsgBox";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

function RegisterModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);

  const close = () => {
    setMessage(initialState);
    onClose();
  };

  const onSubmit = async (values) => {
    try {
      const response = await api.singUp({
        email: values.Email,
        pass: values.Contrasena,
      });
      setMessage({
        title: "Felicitaciones tu cuenta fue creada.",
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
    Email: "",
    Contrasena: "",
  };
  const validationSchema = Yup.object({
    Email: Yup.string().required().email(),
    Contrasena: Yup.string().required(),
  });

  return (
    <>
      <RippledButton
        scheme={"gray"}
        shadow={"base"}
        textColor="primary.600"
        step1={"50"}
        step2={"200"}
        step3={"300"}
        size={"md"}
        onClick={onOpen}
      >
        TRY IT FREE
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
                  <Box maxWidth={800} as="form" onSubmit={handleSubmit}>
                    <Box
                      display={"d-flex"}
                      justifyContent={"center"}
                      alignContent={"center"}
                      m={6}
                    >
                      <Image
                        size={"lg"}
                        h={"auto"}
                        w={"auto"}
                        px={"auto"}
                        objectFit="cover"
                        src={logo}
                        alt="Logo story"
                      />
                    </Box>
                    <InputControl name="Email" label="Email" />
                    <InputControl
                      name="Contrasena"
                      label="Tu contrasena"
                      mt={3}
                      type={"password"}
                    />

                    <SubmitButton colorScheme="primary" mt={5} w={"100%"}>
                      Registar
                    </SubmitButton>
                    <Box
                      display={"d-flex"}
                      justifyContent="center"
                      alignContent="center"
                      mt={5}
                    >
                      <Flex alignItems="center">
                        <Text>Ya estas registrado? </Text>
                        <Button colorScheme="primary" size="sm" variant="ghost">
                          Inicia tu sesion
                        </Button>
                      </Flex>
                    </Box>
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

export default RegisterModal;
