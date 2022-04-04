import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React from "react";

const CampoTexto = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel> {label} </FormLabel>
        <Field as={Input} {...field} {...props} />
        <FormErrorMessage> {meta.error} </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default CampoTexto;

/* 

<FormControl id="numeroduracion">
                      <FormLabel htmlFor="numeroduracion">
                        {formik.values.nombreduracion}
                      </FormLabel>
                      <NumberInput
                        min={1}
                        max={formik.values.nombreduracion === "Años" ? 5 : 30}
                        id="numeroduracion "
                        {...field}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      {!formik.isValid && formik.errors.numeroduracion ? (
                        <FormErrorMessage>
                          {formik.errors.numeroduracion}
                        </FormErrorMessage>
                      ) : (
                        ""
                      )}
                    </FormControl>
*/
