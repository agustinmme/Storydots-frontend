import React, { useState } from "react";
import RippledButton from "../button/RippledButton";
import api from "../../services/api-nodejs";
import MsgBox from "../message/MsgBox";
import SpinnerCustom from "../spinner/Spinner";
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
  Select,
  Textarea,
  Input,
} from "@chakra-ui/react";
import FieldChakra from "../field/FieldChakra";
import { getTokenLocal } from "../../../utils/auth";

function ProductAdd(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = { title: "", text: "" };
  const [message, setMessage] = useState(initialState);
  const [data, setData] = useState({});
  const [pending, setPending] = useState(true);


  const open = async () => {
    onOpen();
    try {
      const response = await api.getAllBrands();
      setData(response);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };



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
        token: getTokenLocal(),
      });
      setMessage({
        title: "Felicitaciones tu producto fue agregado con exito.",
        text: response.message,
      });
      props.reload();
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
    name: Yup.string().required("El nombre no puede ser vacio"),
    description: Yup.string().required("La descripcion no puede estar vacia"),
    image: Yup.string().required("La imagen no puede ser vacia "),
    price: Yup.number().required("El precio no puede ser vacio"),
    brand: Yup.number().required("Falta seleccionar una marca"),
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
        onClick={open}
        ml={2}
      >
        PUBLICAR PRODUCTO
      </RippledButton>

      <Modal isOpen={isOpen} onClose={close} isCentered>
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
                {({ handleSubmit, isSubmitting, resetForm }) => (
                  <Box maxWidth={800} as="form" onSubmit={handleSubmit} p={3}>
                    <Box
                      display={"d-flex"}
                      justifyContent={"center"}
                      alignContent={"center"}
                      m={6}
                    >
                      <Text fontSize="2xl" fontWeight={"bold"}>
                        PUBLICAR PRODUCTO
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
                      name="description"
                      label={"Descripcion"}
                      chakraComp={Textarea}
                      placeholder="Estesettraeunsandwichtotalmentedesarmablenotraeabrojostiene"
                    />
                    <FieldChakra
                      name="image"
                      label={"Imagen"}
                      chakraComp={Input}
                      placeholder="https://d3ugyf2ht6aenh.cloudfront.net/stores/771/622/products/lachi-junio-y-julio-8144_1-d38011a323fa47c30516237120310019-1024-1024.jpg"
                      type="text"
                    />
                    <FieldChakra
                      name="price"
                      label={"Precio"}
                      chakraComp={Input}
                      placeholder="775.30"
                      type="number"
                    />
                    <FieldChakra
                      placeholder="Seleccionar"
                      label={"Marca"}
                      chakraComp={Select}
                      name="brand"
                      mt={3}
                    >
                      {data.content.map((brand) => {
                        return (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        );
                      })}
                    </FieldChakra>
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

export default ProductAdd;
