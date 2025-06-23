import { NavLink, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Relatorios from "./pages/Relatorios";
import Alertas from "./pages/Alertas";
import Configuracoes from "./pages/Configuracoes";

export default function App() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-navy-800">
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
                  `block px-4 py-2 rounded-md text-sm font-medium hover:bg-navy-700 transition-colors duration-200 ${
                    isActive ? "bg-navy-700" : ""
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/relatorios"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm font-medium hover:bg-navy-700 transition-colors duration-200 ${
                    isActive ? "bg-navy-700" : ""
                  }`
                }
              >
                Relatórios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/alertas"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm font-medium hover:bg-navy-700 transition-colors duration-200 ${
                    isActive ? "bg-navy-700" : ""
                  }`
                }
              >
                Alertas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/configuracoes"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm font-medium hover:bg-navy-700 transition-colors duration-200 ${
                    isActive ? "bg-navy-700" : ""
                  }`
                }
              >
                Configurações
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route
            path="*"
            element={
              <h2 className="text-2xl font-semibold text-gray-800">
                404 - Página não encontrada
              </h2>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
