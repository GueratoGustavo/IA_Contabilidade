import React from "react";
import { DocumentTextIcon } from "../../icons/DocumentTextIcon";
import { BuildingStorefrontIcon } from "../../icons/BuildingStorefrontIcon";
import { CreditCardIcon } from "../../icons/CreditCardIcon";
import { ChartBarIcon } from "../../icons/ChartBarIcon";
import { UsersIcon } from "../../icons/UsersIcon";
import { SparklesIcon } from "../../icons/SparklesIcon";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800">
    <div className="flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg mb-4 border border-slate-200 dark:border-slate-600">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-slate-500 dark:text-slate-400">{description}</p>
  </div>
);

const ValueProposition: React.FC = () => {
  const features = [
    {
      icon: (
        <DocumentTextIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      ),
      title: "Ingestão Automática de Pedidos",
      description:
        "Integração via ERP para processar pedidos automaticamente, eliminando entrada manual.",
    },
    {
      icon: (
        <BuildingStorefrontIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      ),
      title: "Marketplace com Leilão Reverso",
      description:
        "Fornecedores competem para oferecer o melhor preço, garantindo economia máxima.",
    },
    {
      icon: (
        <CreditCardIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      ),
      title: "Carteira de Crédito com IA",
      description:
        "IA preditiva que analisa e otimiza sua carteira de crédito, reduzindo riscos.",
    },
    {
      icon: (
        <ChartBarIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      ),
      title: "Simulações Financeiras 'What-If'",
      description:
        "Projete cenários futuros e tome decisões baseadas em dados com nossas simulações.",
    },
    {
      icon: <UsersIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      title: "Análise de Comportamento",
      description:
        "Entenda padrões de clientes e fornecedores para negociações mais inteligentes.",
    },
    {
      icon: (
        <SparklesIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      ),
      title: "Inteligência Preditiva",
      description:
        "Nossa IA aprende com seu fluxo de caixa para prever necessidades e oportunidades.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Uma plataforma, controle total.
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            A Klyro analisa seu fluxo de compras, negociações e crédito em tempo
            real, aprendendo com o comportamento de clientes e fornecedores.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
