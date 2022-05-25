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

const CampoSelect = ({ label, datos, datosFilmes, ...props }) => {
  const [field, meta] = useField(props);
  if (!datos && !datosFilmes) {
    return <h3>NO form</h3>;
  }

  console.log("si zee", datos?.length);

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Field as={Select} {...field} {...props}>
        {!datosFilmes &&
          datos.map((p, i) => (
            <option as={Button} key={i} value={p}>
              {p}
            </option>
          ))}
        {datosFilmes &&
          datosFilmes.map((film) => (
            <option as={Button} key={film.id} value={film.titulo}>
              {film.titulo}
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
