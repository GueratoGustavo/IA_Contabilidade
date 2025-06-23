import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Bem-vindo ao Agente Financeiro
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Escolha uma opção para começar sua jornada financeira:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-md text-lg text-center"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-md text-lg text-center"
            onClick={() => navigate("/relatorios")}
          >
            Relatórios
          </button>
          <button
            className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-md text-lg text-center"
            onClick={() => navigate("/alertas")}
          >
            Alertas
          </button>
          <button
            className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-md text-lg text-center"
            onClick={() => navigate("/configuracoes")}
          >
            Configurações
          </button>
        </div>
      </div>
    </section>
  );
}
