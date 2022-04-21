import Moment from 'moment';
import 'moment/locale/es';

export const mapeaLicencia = (licencia) => {
  let resultado = [];
  const fecha = Moment(licencia[1], 'DD-MM-YYYY HH:mm').format('MMMM D, YYYY');
  let entidadpais = '';
  let entidadgratis = '';
  if (licencia[6] === 'Compra') {
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
    mododuracion: licencia[9] ? licencia[9] : '',
    comentarios: licencia[14] ? licencia[14] : '',
    startDate: licencia[10] ? licencia[10] : '',
    endDate: licencia[11] ? licencia[11] : '',
    nombreduracion: licencia[12] ? licencia[12] : '',
    numeroduracion: licencia[13] ? licencia[13] : '',
    entidadpais: entidadpais,
    entidadgratis: entidadgratis,
  });

  return resultado[0];
};
