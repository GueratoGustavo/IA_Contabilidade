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

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
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
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white font-['Inter']">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-blue-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-20`}
      >
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold tracking-tight">
            Agente Financeiro
          </h1>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ${
                    isActive ? "bg-blue-700" : ""
                  }`
                }
              >
                <FiBarChart2 className="mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/relatorios"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ${
                    isActive ? "bg-blue-700" : ""
                  }`
                }
              >
                <FiFileText className="mr-3" />
                Relatórios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/alertas"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ${
                    isActive ? "bg-blue-700" : ""
                  }`
                }
              >
                <FiAlertCircle className="mr-3" />
                Alertas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/configuracoes"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ${
                    isActive ? "bg-blue-700" : ""
                  }`
                }
              >
                <FiSettings className="mr-3" />
                Configurações
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="block md:hidden mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">
              {getPageTitle(location.pathname)}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <FiBell size={20} />
            </button>
            <div className="flex items-center">
              <span className="mr-2">User Name</span>
              <FiChevronDown />
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route
              path="*"
              element={
                <div className="text-center py-10">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Página não encontrada
                  </h2>
                  <p className="text-gray-600 mt-2">
                    A página que você está procurando não existe.
                  </p>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}
