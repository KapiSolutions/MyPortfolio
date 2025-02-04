import React from "react";
import "@/styles/main.scss";
import "@fontsource/k2d";
import Layout from "../components/layout/Layout";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </Provider>
    </UserProvider>
  );
}
