import React, { useState } from "react";
import * as Yup from "yup";
import RippledButton from "../button/RippledButton";
import api from "../../services/api-nodejs";
import MsgBox from "../message/MsgBox";
import { Formik } from "formik";
import { SubmitButton, ResetButton } from "formik-chakra-ui";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Box,Text
} from "@chakra-ui/react";
import TextField from "../field/TextField";
import TextAreaField from "../field/TextAreaField";

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
      props.Products();
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
    name: Yup.string().required("El nombre no puede ser vacio"),
    description: Yup.string().required("La descripcion no puede estar vacia"),
    image: Yup.string().required("La imagen no puede ser vacia "),
    price: Yup.number().required("El precio no puede ser vacio"),
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
                  <Box maxWidth={800} as="form" onSubmit={handleSubmit} p={3}>
                    <Box
                      display={"d-flex"}
                      justifyContent={"center"}
                      alignContent={"center"}
                      m={6}
                    >
                      <Text fontSize="2xl" fontWeight={"bold"}>
                        MODIFICAR PRODUCTO
                      </Text>
                    </Box>
                    <TextField
                      name="name"
                      label={"Nombre"}
                      placeholder="BAGUETTES"
                      type="text"
                    />
                    <TextAreaField
                      name="description"
                      label={"Descripcion"}
                      placeholder="Estesettraeunsandwichtotalmentedesarmablenotraeabrojostiene"
                    />
                    <TextField
                      name="image"
                      label={"Imagen"}
                      placeholder="https://d3ugyf2ht6aenh.cloudfront.net/stores/771/622/products/lachi-junio-y-julio-8144_1-d38011a323fa47c30516237120310019-1024-1024.jpg"
                      type="text"
                    />
                    <TextField
                      name="price"
                      label={"Precio"}
                      placeholder="775.30"
                      type="number"
                    />

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
