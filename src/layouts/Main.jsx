import React from "react";
import Header from "./header";
import Footer from "./Footer";

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <div>hihi</div>
      <Footer />
    </>
  );
};

export default Main;
