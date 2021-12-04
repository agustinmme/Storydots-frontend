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
import { useNavigate } from "react-router-dom";
import TextField from "../field/TextField";

function RegisterModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);
  const navigate = useNavigate();
  const close = () => {
    setMessage(initialState);
    onClose();
  };

  const onSubmit = async (values) => {
    try {
      const response = await api.singUp({
        email: values.email,
        pass: values.pass,
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
    email: "",
    pass: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Por favor escriba un mail")
      .email("Ingresa un mail"),
    pass: Yup.string()
      .required("Por favor escriba una contraseña")
      .min(5, "La contraseña es demasiado corta"),
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

      <Modal isOpen={isOpen} onClose={close} isCentered>
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

                    <TextField
                      name="email"
                      label={"Email"}
                      placeholder="UsuarioPrueba@gmail.com"
                      type="email"
                    />

                    <TextField
                      name="pass"
                      label={"Password"}
                      type="password"
                      placeholder="StoryDots"
                      mt={3}
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
                        <Button
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                          colorScheme="primary"
                          size="sm"
                          variant="ghost"
                        >
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
