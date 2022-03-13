import { Box, Button } from "@chakra-ui/react";
import React from "react";

export const EditaLicencia = ({ licencia }) => {
  const updateTest = async () => {
    const autor = "TheQueen";
    try {
      const id = licencia.id + 1;
      const response = await fetch(`/api/retina/C${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          autor: "Gurupeta",
          pelicula: "Tarzán en el río",
        }),
      });

      const res = await response.json();
      if (res) {
        console.log("REESSS", res);
      }
    } catch (err) {
      console.error("Error creando la Licencia", err);
    }
  };
  return (
    <Box>
      <h5> {licencia.pelicula} </h5>
      <Button onClick={updateTest}>Update</Button>
    </Box>
  );
};
