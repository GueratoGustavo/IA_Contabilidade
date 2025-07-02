import React from "react";

const LeadCapture: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    alert("Obrigado! Em breve um de nossos consultores entrará em contato.");
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6">
        <div className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Prefere um atendimento personalizado?
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Fale com um de nossos consultores para entender como a Klyro
                pode se adaptar perfeitamente ao seu negócio ou agende um teste
                guiado.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Seu nome"
                  required
                  className="w-full bg-slate-100/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Seu melhor email"
                  required
                  className="w-full bg-slate-100/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="cnpj" className="sr-only">
                  CNPJ
                </label>
                <input
                  type="text"
                  name="cnpj"
                  id="cnpj"
                  placeholder="CNPJ da empresa (opcional)"
                  className="w-full bg-slate-100/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                Quero um atendimento
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
