import React from "react";
import Button from "../components/Button";

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 text-white overflow-hidden">
      {/* Background e grade */}
      <div className="absolute inset-0 bg-[#0A101E]">
        <div className="absolute inset-0 bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Coloque seu Financeiro e Contábil no Piloto Automático com IA
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
          A Klyro integra, analisa e automatiza suas operações, transformando
          dados complexos em decisões inteligentes e lucrativas.
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button variant="primary">Testar grátis</Button>
          <Button variant="outline">Ver IA em ação</Button>
        </div>

        {/* Mockup do notebook */}
        <div
          className="relative max-w-5xl mx-auto mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          {/* Borda em glow degradê */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur-xl opacity-25 dark:opacity-50"></div>

          {/* Notebook: tampa e base */}
          <div className="relative">
            {/* Tampa do notebook com moldura */}
            <div className="bg-slate-900 dark:bg-black rounded-t-xl p-2 sm:p-3 shadow-2xl border-b-2 border-slate-700">
              <div className="bg-black rounded-md overflow-hidden">
                <img
                  src="https://picsum.photos/seed/klyro-dashboard/1200/650"
                  alt="Dashboard da Klyro"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Base inferior com notch */}
            <div className="relative bg-slate-800 h-5 rounded-b-xl shadow-inner">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-2 bg-slate-700 rounded-b-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
