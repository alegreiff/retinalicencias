import { useSession, signIn, signOut, getSession } from "next-auth/react";

import { useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  authGoogle,
  hojaRetina,
  googleSheets,
  hojaLicenciasRetina,
} from "../sheets";

import styles from "../styles/Home.module.css";
import { ACTION_TYPES, StoreContext } from "../store";
import { useEffect } from "react";
import { Wrapper } from "../components/Wrapper";

export default function Home({ licencias, datosBasicos }) {
  const { dispatch } = useContext(StoreContext);
  const { data: session, status } = useSession();
  const y = getSession();
  console.log(y);
  useEffect(() => {
    if (session) {
      console.log("Truesession", session);
    }
  }, [session]);
  useEffect(() => {
    if (datosBasicos) {
      dispatch({
        type: ACTION_TYPES.SET_DATOS_BASICOS,
        payload: {
          datosLicencias: datosBasicos,
        },
      });
    }
    if (licencias) {
      dispatch({
        type: ACTION_TYPES.SET_LICENCIAS,
        payload: {
          licencias,
        },
      });
    }
  }, [licencias, datosBasicos, dispatch]);

  if (session) {
    console.log(session?.user?.email, session, status);
    return (
      <div className={styles.container}>
        <Head>
          <title>Licencias Retina Latina</title>
          <meta
            name="description"
            content="Aplicación para uso exclusivo de Retina Latina"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Wrapper>
          <div className={styles.container}>
            Welcome user
            <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </Wrapper>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    );
  }
  return (
    <Wrapper>
      Click to sign into your user account <br />
      <button onClick={() => signIn()}>Sign in</button>
    </Wrapper>
  );

  /* return (
    <div className={styles.container}>
      <Head>
        <title>Licencias Retina Latina</title>
        <meta
          name="description"
          content="Aplicación para uso exclusivo de Retina Latina"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
<div className={styles.container}>
        Welcome user
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      </Wrapper>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  ); */
}

export async function getServerSideProps() {
  console.log("SERVER SAID POORGS");
  const auth = authGoogle;
  const spreadsheetId = hojaRetina;
  const cargaDatosBasicos = await googleSheets.spreadsheets.values.get({
    auth,
    majorDimension: "COLUMNS",
    spreadsheetId: hojaLicenciasRetina,
    range: "settings!A2:Z",
  });

  const cargaLicencias = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: hojaLicenciasRetina,
    range: "matriz!A2:O",
  });

  const datosBasicos = cargaDatosBasicos.data.values;

  const licencias = cargaLicencias.data.values
    ? cargaLicencias.data.values
    : [];

  // Pass data to the page via props
  return {
    props: {
      licencias,
      datosBasicos,
    },
  };
}
