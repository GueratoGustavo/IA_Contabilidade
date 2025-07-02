
import React from 'react';
import { ReceiptIcon } from '../icons/ReceiptIcon';
import { StoreIcon } from '../icons/StoreIcon';
import { CreditCardIcon } from '../icons/CreditCardIcon';
import { ChartBarIcon } from '../icons/ChartBarIcon';
import { BrainIcon } from '../icons/BrainIcon';

const features = [
  {
    icon: <ReceiptIcon className="w-8 h-8 text-klyro-primary" />,
    title: 'Ingestão Automática de Pedidos',
    description: 'Nossa IA lê e processa NF-es, pedidos e boletos de qualquer formato, eliminando a digitação manual.',
  },
  {
    icon: <StoreIcon className="w-8 h-8 text-klyro-primary" />,
    title: 'Marketplace com Leilão Reverso',
    description: 'Otimize suas compras e vendas com um sistema de leilão que garante sempre o melhor preço.',
  },
  {
    icon: <CreditCardIcon className="w-8 h-8 text-klyro-primary" />,
    title: 'Crédito Inteligente com IA',
    description: 'Análise de crédito preditiva para decisões mais rápidas e seguras, reduzindo a inadimplência.',
  },
  {
    icon: <ChartBarIcon className="w-8 h-8 text-klyro-primary" />,
    title: 'Simulações “What-If”',
    description: 'Projete cenários futuros e entenda o impacto de cada decisão no seu fluxo de caixa.',
  },
  {
    icon: <BrainIcon className="w-8 h-8 text-klyro-primary" />,
    title: 'Análise Comportamental',
    description: 'Entenda padrões de pagamento e negociação de clientes e fornecedores para otimizar suas estratégias.',
  },
];

const ValuePropositionSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Inteligência que trabalha por você</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 mt-4">
            Automação e IA para cada etapa do seu processo financeiro.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-klyro-primary hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-klyro-primary/10 p-3 rounded-full mr-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
