import React from "react";
import "@/styles/main.scss";
import "@fontsource/k2d";
import Layout from "../components/layout/Layout";
import { Provider } from "react-redux";
import { store } from "../store/store";

// Import types
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
