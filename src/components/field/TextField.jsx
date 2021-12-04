import {
    FormControl,
    FormErrorMessage,
    FormLabel,
  } from "@chakra-ui/form-control";
  import { Input } from "@chakra-ui/input";
  import { Field, useField } from "formik";
  
  const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel mt={3}>{label}</FormLabel>
        <Field as={Input} {...field} {...props} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    );
  };
  
  export default TextField;