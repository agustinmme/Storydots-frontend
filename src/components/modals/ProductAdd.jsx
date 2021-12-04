import React, { useState, useEffect } from "react";
import RippledButton from "../button/RippledButton";
import api from "../../services/api-nodejs";
import MsgBox from "../message/MsgBox";
import SpinnerCustom from "../spinner/Spinner";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  InputControl,
  SubmitButton,
  ResetButton,
  TextareaControl,
  SelectControl,
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

function ProductAdd(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);
  const [data, setData] = useState({});
  const [pending, setPending] = useState(true);

  useEffect(async () => {
    try {
      const response = await api.getAllBrands();
      setData(response);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const close = () => {
    setMessage(initialState);
    onClose();
  };

  const onSubmit = async (values) => {
    try {
      const response = await api.addProduct({
        name: values.name,
        description: values.description,
        image_url: values.image,
        price: values.price,
        brandId: values.brand,
        token: props.token,
      });
      setMessage({
        title: "Felicitaciones tu producto fue agregado con exito.",
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
    name: "",
    description: "",
    image: "",
    price: 0,
    brand: 0,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
    image: Yup.string().required(),
    price: Yup.number().required(),
    brand: Yup.number().required(),
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
        PUBLICAR PRODUCTO NUEVO
      </RippledButton>

      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          {pending ? (
            <SpinnerCustom />
          ) : message.title !== "" ? (
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
                      PUBLICAR PRODUCTO NUEVO
                    </Box>
                    <InputControl name="name" label="Nombre" />
                    <TextareaControl
                      name="description"
                      label="Descripcion"
                      mt={3}
                    />
                    <InputControl name="image" label="Imagen" mt={3} />
                    <InputControl name="price" label="Precio" mt={3} />
                    <SelectControl
                      name="brand"
                      selectProps={{ placeholder: "Select option" }}
                    >
                      {data.content.map((brand) => {
                        return (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        );
                      })}
                    </SelectControl>
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

export default ProductAdd;
