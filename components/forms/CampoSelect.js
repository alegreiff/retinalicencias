import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React from "react";

const CampoSelect = ({ label, datos, ...props }) => {
  const [field, meta] = useField(props);
  if (!datos) {
    return <h3>NO form</h3>;
  }
  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Field as={Select} {...field} {...props}>
        {datos.map((p, i) => (
          <option as={Button} key={i} value={p}>
            {p}
          </option>
        ))}
      </Field>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default CampoSelect;
/* 
selected={datos.length === 1 ? true : false}
*/
