import { useEffect } from "react";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import { useSelector } from "react-redux";

import NProgress from "nprogress";
import { Stack, Flex, Box } from "@chakra-ui/react";

import AppProvider from "components/AppProvider";
import AppToasts from "components/AppToasts";
import AppContainer from "components/AppContainer";
import Topbar from "components/topbar";
import { wrapper } from "redux/store.js";

import "styles/globals.css";
import "styles/nprogress.css";

function MyApp({ Component, pageProps }) {
  const authenticated = useSelector(state => state.user.authenticated);

  useEffect(() => {
    NProgress.configure({ minimum: 0.1, showSpinner: false });
    Router.events.on("routeChangeStart", url => {
      NProgress.start();
    });

    Router.events.on("routeChangeError", () => NProgress.done());
    Router.events.on("routeChangeComplete", () => NProgress.done());
  }, []);

  useEffect(() => {
    if (authenticated) {
      if (["/login", "/register"].includes(Router.pathname)) {
        Router.push("/");
      }
    }
  }, [authenticated]);

  return (
    <AppProvider>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" type="image/png" sizes="96x96" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        <meta name="theme-color" content="#319795" />
      </Head>

      <DefaultSeo />

      <AppToasts />

      <Box bg="red.20" width="full" height="full">
        <Topbar />

        <Component {...pageProps} />
      </Box>
    </AppProvider>
  );
}

export default wrapper.withRedux(MyApp);
