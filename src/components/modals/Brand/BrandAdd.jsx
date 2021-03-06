import React, { useState } from "react";
import RippledButton from "../../button/RippledButton";
import api from "../../../services/api-nodejs";
import MsgBox from "../../message/MsgBox";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Box,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import FieldChakra from "../../field/FieldChakra";
import { deleteTokenLocal, getTokenLocal } from "../../../../utils/auth";
import { useNavigate } from "react-router-dom";

function BrandAdd(props) {
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
      const response = await api.addBrand({
        name: values.name,
        logo_url: values.logo,
        token: getTokenLocal(),
      });
      setMessage({
        title: "Felicitaciones tu marca fue creada con exito.",
        text: response.message,
      });
      props.reload();
    } catch (error) {
        console.log(error)
      setMessage({
        title: error.response.statusText,
        text: error.response.data.message,
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          onClose();
          deleteTokenLocal();
          navigate("/");
        }, 2000);
      }
    }
  };

  const initialValues = {
    name: "",
    logo: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre no puede ser vacio"),
    logo: Yup.string().required("La imagen del logo no puede ser vacia "),
  });

  return (
    <>
      <RippledButton
        scheme={"blue"}
        shadow={"base"}
        step1={"500"}
        step2={"600"}
        step3={"700"}
        size={"lg"}
        onClick={onOpen}
        ml={2}
      >
        AGREGAR MARCA
      </RippledButton>

      <Modal isOpen={isOpen} onClose={close} isCentered>
        <ModalOverlay />
        <ModalContent>
          { message.title !== "" ? (
            <MsgBox title={message.title} text={message.text} close={close} />
          ) : (
            <ModalBody>
              <ModalCloseButton />
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ handleSubmit, isSubmitting, resetForm }) => (
                  <Box maxWidth={800} as="form" onSubmit={handleSubmit} p={3}>
                    <Box
                      display={"d-flex"}
                      justifyContent={"center"}
                      alignContent={"center"}
                      m={6}
                    >
                      <Text fontSize="2xl" fontWeight={"bold"}>
                        AGREGAR MARCA
                      </Text>
                    </Box>
                    <FieldChakra
                      name="name"
                      label={"Nombre"}
                      chakraComp={Input}
                      placeholder="BAGUETTES"
                      type="text"
                    />
                    <FieldChakra
                      name="logo"
                      label={"Logo imagen"}
                      chakraComp={Input}
                      placeholder="https://d3ugyf2ht6aenh.cloudfront.net/stores/771/622/products/lachi-junio-y-julio-8144_1-d38011a323fa47c30516237120310019-1024-1024.jpg"
                      type="text"
                    />

                    <Flex justifyContent="space-between">
                      <Button
                        isLoading={isSubmitting}
                        type={"sumbit"}
                        colorScheme="primary"
                        w={"30%"}
                        mt={5}
                      >
                        Aceptar
                      </Button>

                      <Button
                        variant={"ghost"}
                        colorScheme="secondary"
                        w={"30%"}
                        mt={5}
                        onClick={resetForm}
                      >
                        Cancelar
                      </Button>
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

export default BrandAdd;
