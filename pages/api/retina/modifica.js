import moment from 'moment';
import { authGoogle, googleSheets, hojaLicenciasRetina } from '../../../sheets';

const handler = async (req, res) => {
  //moment;
  if (req.method === 'PUT') {
    let date = new Date();
    let day = `0${date.getDate()}`.slice(-2); //("0"+date.getDate()).slice(-2);
    let month = `0${date.getMonth() + 1}`.slice(-2);
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes;

    const fecha = `${day}-${month}-${year} ${hour}:${minutes}`;

    const {
      id,
      autor,
      nombrepelicula,
      pais,
      tipocontenido,
      formaAdquisicion,
      entidad,
      geobloqueo,
      mododuracion,
      comentarios,
    } = req.body;
    let { nombreduracion, numeroduracion } = req.body;
    let { startDate, endDate } = req.body;

    if (nombreduracion.length > 0 && numeroduracion > 0) {
      startDate = '';
      endDate = '';
    } else {
      nombreduracion = 'Días';
      numeroduracion = moment(endDate).diff(startDate, 'days') + 1;
      startDate = moment(startDate).format('DD/MM/YYYY');
      endDate = moment(endDate).format('DD/MM/YYYY');
    }

    console.log('NAME', nombreduracion);
    console.log('DATTA', numeroduracion);
    console.log('INI', startDate);
    console.log('FIN', endDate);
    //res.status(200).json({ message: 'El águila está en el nido' });
    //return;

    const auth = authGoogle;
    const spreadsheetId = hojaLicenciasRetina;
    const rango = `matriz!B${id + 1}`;

    /* const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: rango,
    });
    const ID = getRows.data.values.length; */
    //Write rows to spreadsheet

    const carga = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: rango,
      //valueInputOption: "RAW"
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [
            fecha,
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
            nombreduracion,
            numeroduracion,
            comentarios,
          ],
        ],
      },
    });

    //console.log("CARGA", carga.status);
    if (!carga) {
      res.status(501).json({ resultado: 'Error en la carga' });
    }

    res.status(200).json({ resultado: carga.statusText });
  } else {
    res.status(500).json({ error: 'Solo PUT' });
  }
};
export default handler;
