import { authGoogle, hojaRetina } from "../../sheets";
const { google } = require("googleapis");

const handler = async (req, res) => {
  const auth = authGoogle;

  //GET CLIENT INSTANCE
  const client = await auth.getClient();

  //CREATE INSTANCE OF GSHEETS

  const googleSheets = google.sheets({ version: "v4", auth: client });

  //Get metadata about spreadsheet
  const spreadsheetId = hojaRetina;
  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  //READ rows from spreadSheet

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "retinax!C2:C",
  });

  //res.send(getRows.data.values);
  res.status(200).json({ data: getRows.data.values });
};
export default handler;
