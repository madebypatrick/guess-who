import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/home.scss";
import "../styles/login.scss";
import "../styles/googleLogin.scss";
import "../styles/play.scss";
import "../styles/questions.scss";
import "../styles/results.scss";
import "../styles/countdown-timer.scss";
import "../styles/celebrate.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
