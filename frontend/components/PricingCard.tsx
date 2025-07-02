
import React from 'react';
import type { Plan } from '../types';
import Button from './Button';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';


interface PricingCardProps {
  plan: Plan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const cardClasses = plan.isFeatured
    ? 'bg-gray-800 border-2 border-klyro-primary scale-105'
    : 'bg-gray-800/50 border border-gray-700';

  return (
    <div className={`relative p-8 rounded-xl shadow-lg flex flex-col h-full ${cardClasses} transition-transform duration-300`}>
      {plan.isFeatured && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <span className="bg-klyro-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase">Mais Popular</span>
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
      <div className="flex items-baseline text-white mb-6">
        <span className="text-4xl font-extrabold">{plan.price}</span>
        <span className="ml-2 text-gray-400">/ {plan.period}</span>
      </div>
      <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircleIcon className="w-5 h-5 text-klyro-secondary mr-3 mt-1 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant={plan.isFeatured ? 'primary' : 'outline'} className="w-full mt-auto">
        Começar agora
      </Button>
    </div>
  );
};

export default PricingCard;
