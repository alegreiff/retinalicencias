import {
  authGoogle,
  googleSheets,
  hojaLicenciasRetina,
} from "../../../../sheets";

const handler = async (req, res) => {
  console.log("Mork llamando a mindy");
  const { id } = req.query;
  console.log("QUERY QUERY", id);
  const auth = authGoogle;
  const spreadsheetId = hojaLicenciasRetina;
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    majorDimension: "COLUMNS",
    spreadsheetId,
    range: `settings!${id}`,
  });

  res.status(200).json({ data: getRows.data.values });
};
export default handler;
