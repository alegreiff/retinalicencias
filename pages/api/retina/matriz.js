import { authGoogle, googleSheets, hojaLicenciasRetina } from "../../../sheets";

const handler = async (req, res) => {
  //console.log("LLAMA LICENCIAS");
  const auth = authGoogle;
  const spreadsheetId = hojaLicenciasRetina;
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `matriz!A2:O`,
  });

  //res.send(getRows.data.values);
  //console.log(getRows.data.values);
  res.status(200).json({ data: getRows.data.values });
  //res.status(200).json({ query: id, version: 1 });
};
export default handler;
