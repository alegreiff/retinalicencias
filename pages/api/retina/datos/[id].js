import {
  authGoogle,
  googleSheets,
  hojaLicenciasRetina,
} from '../../../../sheets';

const handler = async (req, res) => {
  /* console.log('Mork llamando a mindy');
  const { id } = req.query;
  console.log('QUERY QUERY', id);
  const auth = authGoogle;
  const spreadsheetId = hojaLicenciasRetina;
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    majorDimension: 'COLUMNS',
    spreadsheetId,
    range: `test!${id}`,
  }); */

  const auth = authGoogle;
  const spreadsheetId = hojaLicenciasRetina;
  const rango = 'test!D2';

  const carga = await googleSheets.spreadsheets.values.update({
    auth,

    spreadsheetId,
    range: rango,
    //valueInputOption: "RAW"
    valueInputOption: 'RAW',
    resource: {
      values: [['Andrea', 'Magola']],
    },
  });

  //console.log("CARGA", carga.status);
  if (!carga) {
    res.status(501).json({ resultado: 'Error en la carga' });
  }

  res.status(200).json({ message: 'exito', load: carga.data });
};
export default handler;
