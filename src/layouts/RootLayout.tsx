import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <header>
        <Navbar />
      </header>
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <footer className="text-white">
        <div className="text-center" style={{ backgroundColor: "#111111" }}>
          <div>©️ACASA-URZICENI</div>
          <div>
            <a
              href="https://www.vodafone.com/careers/professional-career-areas/shared-services"
              target="_blank"
              style={{ color: "white", textDecoration: "none" }}
            >
              About us
            </a>
          </div>
          <div>{new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
