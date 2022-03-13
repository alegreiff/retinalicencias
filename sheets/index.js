const { google } = require("googleapis");

const emailGsheets = "aprendegsheets@gsheets-next.iam.gserviceaccount.com";
const videoTech = "https://www.youtube.com/watch?v=PFJNJQCU_lo&t=621s";
const videoTech2 =
  "https://www.freecodecamp.org/news/create-a-feedback-form-using-nextjs-and-google-sheets-api/";
const videoformularios = "https://www.youtube.com/watch?v=4j6QiEbBoS0";
export const keyFile = "credentials.json";
export const scopes = "https://www.googleapis.com/auth/spreadsheets";

export const hojaRetina = "1QfD40PtW6RQ9_8YnIZYXKvtDX2Gf9j5mcU_fNH_0Iis";
export const hojaDatos = "14vIjf53NcUJ-4z_O90K507w2BTbpWbZiDeAsP1slY_4";
export const hojaTest = "1qEIZaVFCqpCp5_8p0sgz98XvBifKO4AgTMG2mxthdUA";
export const hojaLicenciasRetina = `1UrY3OYNCw6WBCMbjtwMKcSVduMR_KL_Js1iflvZzM3w`;

export const paisesRetina = [
  "Bolivia",
  "Colombia",
  "Ecuador",
  "México",
  "Peru",
  "Uruguay",
];
export const authGoogle = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const client = async () => {
  return await auth.getClient();
};

export const googleSheets = google.sheets({ version: "v4", auth: client });

/* 
ESTRUCTURA DE DATOS
0 = países                                  A
1 = Tipo de contenido (nuevo / renovacion)  B
2 = Forma de adquisición                    C
3 = Países RETINA                           D
4 = ENTIDADES Bolivia                       E
5 = ENTIDADES Colombia                      F
6 = ENTIDADES Ecuador                       G
7 = ENTIDADES México                        H
8 = ENTIDADES Perú                          I
9 = ENTIDADES Uruguay                       J
10 = ENTIDADES GRATUITAS                    K
11 = Perfiles de geobloqueo                 L
12 = Modo de duración                       M


*/
