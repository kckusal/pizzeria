import { useEffect, useRef } from "react";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import Router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import NProgress from "nprogress";
import { Stack } from "@chakra-ui/react";
import { BiArrowBack, BiArrowToTop } from "react-icons/bi";

import AppProvider from "components/AppProvider";
import AppToasts from "components/AppToasts";

import siteMeta from "configs/site.meta";
import { wrapper } from "redux/store.js";

import "styles/globals.css";
import "styles/nprogress.css";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    NProgress.configure({ minimum: 0.1, showSpinner: false });
    Router.events.on("routeChangeStart", url => {
      NProgress.start();
    });

    Router.events.on("routeChangeError", () => NProgress.done());
    Router.events.on("routeChangeComplete", () => NProgress.done());
  }, []);

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

      <Stack>
        <Component {...pageProps} />
      </Stack>
    </AppProvider>
  );
}

export default wrapper.withRedux(MyApp);
