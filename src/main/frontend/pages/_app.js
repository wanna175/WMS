//import "@/styles/globals.css";
import LayoutPage from "../src/layout/layoutPage";
import { globalStyles } from "../src/styles/globalStyles";
import { Global } from "@emotion/react";
import { TokenProvider } from "../src/axios/TokenContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TokenProvider>
        <Global styles={globalStyles} />
        <LayoutPage>
          <Component {...pageProps} />
        </LayoutPage>
      </TokenProvider>
    </>
  );
}
