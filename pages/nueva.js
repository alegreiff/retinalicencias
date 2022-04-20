import { getSession, useSession } from 'next-auth/react';
import { ACTION_TYPES, StoreContext } from '../store';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../lib';
import { Wrapper } from '../components/Wrapper';
import { Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head';

import { useToast } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { EntidadGratuitaNueva } from '../components/licencias/EntidadGratuitaNueva';
import { FormularioLicencias } from '../components/forms/FormularioLicencias';

const PageSettings = (props) => {
  const { data: session } = useSession();
  const [autor, setAutor] = useState('');

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
    router.push('/licencias');
  };

  const valoresInicialesFormulario = {
    nombrepelicula: '',
    pais: '',
    tipocontenido: '',
    formaAdquisicion: '',
    entidadpais: '',
    entidadgratis: '',
    geobloqueo: '',
    mododuracion: '',
    comentarios: '',
    numeroduracion: '',
    nombreduracion: '',
  };

  const guardaLicencia = async (values) => {
    console.log(values, startDate, endDate);
    //return;

    try {
      const {
        nombrepelicula,
        formaAdquisicion,
        pais,
        tipocontenido,
        geobloqueo,
        mododuracion,
        comentarios,
        nombreduracion,
        numeroduracion,
      } = values;
      const entidad = '';
      if (values.entidadpais === '') {
        entidad = values.entidadgratis;
      } else {
        entidad = values.entidadpais;
      }
      const response = await fetch('/api/retina/guarda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          startDate,
          endDate,
          comentarios,
          nombreduracion,
          numeroduracion,
        }),
      });

      const res = await response.json();
      //return; //PROVISIONAL
      if (res) {
        exitoCarga(nombrepelicula, res.resultado, 'success');
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
  const [auxModoDuracion, setAuxModoDuracion] = useState(datosLicencias[13]);
  const [entidadesPais, setEntidadesPais] = useState(false);
  const [entidadesGratis, setEntidadesGratis] = useState(false);
  const [listaEntidadesPais, setListaEntidadesPais] = useState([]);
  const [listaEntidadesGratuitas, setListaEntidadesGratuitas] = useState([]);
  const [muestraFechas, setMuestraFechas] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [difDias, setDifDias] = useState('');
  const [detalleFechas, setDetalleFechas] = useState(null);

  const [stateDatosLicencias, setStateDatosLicencias] =
    useState(datosLicencias);

  const { data: dataStateDatosLicencias, error: errorStateDatosLicencias } =
    useSWR(
      stateDatosLicencias.length === 0 ? '/api/retina/datos/A2:Z' : null,
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
      setAuxModoDuracion(dataStateDatosLicencias.data[13]);
      setStateDatosLicencias(dataStateDatosLicencias.data);
    }
  }, [dispatch, dataStateDatosLicencias]);

  const onChangeFormaAdquisicion = (value) => {
    setListaEntidadesPais([]);
    if (value === 'Compra') {
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
        case 'Bolivia': {
          setListaEntidadesPais(datosLicencias[4]);
          break;
        }
        case 'Colombia': {
          setListaEntidadesPais(datosLicencias[5]);
          break;
        }
        case 'Ecuador': {
          setListaEntidadesPais(datosLicencias[6]);
          break;
        }
        case 'México': {
          setListaEntidadesPais(datosLicencias[7]);
          break;
        }
        case 'Perú': {
          setListaEntidadesPais(datosLicencias[8]);
          break;
        }
        case 'Uruguay': {
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
      console.log('Cancelarich');
    }
    onClose();
  };

  const onChangeDuracionLicencia = (value) => {
    if (!value) {
      setDetalleFechas(null);
      return;
    }

    const indice = modoDuracion.indexOf(value);
    const detalle = auxModoDuracion[indice];
    if (detalle) {
      setDetalleFechas(detalle);
    } else {
      setDetalleFechas(null);
    }
  };
  useEffect(() => {
    if (detalleFechas === 'FF') {
      setMuestraFechas(true);
    } else {
      setMuestraFechas(false);
    }
  }, [detalleFechas]);

  return (
    <>
      <Head>
        <title>Gestión de licencias</title>
      </Head>
      {/* <pre>
        <code>(MODO DURACIÓN) {JSON.stringify(modoDuracion[0], null, 5)}</code>
      </pre> */}
      <Wrapper>
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
            rango='K'
          />
        </Modal>

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
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          muestraFechas={muestraFechas}
          onChangeDuracionLicencia={onChangeDuracionLicencia}
          detalleFechas={detalleFechas}
        />
      </Wrapper>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
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
