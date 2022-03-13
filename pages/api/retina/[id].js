import { authGoogle, googleSheets, hojaLicenciasRetina } from "../../../sheets";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id } = req.query;
    const { autor, pelicula } = req.body;

    const auth = authGoogle;
    const spreadsheetId = hojaLicenciasRetina;
    const getRows = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `matriz!${id}`,
      //valueInputOption: "RAW"
      valueInputOption: "RAW",
      resource: {
        values: [[autor, pelicula]],
      },
    });
    res.status(200).json({ data: getRows });
    //res.status(200).json({ data: autor, query: id });
  } else {
    const { id } = req.query;
    console.log("QUERY QUERY", id);
    const auth = authGoogle;
    const spreadsheetId = hojaLicenciasRetina;
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `settings!${id}`,
    });

    //res.send(getRows.data.values);
    //console.log(getRows.data.values);
    res.status(200).json({ data: getRows.data.values });
    //res.status(200).json({ query: id, version: 1 });
  }
};
export default handler;
