
import React from 'react';
import type { Plan } from '../types';
import PricingCard from '../components/PricingCard';

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'R$49.90',
    period: 'mês',
    features: [
      'Até 500 documentos/mês',
      'Ingestão automática (IA)',
      'Dashboard Analítico Básico',
      'Suporte via e-mail',
    ],
    isFeatured: false,
  },
  {
    name: 'Profissional',
    price: 'R$99.90',
    period: 'mês',
    features: [
      'Até 2000 documentos/mês',
      'Todos os recursos do Starter',
      'Simulações “What-If”',
      'Análise comportamental',
      'Suporte prioritário',
    ],
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contato',
    features: [
      'Documentos ilimitados',
      'Todos os recursos do Profissional',
      'Marketplace com leilão reverso',
      'Gerente de conta dedicado',
      'Integrações customizadas',
    ],
    isFeatured: false,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Planos flexíveis para o seu crescimento</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 mt-4">
            Escolha o plano que melhor se adapta ao tamanho e às necessidades do seu negócio.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
