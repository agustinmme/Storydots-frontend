import React, { useState } from "react";
import logo from "../../assets/storydots-footer.svg";
import * as Yup from "yup";
import RippledButton from "../button/RippledButton";
import api from "../../services/api-nodejs";
import MsgBox from "../message/MsgBox";
import { Formik } from "formik";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
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
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FieldChakra from "../field/FieldChakra";

function RegisterModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

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
                {({ handleSubmit, isSubmitting }) => (
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

                    <FieldChakra
                      name="email"
                      label={"Email"}
                      chakraComp={Input}
                      placeholder="UsuarioPrueba@gmail.com"
                      type="email"
                    />


                    <InputGroup mt={1} size="md">
                      <FieldChakra
                        name="pass"
                        label={"Password"}
                        chakraComp={Input}
                        type={show ? "text" : "password"}
                        placeholder="StoryDots"
                      />
                      <InputRightElement>
                        <IconButton
                          size="sm"
                          onClick={handleClick}
                          aria-label="Ver contraseña"
                          icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
                        />
                      </InputRightElement>
                    </InputGroup>

                    <Button
                      isLoading={isSubmitting}
                      type={"sumbit"}
                      colorScheme="primary"
                      w={"100%"}
                      mt={5}
                    >
                      Registar
                    </Button>
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
