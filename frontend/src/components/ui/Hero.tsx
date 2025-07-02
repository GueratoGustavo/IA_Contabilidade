import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-klyro-dark-bg py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Coloque seu Financeiro Contábil no{" "}
            <span className="text-klyro-blue">Piloto Automático</span> com IA
          </h1>
          <p
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Automatize pedidos, negociações e crédito com inteligência
            artificial e dashboards inteligentes.
          </p>
          <div
            className="flex justify-center items-center space-x-4 mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <a
              href="#pricing"
              className="bg-klyro-blue hover:bg-klyro-blue-hover text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Testar Grátis por 7 dias
            </a>
            <a
              href="#demo"
              className="bg-slate-100 hover:bg-slate-200 dark:bg-klyro-dark-card dark:hover:bg-klyro-dark-border text-slate-800 dark:text-white font-bold py-3 px-8 rounded-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Ver a IA em Ação
            </a>
          </div>
        </div>
        <div
          className="relative max-w-5xl mx-auto mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur-xl opacity-25 dark:opacity-50"></div>

          {/* Notebook chassis */}
          <div className="relative">
            {/* Lid with bezel */}
            <div className="bg-slate-900 dark:bg-black rounded-t-xl p-2 sm:p-3 shadow-2xl border-b-2 border-slate-700">
              <div className="bg-black rounded-md overflow-hidden">
                <img
                  src="https://picsum.photos/seed/klyro-dashboard/1200/650"
                  alt="Dashboard da Klyro"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Base */}
            <div className="relative bg-slate-800 h-5 rounded-b-xl shadow-inner">
              {/* Notch for opening the lid */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-2 bg-slate-700 rounded-b-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
