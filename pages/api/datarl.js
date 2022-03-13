//const { google } = require("googleapis");
import { google } from "googleapis";

const handler = async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  //GET CLIENT INSTANCE
  const client = await auth.getClient();

  //CREATE INSTANCE OF GSHEETS

  const googleSheets = google.sheets({ version: "v4", auth: client });

  //Get metadata about spreadsheet
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  //READ rows from spreadSheet

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "data!A2:A",
  });

  //res.send(getRows.data.values);
  res.status(200).json({ data: getRows.data.values });
};
export default handler;
