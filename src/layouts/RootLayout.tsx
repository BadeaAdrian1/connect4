import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-white">
        <div className="fixed-bottom text-center" style={{backgroundColor: "#111111"}}>
            <div>©️ACASA-URZICENI</div>
            <div>
                <a href="https://www.vodafone.com/careers/professional-career-areas/shared-services" target="_blank" style={{ color: "white", textDecoration: "none"}}>About us</a>
            </div>
            <div>{new Date().getFullYear()}</div>
        </div>
      </footer>
    </>
  );
};

export default RootLayout;
