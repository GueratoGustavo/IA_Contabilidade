import React from "react";
import { CheckIcon } from "../../icons/CheckIcon";

const TestimonialCard: React.FC<{
  quote: string;
  author: string;
  company: string;
}> = ({ quote, author, company }) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
    <p className="text-slate-600 dark:text-slate-300 italic">"{quote}"</p>
    <div className="mt-6 flex items-center">
      <img
        className="w-12 h-12 rounded-full object-cover"
        src={`https://picsum.photos/100/100?random=${Math.random()}`}
        alt={author}
      />
      <div className="ml-4">
        <p className="font-bold text-slate-900 dark:text-white">{author}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{company}</p>
      </div>
    </div>
  </div>
);

const SocialProof: React.FC = () => {
  return (
    <section
      id="social-proof"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Confiança que gera resultados
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Empresas e contadores já estão otimizando suas finanças com a Klyro.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="A automação de pedidos nos economizou 20 horas por semana. Inacreditável!"
            author="Juliana Costa"
            company="CEO, Distribuidora Veloz"
          />
          <TestimonialCard
            quote="A análise de crédito preditiva da Klyro é revolucionária. Reduzimos a inadimplência em 40%."
            author="Marcos Andrade"
            company="CFO, TechFin Soluções"
          />
          <TestimonialCard
            quote="Finalmente uma ferramenta que integra compras e financeiro de forma inteligente. Essencial para PMEs."
            author="Beatriz Lima"
            company="Contadora, Contabilize Já"
          />
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 bg-blue-100/50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold px-6 py-3 rounded-full">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <span>+90% de acurácia no score de crédito preditivo</span>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-center text-slate-500 dark:text-slate-400 font-semibold">
            Testado e aprovado por empresas líderes do setor
          </p>
          <div className="mt-8 flex justify-center items-center gap-8 md:gap-12 flex-wrap">
            <img
              src="https://via.placeholder.com/150x40/9ca3af/4b5563.png?text=Empresa+A"
              alt="Logo Empresa A"
              className="h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition"
            />
            <img
              src="https://via.placeholder.com/150x40/9ca3af/4b5563.png?text=Contábil+B"
              alt="Logo Contábil B"
              className="h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition"
            />
            <img
              src="https://via.placeholder.com/150x40/9ca3af/4b5563.png?text=Fintech+C"
              alt="Logo Fintech C"
              className="h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition"
            />
            <img
              src="https://via.placeholder.com/150x40/9ca3af/4b5563.png?text=Varejo+D"
              alt="Logo Varejo D"
              className="h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition"
            />
            <img
              src="https://via.placeholder.com/150x40/9ca3af/4b5563.png?text=Indústria+E"
              alt="Logo Indústria E"
              className="h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
