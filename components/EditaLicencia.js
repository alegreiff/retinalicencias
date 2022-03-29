import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib";
import { ACTION_TYPES, StoreContext } from "../store";
import { FormularioLicencias } from "./forms/FormularioLicencias";

export const EditaLicencia = ({ licencia }) => {
  const stringToDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date([month, day, year].join("/"));
  };
  console.log("LICCCE", licencia);
  const {
    nombrepelicula,
    pais,
    tipocontenido,
    formaAdquisicion,
    entidadgratis,
    geobloqueo: geobl,
    mododuracion,
    comentarios,
    entidad,
    entidadpais,
    startDate: _startDate,
    endDate: _endDate,
  } = licencia;

  const valoresInicialesFormulario = {
    nombrepelicula,
    pais,
    tipocontenido,
    formaAdquisicion,
    entidadgratis,
    geobloqueo: geobl,
    mododuracion,
    comentarios,
    entidad,
    entidadpais,
    startDate: _startDate ? stringToDate(_startDate) : new Date(),
    endDate: _endDate ? stringToDate(_endDate) : new Date(),
  };
  console.log("fechaInicial", _startDate);
  console.log("INITIAL FORM DATA", valoresInicialesFormulario);

  const { data: session } = useSession();
  const [autor, setAutor] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      setAutor(session?.user?.email);
    }
  }, [session?.user?.email]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const exitoCarga = (mensaje, nota, status) => {
    toast({
      title: `Creación de licencia: ${nota}`,
      description: mensaje,
      status,
      duration: 6000,
      isClosable: true,
    });
    router.push("/licencias");
  };

  const guardaLicencia = async (values) => {
    console.log(values, startDate, endDate);
    return;
    try {
      const {
        nombrepelicula,
        formaAdquisicion,
        pais,
        tipocontenido,
        geobloqueo,
        mododuracion,
        comentarios,
      } = values;
      const entidad = "";
      if (values.entidadpais === "") {
        entidad = values.entidadgratis;
      } else {
        entidad = values.entidadpais;
      }
      const response = await fetch("/api/retina/guarda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          autor,
          nombrepelicula,
          pais,
          tipocontenido,
          formaAdquisicion,
          entidad,
          geobloqueo,
          mododuracion,
          comentarios,
        }),
      });

      const res = await response.json();
      if (res) {
        exitoCarga(nombrepelicula, res.resultado, "success");
      }
    } catch (err) {
      //console.error("Error creando la Licencia", err);
    }
  };

  const { dispatch } = useContext(StoreContext);
  const {
    state: { datosLicencias },
  } = useContext(StoreContext);
  const [muestraInfo, setMuestraInfo] = useState(false);
  const [paises, setPaises] = useState([]);
  const [tipoCont, setTipoCont] = useState(datosLicencias[1]);
  const [formAdq, setFormAdq] = useState(datosLicencias[2]);
  const [retinaPaises, setRetinaPaises] = useState(datosLicencias[3]);
  const [geobloqueo, setGeobloqueo] = useState(datosLicencias[11]);
  const [modoDuracion, setModoDuracion] = useState(datosLicencias[12]);
  const [entidadesPais, setEntidadesPais] = useState(false);
  const [entidadesGratis, setEntidadesGratis] = useState(false);
  const [listaEntidadesPais, setListaEntidadesPais] = useState([]);
  const [listaEntidadesGratuitas, setListaEntidadesGratuitas] = useState([]);
  const [edicionEntidadPais, setEdicionEntidadPais] = useState(false);

  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    valoresInicialesFormulario.startDate
  );
  const [endDate, setEndDate] = useState(valoresInicialesFormulario.endDate);
  const [difDias, setDifDias] = useState("");

  console.log("INIT", startDate);

  const [stateDatosLicencias, setStateDatosLicencias] =
    useState(datosLicencias);

  const { data: dataStateDatosLicencias, error: errorStateDatosLicencias } =
    useSWR(
      stateDatosLicencias.length === 0 ? "/api/retina/datos/A2:Z" : null,
      fetcher
    );

  useEffect(() => {
    const diferenciaFechas = (startDate, endDate) => {
      const difference = Math.abs(startDate - endDate);
      const days = difference / (1000 * 3600 * 24);
      setDifDias(Math.floor(days));
    };
    diferenciaFechas(startDate, endDate);
  }, [startDate, endDate]);
  useEffect(() => {
    if (dataStateDatosLicencias) {
      dispatch({
        type: ACTION_TYPES.SET_DATOS_BASICOS,
        payload: {
          datosLicencias: dataStateDatosLicencias.data,
        },
      });
      setTipoCont(dataStateDatosLicencias.data[1]);
      setFormAdq(dataStateDatosLicencias.data[2]);
      setRetinaPaises(dataStateDatosLicencias.data[3]);
      setGeobloqueo(dataStateDatosLicencias.data[11]);
      setModoDuracion(dataStateDatosLicencias.data[12]);
      setStateDatosLicencias(dataStateDatosLicencias.data);
    }
  }, [dispatch, dataStateDatosLicencias]);

  const onChangeFormaAdquisicion = (value) => {
    setListaEntidadesPais([]);
    if (value === "Compra") {
      setEntidadesPais(true);
      setEntidadesGratis(false);
      setListaEntidadesGratuitas([]);
      setPaises(datosLicencias[3]);
    } else {
      setEntidadesPais(false);
      setEntidadesGratis(true);
      setListaEntidadesGratuitas(datosLicencias[10]);
      setPaises(datosLicencias[0]);
    }
  };
  const onChangePais = (value) => {
    if (retinaPaises.includes(value)) {
      switch (value) {
        case "Bolivia": {
          setListaEntidadesPais(datosLicencias[4]);
          break;
        }
        case "Colombia": {
          setListaEntidadesPais(datosLicencias[5]);
          break;
        }
        case "Ecuador": {
          setListaEntidadesPais(datosLicencias[6]);
          break;
        }
        case "México": {
          setListaEntidadesPais(datosLicencias[7]);
          break;
        }
        case "Perú": {
          setListaEntidadesPais(datosLicencias[8]);
          break;
        }
        case "Uruguay": {
          setListaEntidadesPais(datosLicencias[9]);
          break;
        }
        default: {
          setListaEntidadesPais([]);
        }
      }
    } else {
      setListaEntidadesPais([]);
    }
  };

  const cierraModal = (valor) => {
    if (valor) {
      setListaEntidadesGratuitas(valor);
    } else {
      console.log("Cancelarich");
    }
    onClose();
  };
  useEffect(() => {
    if (formaAdquisicion) {
      if (formaAdquisicion === "Compra") {
        setEdicionEntidadPais(true);
        setEntidadesPais(true);
        setEntidadesGratis(false);
        setListaEntidadesGratuitas([]);
        setPaises(datosLicencias[3]);
      } else {
        setEdicionEntidadPais(false);
        setEntidadesPais(false);
        setEntidadesGratis(true);
        setListaEntidadesGratuitas(datosLicencias[10]);
        setPaises(datosLicencias[0]);
      }
    }
  }, [datosLicencias, formaAdquisicion]);

  useEffect(() => {
    if (pais) {
      if (retinaPaises.includes(pais)) {
        switch (pais) {
          case "Bolivia": {
            setListaEntidadesPais(datosLicencias[4]);
            break;
          }
          case "Colombia": {
            setListaEntidadesPais(datosLicencias[5]);
            break;
          }
          case "Ecuador": {
            setListaEntidadesPais(datosLicencias[6]);
            break;
          }
          case "México": {
            setListaEntidadesPais(datosLicencias[7]);
            break;
          }
          case "Perú": {
            setListaEntidadesPais(datosLicencias[8]);
            break;
          }
          case "Uruguay": {
            setListaEntidadesPais(datosLicencias[9]);
            break;
          }
          default: {
            setListaEntidadesPais([]);
          }
        }
      } else {
        setListaEntidadesPais([]);
      }
    }
  }, []);

  return (
    <Box>
      <FormularioLicencias
        valoresInicialesFormulario={valoresInicialesFormulario}
        tipoCont={tipoCont}
        formAdq={formAdq}
        paises={paises}
        listaEntidadesPais={listaEntidadesPais}
        entidadesGratis={entidadesGratis}
        entidadesPais={entidadesPais}
        geobloqueo={geobloqueo}
        modoDuracion={modoDuracion}
        startDate={startDate}
        endDate={endDate}
        difDias={difDias}
        muestraInfo={muestraInfo}
        onChangeFormaAdquisicion={onChangeFormaAdquisicion}
        listaEntidadesGratuitas={listaEntidadesGratuitas}
        onOpen={onOpen}
        onClose={onClose}
        onChangePais={onChangePais}
        guardaLicencia={guardaLicencia}
        //edicionEntidadPais
        //entidadpaisselected={0}
        esEdicion={true}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
      />
    </Box>
  );
};
