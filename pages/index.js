import { useSession, signIn, signOut } from "next-auth/react";

import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import {
  authGoogle,
  hojaRetina,
  googleSheets,
  hojaLicenciasRetina,
} from "../sheets";

import { ACTION_TYPES, StoreContext } from "../store";

import { Wrapper } from "../components/Wrapper";
import { FaMailBulk } from "react-icons/fa";
import { Box, Button, Center } from "@chakra-ui/react";

import orderBy from "lodash/orderBy";
import Moment from "moment";
import "moment/locale/es";
//import { relacionEntradas } from "../lib/hooks/usePeliculas";
import { usePeliculas } from "../lib/hooks/usePeliculas";
export default function Home({ licencias, datosBasicos, pelis, entradas }) {
  const { dispatch } = useContext(StoreContext);
  const { data: session, status } = useSession();
  const [version, setVersion] = useState("0.84 🧩🧩🧩");

  const dataPeliculas = usePeliculas();

  if (dataPeliculas) {
    console.log("Datos de películas cargados correctamente");
  }
  /**
   *
   * TODO: pendiente
   * !por revisar
   * ?puede esperar
   * *pero es importante
   */
  useEffect(() => {
    if (dataPeliculas) {
      //const filmesTemp = relacionEntradas(pelis, entradas);
      //setFilmes(filmesTemp);
      dispatch({
        type: ACTION_TYPES.GUARDA_PELIS,
        payload: {
          peliculas: dataPeliculas,
        },
      });
    }
  }, [pelis, entradas, dispatch]);

  //console.log(session);
  //console.log(status);

  useEffect(() => {
    if (datosBasicos) {
      dispatch({
        type: ACTION_TYPES.SET_DATOS_BASICOS,
        payload: {
          datosLicencias: datosBasicos,
        },
      });
    }
    if (licencias) {
      dispatch({
        type: ACTION_TYPES.SET_LICENCIAS,
        payload: {
          licencias,
        },
      });
    }
  }, [licencias, datosBasicos, dispatch]);

  if (session) {
    console.log(session?.user?.email, session, status);
    return (
      <>
        <Head>
          <title>Licencias Retina Latina</title>
          <meta
            name="description"
            content="Aplicación para uso exclusivo de Retina Latina"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Wrapper>
          {pelis && <div> {pelis.length} </div>}
          <Box bg="crimson" w="100%" p={4} color="white">
            Versión {version}
          </Box>
          <Center color="white" height="50vh">
            <Button
              rightIcon={<FaMailBulk />}
              colorScheme="teal"
              variant="outline"
              onClick={() => signOut()}
            >
              Cerrar sesión
            </Button>
          </Center>
        </Wrapper>
      </>
    );
  }
  return (
    <Wrapper>
      <Box bg="crimson" w="100%" p={4} color="white">
        Versión {version}
      </Box>
      <Center color="white" height="50vh">
        <Button
          rightIcon={<FaMailBulk />}
          colorScheme="teal"
          variant="outline"
          onClick={() => signIn()}
        >
          Ingreso a la plataforma de Licencias
        </Button>
      </Center>
    </Wrapper>
  );
}

export async function getServerSideProps() {
  /* const url_peliculas =
    "https://script.google.com/macros/s/AKfycbztzXBkzgYd4kgV3BAa1fi1-UQY8rgw4935BkyUt0-bEJJeTgrDHX1dIxqyzSDG03g/exec";
  const datosPeliculas = await fetch(url_peliculas);
  const pelis = await datosPeliculas.json();

  const url_entradas =
    "https://script.google.com/macros/s/AKfycbxr1oxHPratNzgevO__yHbwXd4iQDrxVjOkW8eyI0qaC_xVAhBy_zYsiU933DXjFmuu/exec";

  const datosEntradas = await fetch(url_entradas);
  const entradas = await datosEntradas.json(); */

  console.log("SERVER SAID POORGS");
  const auth = authGoogle;
  const spreadsheetId = hojaRetina;
  const cargaDatosBasicos = await googleSheets.spreadsheets.values.get({
    auth,
    majorDimension: "COLUMNS",
    spreadsheetId: hojaLicenciasRetina,
    range: "settings!A2:Z",
  });

  const cargaLicencias = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: hojaLicenciasRetina,
    range: "matriz!A2:O",
  });

  const datosBasicos = cargaDatosBasicos.data.values;

  const licencias = cargaLicencias.data.values
    ? cargaLicencias.data.values
    : [];

  let resultado = [];
  const y = Moment("13-03-2022 0:00", "DD-MM-YYYY HH:mm").format(
    "MMMM D, YYYY HH:MM"
  );

  licencias.forEach((licencia) => {
    const fecha = Moment(licencia[1], "DD-MM-YYYY HH:mm").format(
      "MMMM D, YYYY"
    );
    let entidadpais = "";
    let entidadgratis = "";
    if (licencia[6] === "Compra") {
      entidadpais = licencia[7];
    } else {
      entidadgratis = licencia[7];
    }

    resultado.push({
      id: Number(licencia[0]),
      fechacreacion: fecha,
      autor: licencia[2],
      nombrepelicula: licencia[3],
      pais: licencia[4],
      tipocontenido: licencia[5],
      formaAdquisicion: licencia[6],
      entidad: licencia[7],
      geobloqueo: licencia[8],
      mododuracion: licencia[9] ? licencia[9] : "",
      comentarios: licencia[14] ? licencia[14] : "",
      startDate: licencia[10] ? licencia[10] : "",
      endDate: licencia[11] ? licencia[11] : "",
      nombreduracion: licencia[12] ? licencia[12] : "",
      numeroduracion: licencia[13] ? licencia[13] : "",
      entidadpais: entidadpais,
      entidadgratis: entidadgratis,
    });
  });
  resultado = orderBy(resultado, ["fechacreacion"], ["desc"]);

  // Pass data to the page via props
  return {
    props: {
      licencias: resultado,
      datosBasicos,
      //pelis: pelis,
      //entradas: entradas,
    },
  };
}
