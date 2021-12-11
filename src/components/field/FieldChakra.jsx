import {
    FormControl,
    FormErrorMessage,
    FormLabel,
  } from "@chakra-ui/form-control";
  import { Field, useField } from "formik";
  
  const FieldChakra = ({ label,chakraComp, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel mt={3}>{label}</FormLabel>
        <Field as={chakraComp} {...field} {...props} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    );
  };
  
  export default FieldChakra;