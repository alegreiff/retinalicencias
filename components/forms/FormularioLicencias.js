import {
  Badge,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import React from "react";
import CampoSelect from "./CampoSelect";
import CampoTexto from "./CampoTexto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { validaCreaPelicula } from "../../lib/validaForms";
registerLocale("es", es);

export const FormularioLicencias = ({
  valoresInicialesFormulario,
  tipoCont,
  formAdq,
  paises,
  listaEntidadesPais,
  entidadesGratis,
  entidadesPais,
  geobloqueo,
  modoDuracion,
  startDate,
  endDate,
  difDias,
  muestraInfo,
  onChangeFormaAdquisicion,
  listaEntidadesGratuitas,
  onOpen,
  onClose,
  onChangePais,
  guardaLicencia,
  esEdicion = false,
  setEndDate,
  setStartDate,
  //edicionEntidadPais = false,
  //entidadpaisselected = null,
}) => {
  console.log("PELICULAQUELLEGA", valoresInicialesFormulario);
  return (
    <Formik
      initialValues={valoresInicialesFormulario}
      validationSchema={validaCreaPelicula}
      onSubmit={(values, actions) => {
        guardaLicencia(values);
      }}
    >
      {(formik) => (
        <VStack
          autoComplete="off"
          as="form"
          mx="auto"
          w={{ base: "90%", md: 900 }}
          //h="100vh"
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
            <SimpleGrid w={{ base: "90%", md: 900 }} columns={[2]} spacing={10}>
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
          <SimpleGrid w={{ base: "90%", md: 900 }} columns={[3]} spacing={50}>
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
            <FormLabel>Observaciones - comentarios - aclaraciones</FormLabel>
            <Textarea
              name="comentarios"
              id="comentarios"
              placeholder="Datos adicionales relevantes"
              value={formik.values.comentarios}
              {...formik.getFieldProps("comentarios")}
              size="sm"
            />
          </FormControl>

          <Button type="submit" variant="outline" colorScheme="teal" size="lg">
            {esEdicion ? "Modificar licencia" : "Crear licencia básica"}
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
                <code>
                  {" "}
                  (Lista entidades país) {JSON.stringify(
                    listaEntidadesPais
                  )}{" "}
                </code>
              </pre>
              <pre>
                <code> {JSON.stringify(listaEntidadesGratuitas)} </code>
              </pre>
            </>
          )}
        </VStack>
      )}
    </Formik>
  );
};
