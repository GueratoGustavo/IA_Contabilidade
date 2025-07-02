import React, { useState } from "react";
import DashboardDemo from "./DashboardDemo"; // importe o componente corretamente conforme seu path

const DemoSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="py-20 bg-[#0A101E]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Veja como a Klyro transforma dados em decisões
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 mt-4">
            Da classificação automática de documentos à recomendação de estratégias, nossa IA simplifica o complexo.
          </p>
        </div>

        <div
          className="rounded-xl border border-[#222B3F] shadow-2xl overflow-hidden backdrop-blur-md bg-white/5 animate-fade-in-up"
        >
          {/* Barra superior estilo navegador */}
          <div className="flex items-center h-10 px-4 bg-white/10 border-b border-[#2C364A] backdrop-blur-sm">
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <div className="mx-auto text-sm text-gray-300 font-mono truncate hidden sm:block">
              https://app.klyro.ai/demo
            </div>
          </div>

          {/* Conteúdo (imagem clicável) */}
          <div
            className="aspect-w-16 aspect-h-9 bg-gray-800 cursor-pointer"
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openModal();
              }
            }}
            aria-label="Abrir demonstração da dashboard"
          >
            <img
              src="https://picsum.photos/seed/klyro-demo/1200/675"
              alt="Demonstração do produto Klyro"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#0A101E] rounded-lg max-w-7xl w-full max-h-[90vh] p-6 relative overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão fechar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-3xl font-bold"
              aria-label="Fechar demonstração"
            >
              ×
            </button>

            {/* Aqui abre o dashboard */}
            <DashboardDemo />
          </div>
        </div>
      )}
    </section>
  );
};

export default DemoSection;
