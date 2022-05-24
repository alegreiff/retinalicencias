import {
  Badge,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import React, { useEffect } from 'react';
import CampoSelect from './CampoSelect';
import CampoTexto from './CampoTexto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { validaCreaPelicula } from '../../lib/validaForms';
registerLocale('es', es);

export const FormularioLicencias = ({
  datosLicencias,
  retinaPaises,
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
  muestraFechas,
  onChangeDuracionLicencia,
  detalleFechas,
  onChangeTipoContenido,
  //edicionEntidadPais = false,
  //entidadpaisselected = null,
}) => {
  //console.log('PELICULAQUELLEGA', valoresInicialesFormulario.numeroduracion);

  useEffect(() => {
    if (esEdicion) {
      if (valoresInicialesFormulario.mododuracion) {
        console.log('OONN CC EE');
        onChangeDuracionLicencia(valoresInicialesFormulario.mododuracion);
      }

      //
    }
  }, []);
  const setEspecial = (valor) => {
    if (valor.endsWith('DATO')) return true;
    return false;
  };
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
          autoComplete='off'
          as='form'
          mx='auto'
          w={{ base: '90%', md: 900 }}
          //h="100vh"
          justifyContent='flex-start'
          onSubmit={formik.handleSubmit}
        >
          <Heading>Licencia</Heading>
          <span> {detalleFechas} </span>
          <SimpleGrid>
          <CampoSelect
              name='tipocontenido'
              id='tipocontenido'
              label='Tipo de Contenido'
              datos={tipoCont}
              placeholder='Seleccione'
              onChange={(e) => {
                formik.handleChange(e);
                onChangeTipoContenido(e.target.value, datosLicencias);
              }}
            />
          </SimpleGrid>
          <SimpleGrid
            w={{ base: '90%', md: 900 }}
            columns={[1, 2, 3]}
            spacing={10}
          >
            
            <CampoSelect
              name='formaAdquisicion'
              id='formaAdquisicion'
              label='Forma de adquisición'
              datos={formAdq}
              placeholder='Seleccione'
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('pais', '');
                formik.setFieldValue('entidadgratis', '');
                formik.setFieldValue('entidadpais', '');
                onChangeFormaAdquisicion(e.target.value);
              }}
            />
            <CampoSelect
              name='pais'
              id='pais'
              label='País titular'
              datos={paises}
              placeholder='Seleccione'
              onChange={(e) => {
                formik.handleChange(e);
                onChangePais(e.target.value);
              }}
            />
          </SimpleGrid>
          <CampoTexto
            name='nombrepelicula'
            id='nombrepelicula'
            label='Nombre de la película'
            placeholder='Nombre de la película'
          />
          {listaEntidadesPais.length > 0 && entidadesPais && (
            <CampoSelect
              name='entidadpais'
              id='entidadpais'
              label='Entidad País'
              datos={listaEntidadesPais}
              placeholder='Seleccione'
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('entidadgratis', '');
              }}
            />
          )}
          {entidadesGratis && (
            <SimpleGrid w={{ base: '90%', md: 900 }} columns={[2]} spacing={10}>
              <CampoSelect
                name='entidadgratis'
                id='entidadgratis'
                label='Entidad que gestiona la licencia gratuita'
                datos={listaEntidadesGratuitas}
                placeholder='Seleccione'
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue('entidadpais', '');
                }}
              />

              <FormControl>
                <FormLabel>Crear nuevo licenciante gratuito</FormLabel>
                <Button onClick={onOpen}>Entidad o festival nuevo</Button>
              </FormControl>
            </SimpleGrid>
          )}
          <CampoSelect
            name='geobloqueo'
            id='geobloqueo'
            label='Perfil inicial de Geobloqueo'
            datos={geobloqueo}
            placeholder='Seleccione'
          />
          <CampoSelect
            name='mododuracion'
            id='mododuracion'
            label='¿Cómo tratamos la duración de esta licencia?'
            datos={modoDuracion}
            placeholder='Seleccione'
            onChange={(e) => {
              formik.handleChange(e);
              onChangeDuracionLicencia(e.target.value);
              formik.setFieldValue(
                'validaespecial',
                setEspecial(e.target.value)
              );
              formik.setFieldValue('nombreduracion', '');
              formik.setFieldValue('numeroduracion', '');
            }}
          />
          {detalleFechas === 'MD' && (
            <SimpleGrid
              w={{ base: '90%', md: 900 }}
              columns={[1, 2, 3]}
              spacing={10}
            >
              <CampoSelect
                name='nombreduracion'
                id='nombreduracion'
                label='Periodo de la licencia'
                datos={['Días', 'Meses', 'Años']}
                placeholder='Seleccione'
              />

              {formik.values.nombreduracion && (
                <Field name='numeroduracion'>
                  {({ field, form }) => (
                    <FormControl
                      id='numeroduracion'
                      isInvalid={
                        formik.errors.numeroduracion &&
                        formik.touched.numeroduracion
                      }
                    >
                      <FormLabel htmlFor='numeroduracion'>
                        {formik.values.nombreduracion}
                        {formik.values.nombreduracion === 'Años'
                          ? ' (1 - 15 años)'
                          : formik.values.nombreduracion === 'Meses'
                          ? ' (1 - 50 meses)'
                          : ' (1 - 1000 días)'}
                      </FormLabel>
                      <NumberInput
                        background='lime'
                        min={1}
                        max={
                          formik.values.nombreduracion === 'Años'
                            ? 15
                            : formik.values.nombreduracion === 'Meses'
                            ? 50
                            : 1000
                        }
                        id='numeroduracion '
                        {...field}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <FormErrorMessage>
                        {form.errors.numeroduracion}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              )}
            </SimpleGrid>
          )}

          {muestraFechas && (
            <SimpleGrid w={{ base: '90%', md: 900 }} columns={[3]} spacing={50}>
              <FormControl>
                <FormLabel>Fecha de inicio (si aplica)</FormLabel>
                <Input
                  name='fechainicio'
                  id='fechainicio'
                  as={DatePicker}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  locale='es'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Días licencia</FormLabel>
                <Badge colorScheme='green'>{difDias}</Badge>
              </FormControl>
              <FormControl>
                <FormLabel>Fecha de finalización (si aplica)</FormLabel>
                <Input
                  name='fechafin'
                  id='fechafin'
                  as={DatePicker}
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={formik.values.fechainicio}
                  locale='es'
                />
              </FormControl>
            </SimpleGrid>
          )}

          <FormControl>
            <FormLabel>Observaciones - comentarios - aclaraciones</FormLabel>
            <Textarea
              name='comentarios'
              id='comentarios'
              placeholder='Datos adicionales relevantes'
              value={formik.values.comentarios}
              {...formik.getFieldProps('comentarios')}
              size='sm'
            />
          </FormControl>

          <Button type='submit' variant='outline' colorScheme='teal' size='lg'>
            {esEdicion ? 'Modificar licencia' : 'Crear licencia básica'}
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
                <code>{JSON.stringify(formik.errors, null, 5)}</code>
              </pre>
              <pre>
                <code>{JSON.stringify(formik.values, null, 5)}</code>
              </pre>
              <pre>
                <code>
                  (Lista entidades país) {JSON.stringify(listaEntidadesPais)}
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
