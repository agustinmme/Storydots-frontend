import React, { useState } from "react";
import { Box, Container, Image, Text, Flex } from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import logo from "../../assets/storydots-footer.svg";
import * as Yup from "yup";
import api from "../../services/api-nodejs";
import MsgBox from '../../components/message/MsgBox'
const Login = ({passToken}) => {
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);
  const onSubmit = async (values) => {
    try {
      const response = await api.singIn({
        email: values.Email,
        pass: values.Contrasena,
      });
      passToken(response.token)
    } catch (error) {
      console.log(error)
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
    Email: "",
    Contrasena: "",
  };
  const validationSchema = Yup.object({
    Email: Yup.string().required().email(),
    Contrasena: Yup.string().required(),
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
            {({ handleSubmit }) => (
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
                  <MsgBox
                    title={message.title}
                    text={message.text}
                  />
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
                <InputControl name="Email" label="Email" />
                <InputControl name="Contrasena" label="Tu contrasena" mt={3} />

                <SubmitButton
                  colorScheme="primary"
                  mt={{ base: 5, md: 10 }}
                  w={"100%"}
                >
                  Iniciar sesión
                </SubmitButton>
              </Box>
            )}
          </Formik>
        </Flex>
      </Container>
    </Box>
  );
};

export default Login;
