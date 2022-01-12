import "../styles/globals.css";
import type { AppProps } from "next/app";
import CarForm from "../lib/CarForm";
import SearchForm from "../lib/SearchForm";

function MyApp() {
  return (
    <>
      <CarForm />
      <SearchForm />
    </>
  );
}

export default MyApp;
