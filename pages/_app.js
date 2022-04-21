import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import StoreProvider from '../store';
import '../styles/globals.css';

//function MyApp({ Component, pageProps }) {
//function MyApp({ Component, pageProps: { session, ...pageProps } }) {
function MyApp({ session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
/*
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "../components/Menu/MenuHeader";

import "../styles/globals.css";
import { theme } from "../utils/temaCustom";
import { SessionProvider } from "next-auth/react";

function MyApp({ session, Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <SidebarWithHeader>
          <Component {...pageProps} />
        </SidebarWithHeader>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;

*/
