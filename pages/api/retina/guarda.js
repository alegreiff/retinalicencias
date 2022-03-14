import { authGoogle, googleSheets, hojaLicenciasRetina } from "../../../sheets";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let date = new Date();
    let day = `0${date.getDate()}`.slice(-2); //("0"+date.getDate()).slice(-2);
    let month = `0${date.getMonth() + 1}`.slice(-2);
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes;

    const fecha = `${day}-${month}-${year} ${hour}:${minutes}`;

    const {
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

    const auth = authGoogle;
    const spreadsheetId = hojaLicenciasRetina;
    const rango = "matriz!A:E";

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: rango,
    });
    const ID = getRows.data.values.length;
    //Write rows to spreadsheet

    const carga = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: rango,
      //valueInputOption: "RAW"
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            ID,
            fecha,
            autor,
            nombrepelicula,
            pais,
            tipocontenido,
            formaAdquisicion,
            entidad,
            geobloqueo,
            mododuracion,
            "",
            "",
            comentarios,
          ],
        ],
      },
    });

    //console.log("CARGA", carga.status);
    if (!carga) {
      res.status(501).json({ resultado: "Error en la carga" });
    }

    res.status(200).json({ resultado: carga.statusText });
  } else {
    res.status(500).json({ error: "Solo POST" });
  }
};
export default handler;