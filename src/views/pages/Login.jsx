import React, { useState } from "react";
import {
  Box,
  Container,
  Image,
  Text,
  Flex,
  Button,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import logo from "../../assets/storydots-footer.svg";
import * as Yup from "yup";
import api from "../../services/api-nodejs";
import MsgBox from "../../components/message/MsgBox";
import FieldChakra from "../../components/field/FieldChakra";
import { setTokenLocal } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = ({setUser}) => {
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const onSubmit = async (values) => {
    try {
      const response = await api.singIn({
        email: values.email,
        pass: values.pass,
      });
      setTokenLocal(response.token)
      setUser(true);
    } catch (error) {
      console.log(error);
      setMessage({
        title: error.response.statusText,
        text: error.response.data.message,
      });
      setTimeout(() => {
        setMessage(initialState);
      }, 2500);
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
    <Box bgGradient={"linear(to-r, primary.200, secondary.600)"}>
      <Container py={4} maxW={"xl"}>
        <Flex minH={"100vh"} alignItems={"center"} justify={"center"}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Box
                borderWidth="1px"
                rounded="lg"
                bg={"white"}
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                w={"100%"}
                maxWidth={800}
                p={{ base: 5, md: 7 }}
                as="form"
                onSubmit={handleSubmit}
              >
                {message.title !== "" ? (
                  <MsgBox title={message.title} text={message.text} />
                ) : (
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
                      p={1}
                    />
                    <Text fontSize={24} fontWeight="600" my="auto">
                      ADMIN
                    </Text>
                  </Box>
                )}

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
                  colorScheme="primary"
                  w={"100%"}
                  mt={5}
                  type="sumbit"
                >
                  Iniciar sesión
                </Button>
                <Button
                  colorScheme="primary"
                  variant={"ghost"}
                  w={"100%"}
                  mt={5}
                  onClick={()=>{navigate("/")}}
                >
                  Volver a Inicio
                </Button>
              </Box>
            )}
          </Formik>
        </Flex>
      </Container>
    </Box>
  );
};

export default Login;
