import {
    FormControl,
    FormErrorMessage,
    FormLabel,Textarea
  } from "@chakra-ui/react";
  import { Field, useField } from "formik";
  
  const TextAreaField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel mt={3}>{label}</FormLabel>
        <Field as={Textarea} {...field} {...props} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    );
  };
  
  export default TextAreaField;