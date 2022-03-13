import {
  Box,
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const EntidadGratuitaNueva = ({
  onClose,
  listaEntidadesGratuitas,
  rango,
}) => {
  const [nuevoElemento, setNuevoElemento] = useState("");
  const guardaEntidad = async () => {
    try {
      const response = await fetch("/api/retina/nuevoElemento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rango,
          nuevoElemento,
        }),
      });

      const res = await response.json();
      console.log(res);
      onClose(res.data);
    } catch (err) {
      console.error("Error creando el nuevo elemento", err);
    }
  };
  return (
    <>
      <ModalContent>
        <ModalHeader>Nombre del nuevo licenciante gratuito</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <h5> {nuevoElemento} ... </h5>
          <Input
            type="text"
            placeholder="Nombre del festival / universidad etc."
            onChange={(e) => {
              setNuevoElemento(e.target.value);
            }}
          ></Input>
          <Box bg="tomato" w="100%" p={4} color="white">
            This is the Box
          </Box>
          {listaEntidadesGratuitas.map((ent, i) => (
            <p key={i}>{ent}</p>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={guardaEntidad}
            mr={3}
            color="crimson"
            disabled={nuevoElemento === "" ? true : false}
            variant="solid"
          >
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};
