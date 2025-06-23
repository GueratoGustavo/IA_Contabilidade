import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiBarChart2,
  FiFileText,
  FiAlertCircle,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

import Dashboard from "./pages/Dashboard";
import Relatorios from "./pages/Relatorios";
import Alertas from "./pages/Alertas";
import Configuracoes from "./pages/Configuracoes";

export default function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const pageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/relatorios":
        return "Relatórios";
      case "/alertas":
        return "Alertas";
      case "/configuracoes":
        return "Configurações";
      default:
        return "Agente Financeiro";
    }
  };

  return (
    <div
      className="columns is-gapless is-mobile"
      style={{ minHeight: "100vh", backgroundColor: "#14161A" }}
    >
      {/* Sidebar */}
      <aside
        className={`menu column is-2 ${
          isSidebarOpen ? "" : "is-hidden-mobile"
        }`}
        style={{ backgroundColor: "#14161A", color: "#ffffff" }}
      >
        <div className="menu-label has-text-white has-text-centered mt-5 mb-3">
          <h1 className="title is-4 has-text-white">Agente Financeiro</h1>
        </div>

        <ul className="menu-list">
          <MenuItem to="/dashboard" icon={<FiBarChart2 />} label="Dashboard" />
          <MenuItem to="/relatorios" icon={<FiFileText />} label="Relatórios" />
          <MenuItem to="/alertas" icon={<FiAlertCircle />} label="Alertas" />
          <MenuItem
            to="/configuracoes"
            icon={<FiSettings />}
            label="Configurações"
          />
        </ul>
      </aside>

      {/* Main */}
      <div className="column is-flex is-flex-direction-column">
        {/* Header */}
        <nav
          className="navbar has-shadow"
          style={{ backgroundColor: "#14161A" }}
        >
          <div className="navbar-brand">
            <button
              className="navbar-item is-hidden-tablet"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FiMenu size={22} />
            </button>
            <div className="navbar-item">
              <h2 className="title is-5 has-text-white">{pageTitle()}</h2>
            </div>
          </div>

          <div className="navbar-menu is-active">
            <div className="navbar-end">
              <div className="navbar-item">
                <FiBell size={20} />
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link has-text-white">
                  <span className="mr-2">User Name</span>
                  <FiChevronDown />
                </div>

                <div className="navbar-dropdown is-right">
                  <a className="navbar-item">Perfil</a>
                  <a className="navbar-item">Sair</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="p-5 is-flex-grow-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route
              path="*"
              element={
                <div className="has-text-centered mt-6">
                  <h2 className="title is-3">Página não encontrada</h2>
                  <p className="subtitle is-6">
                    A página que você está procurando não existe.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// 🔥 Componente Menu Item adaptado para Bulma
function MenuItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `is-flex is-align-items-center px-3 py-2 ${
            isActive ? "has-background-link" : "has-text-white"
          }`
        }
        style={{ borderRadius: "8px" }}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </NavLink>
    </li>
  );
}
