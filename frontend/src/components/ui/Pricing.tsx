import React from "react";
import { CheckIcon } from "../../icons/CheckIcon";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";

interface PricingCardProps {
  plan: string;
  idealFor: string;
  price: string;
  priceDetails?: string;
  features: string[];
  isFeatured?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  idealFor,
  price,
  priceDetails = "/mês",
  features,
  isFeatured = false,
}) => {
  const cardClasses = isFeatured
    ? "bg-blue-100/50 dark:bg-blue-900/30 border-2 border-blue-500 relative"
    : "bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700";

  const buttonClasses = isFeatured
    ? "w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
    : "w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors";

  return (
    <div className={`p-8 rounded-2xl flex flex-col ${cardClasses}`}>
      {isFeatured && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Mais Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        {plan}
      </h3>
      <p className="mt-2 text-slate-500 dark:text-slate-400">{idealFor}</p>
      <div className="mt-6">
        <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
          {price}
        </span>
        {price.toLowerCase() !== "sob consulta" && (
          <span className="text-slate-500 dark:text-slate-400 ml-1">
            {priceDetails}
          </span>
        )}
      </div>
      <ul className="mt-8 space-y-4 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
            <span className="ml-3 text-slate-600 dark:text-slate-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button
        className={`mt-10 flex items-center justify-center gap-2 ${buttonClasses}`}
      >
        <span>Começar agora</span>
        <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

const Pricing: React.FC = () => {
  const plans = [
    {
      plan: "Starter",
      idealFor: "Pequenos negócios",
      price: "R$ 49",
      features: [
        "Até 200 documentos/mês",
        "IA de automação de compras",
        "Dashboard básico",
        "Suporte via email",
      ],
    },
    {
      plan: "Profissional",
      idealFor: "PMEs em crescimento",
      price: "R$ 149",
      isFeatured: true,
      features: [
        "Tudo do Starter",
        "Documentos ilimitados",
        "IA de crédito preditivo",
        "Simulações financeiras 'What-If'",
        "Suporte prioritário",
      ],
    },
    {
      plan: "Enterprise",
      idealFor: "Contadores e fintechs",
      price: "Sob consulta",
      priceDetails: "",
      features: [
        "Tudo do Profissional",
        "Acesso à API",
        "Modelo de IA personalizado",
        "Gerente de conta dedicado",
        "Onboarding e treinamento",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Planos flexíveis para o seu sucesso
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Escolha o plano que se adapta ao tamanho e às necessidades da sua
            operação. Cancele quando quiser.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
