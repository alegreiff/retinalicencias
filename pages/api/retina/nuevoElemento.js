import { authGoogle, googleSheets, hojaLicenciasRetina } from "../../../sheets";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { rango, nuevoElemento } = req.body;
    const auth = authGoogle;
    const spreadsheetId = hojaLicenciasRetina;

    const datosActuales = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `settings!${rango}:${rango}`,
    });
    const lastRow = datosActuales.data.values.length;
    const getRows = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: `settings!${rango}${lastRow + 1}`,
      valueInputOption: "RAW",
      resource: {
        values: [[nuevoElemento]],
      },
    });

    const nuevosDatos = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `settings!${rango}2:${rango}`,
    });

    res.status(200).json({ data: nuevosDatos.data.values });
  }
};
export default handler;
