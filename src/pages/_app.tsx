// pages/_app.tsx or page.tsx (whichever you are using)
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../lib/fontawesome";
config.autoAddCss = false;

import { Provider } from "react-redux";
import { store } from "../store/store";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Layout from "@/layouts/Layout";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/contexts/auth.context";

import { SocketProvider } from "@/contexts/socket.context";
const query = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboardRoute = router.pathname.startsWith("/dashboard");

  const content = <Component {...pageProps} />;

  return (
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={query}>
          <SocketProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {isDashboardRoute ? <Layout>{content}</Layout> : content}
          </SocketProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}
