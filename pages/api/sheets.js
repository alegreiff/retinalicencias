const { google } = require("googleapis");

const miGoogle = async (req, res) => {
  /* const auth = new google.auth.GoogleAuth({
    //keyFilename: miscreds,
    keyFile: process.env.GOOGLE_JSON,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  }); */

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  //GET CLIENT INSTANCE
  const client = await auth.getClient();

  //CREATE INSTANCE OF GSHEETS

  const googleSheets = google.sheets({ version: "v4", auth: client });

  //Get metadata about spreadsheet
  const spreadsheetId = "14vIjf53NcUJ-4z_O90K507w2BTbpWbZiDeAsP1slY_4";
  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  //READ rows from spreadSheet

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "hoja1!A1:A10",
  });

  //Write rows to spreadsheet
  /*   const carga = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "hoja1!A:B",
    //valueInputOption: "RAW"
    valueInputOption: "RAW",
    resource: {
      values: [
        ["Cuty rodadero", "Jimmy"],
        ["MireyaAy", "J"],
        ["CrisArevaloY", "J"],
      ],
    },
  });
  console.log("CARGA", carga.status); */

  res.send(getRows.data.values);
};
export default miGoogle;
