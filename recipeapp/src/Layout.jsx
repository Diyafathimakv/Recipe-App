import Header from "./Components/Header/App";
import Footer from "./Components/Footer/App";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;