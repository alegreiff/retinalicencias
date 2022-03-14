import { getSession, useSession } from "next-auth/react";
import { ACTION_TYPES, StoreContext } from "../store";
import { useContext } from "react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib";
import { Wrapper } from "../components/Wrapper";
import {
  Badge,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  SimpleGrid,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { Field, Formik } from "formik";
import { useToast } from "@chakra-ui/react";
import CampoTexto from "../components/forms/CampoTexto";
import CampoSelect from "../components/forms/CampoSelect";
import { validaCreaPelicula } from "../lib/validaForms";
import { useRouter } from "next/router";
import { EntidadGratuitaNueva } from "../components/licencias/EntidadGratuitaNueva";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

registerLocale("es", es);

const PageSettings = (props) => {
  const { data: session, status } = useSession();
  const [autor, setAutor] = useState("");
  console.log(session?.user?.email);
  useEffect(() => {
    if (session?.user?.email) {
      setAutor(session.user.email);
    }
  }, [session.user.email]);
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
      console.log(entidad);

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
          //esnueva,
        }),
      });

      const res = await response.json();
      if (res) {
        exitoCarga(nombrepelicula, res.resultado, "success");
      }
    } catch (err) {
      console.error("Error creando la Licencia", err);
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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [difDias, setDifDias] = useState("");

  const [stateDatosLicencias, setStateDatosLicencias] =
    useState(datosLicencias);

  const { data: dataStateDatosLicencias, error: errorStateDatosLicencias } =
    useSWR(
      stateDatosLicencias.length === 0 ? "/api/retina/datos/A2:Z" : null,
      fetcher
    );

  /* const { data: dataFormAdq, error: errorFormAdq } = useSWR(
    formAdq.length === 0 ? "/api/retina/c2:c" : null,
    fetcher
  );
  const { data: dataTipoCont, error: errorTipoCont } = useSWR(
    tipoCont.length === 0 ? "/api/retina/b2:b" : null,
    fetcher
  );
  const { data: dataPaises, error: errorPaises } = useSWR(
    paises.length === 0 ? "/api/retina/a2:a" : null,
    fetcher
  ); */

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
      //const [paises, tipoCont, formAdq] = stateDatosLicencias;
      //setPaises(dataStateDatosLicencias.data[0]);
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
    //props.setFieldValue("pais", "");
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
    //
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

  return (
    <>
      <Head>
        <title>Gestión de licencias</title>
      </Head>
      <Wrapper>
        <Formik
          {...props}
          initialValues={{
            nombrepelicula: "",
            pais: "",
            tipocontenido: "",
            formaAdquisicion: "",
            //esnueva: true,
            entidadpais: "",
            entidadgratis: "",
            geobloqueo: "",
            mododuracion: "",
            comentarios: "",
          }}
          validationSchema={validaCreaPelicula}
          onSubmit={(values, actions) => {
            guardaLicencia(values);
            //alert(JSON.stringify(values, null, 2));
            //actions.resetForm();
          }}
        >
          {(formik) => (
            <VStack
              autoComplete="off"
              as="form"
              mx="auto"
              w={{ base: "90%", md: 900 }}
              h="100vh"
              justifyContent="flex-start"
              onSubmit={formik.handleSubmit}
            >
              <Heading>Licencia</Heading>

              <CampoTexto
                name="nombrepelicula"
                id="nombrepelicula"
                label="Nombre de la película"
                placeholder="Nombre de la película"
              />

              <SimpleGrid
                w={{ base: "90%", md: 900 }}
                columns={[1, 2, 3]}
                spacing={10}
              >
                <CampoSelect
                  name="tipocontenido"
                  id="tipocontenido"
                  label="Tipo de Contenido"
                  datos={tipoCont}
                  placeholder="Seleccione"
                />
                <CampoSelect
                  name="formaAdquisicion"
                  id="formaAdquisicion"
                  label="Forma de adquisición"
                  datos={formAdq}
                  placeholder="Seleccione"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("pais", "");
                    formik.setFieldValue("entidadgratis", "");
                    formik.setFieldValue("entidadpais", "");
                    onChangeFormaAdquisicion(e.target.value);
                  }}
                />
                <CampoSelect
                  name="pais"
                  id="pais"
                  label="País titular"
                  datos={paises}
                  placeholder="Seleccione"
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangePais(e.target.value);
                  }}
                />
              </SimpleGrid>
              {listaEntidadesPais.length > 0 && entidadesPais && (
                <CampoSelect
                  name="entidadpais"
                  id="entidadpais"
                  label="Entidad País"
                  datos={listaEntidadesPais}
                  placeholder="Seleccione"
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("entidadgratis", "");
                  }}
                />
              )}
              {entidadesGratis && (
                <SimpleGrid
                  w={{ base: "90%", md: 900 }}
                  columns={[2]}
                  spacing={10}
                >
                  <CampoSelect
                    name="entidadgratis"
                    id="entidadgratis"
                    label="Entidad que gestiona la licencia gratuita"
                    datos={listaEntidadesGratuitas}
                    placeholder="Seleccione"
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue("entidadpais", "");
                    }}
                  />

                  <FormControl>
                    <FormLabel>Crear nuevo licenciante gratuito</FormLabel>
                    <Button onClick={onOpen}>Entidad o festival nuevo</Button>
                  </FormControl>
                </SimpleGrid>
              )}
              <CampoSelect
                name="geobloqueo"
                id="geobloqueo"
                label="Perfil inicial de Geobloqueo"
                datos={geobloqueo}
                placeholder="Seleccione"
              />
              <CampoSelect
                name="mododuracion"
                id="mododuracion"
                label="¿Cómo tratamos la duración de esta licencia?"
                datos={modoDuracion}
                placeholder="Seleccione"
              />
              <SimpleGrid
                w={{ base: "90%", md: 900 }}
                columns={[3]}
                spacing={50}
              >
                <FormControl>
                  <FormLabel>Fecha de inicio (si aplica)</FormLabel>
                  <Input
                    name="fechainicio"
                    id="fechainicio"
                    as={DatePicker}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    locale="es"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Días licencia</FormLabel>
                  <Badge colorScheme="green">{difDias}</Badge>
                </FormControl>
                <FormControl>
                  <FormLabel>Fecha de finalización (si aplica)</FormLabel>
                  <Input
                    name="fechafin"
                    id="fechafin"
                    as={DatePicker}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={formik.values.fechainicio}
                    locale="es"
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>
                  Observaciones - comentarios - aclaraciones
                </FormLabel>
                <Textarea
                  name="comentarios"
                  id="comentarios"
                  placeholder="Datos adicionales relevantes"
                  value={formik.values.comentarios}
                  {...formik.getFieldProps("comentarios")}
                  size="sm"
                />
              </FormControl>

              {/* <FormControl
                isInvalid={
                  formik.errors.formaAdquisicion &&
                  formik.touched.formaAdquisicion
                }
              >
                <FormLabel>Forma de adquisición</FormLabel>
                <Field
                  as={Select}
                  name="formaAdquisicion"
                  id="formaAdquisicion"
                  placeholder="Forma de adquisición"
                  value={formik.values.formaAdquisicion}
                  {...formik.getFieldProps("formaAdquisicion")}
                >
                  {formAdq.map((p, i) => (
                    <option onChange={formik.handleChange} key={i} value={p}>
                      {p}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>
                  {formik.errors.formaAdquisicion}
                </FormErrorMessage>
              </FormControl> */}

              {/* <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="esnueva" mb="0">
                  {formik.values.esnueva
                    ? "Es una película nueva"
                    : "Es una renovación"}
                </FormLabel>

                <Field
                  as={Switch}
                  name="esnueva"
                  id="esnueva"
                  value={formik.values.esnueva}
                  onChange={formik.handleChange}
                  isChecked={formik.values.esnueva}
                />
              </FormControl> */}

              <Button
                type="submit"
                variant="outline"
                colorScheme="teal"
                size="lg"
              >
                Crear licencia básica
              </Button>
              {muestraInfo && (
                <>
                  {/* <pre>
                    <code>{JSON.stringify(startDate, null, 5)}</code>
                  </pre>
                  <pre>
                    <code>{JSON.stringify(endDate, null, 5)}</code>
                  </pre> */}
                  <pre>
                    <code>{JSON.stringify(formik, null, 5)}</code>
                  </pre>
                  <pre>
                    <code> {JSON.stringify(listaEntidadesPais)} </code>
                  </pre>
                  <pre>
                    <code> {JSON.stringify(listaEntidadesGratuitas)} </code>
                  </pre>
                </>
              )}
            </VStack>
          )}
        </Formik>

        <Modal
          isOpen={isOpen}
          onClose={cierraModal}
          closeOnEsc={false}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <EntidadGratuitaNueva
            onClose={cierraModal}
            listaEntidadesGratuitas={listaEntidadesGratuitas}
            rango="K"
          />
        </Modal>
      </Wrapper>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}
export default PageSettings;
