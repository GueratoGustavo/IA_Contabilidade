import React from "react";
import { ShieldCheck, Lock, Eye } from "lucide-react"; // Lucide para ícones modernos

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-klyro-blue" />,
    title: "Criptografia Avançada",
    description:
      "Seus dados são protegidos com criptografia AES-256 de nível militar, tanto em trânsito quanto em repouso.",
  },
  {
    icon: <Lock className="w-10 h-10 text-klyro-blue" />,
    title: "Conformidade Legal",
    description:
      "A Klyro está em conformidade com LGPD e GDPR, garantindo privacidade e segurança jurídica.",
  },
  {
    icon: <Eye className="w-10 h-10 text-klyro-blue" />,
    title: "Monitoramento Contínuo",
    description:
      "Nossa infraestrutura é monitorada 24/7 por sistemas automatizados e equipe especializada.",
  },
];

const SecurityTrustSection: React.FC = () => {
  return (
    <section className="py-20 bg-klyro-dark-bg text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Segurança e Confiança
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Nosso compromisso é com a proteção total dos seus dados. Oferecemos
          uma infraestrutura robusta e compliance com os padrões mais exigentes
          do mercado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-klyro-dark-card border border-klyro-dark-border rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-klyro-blue/10 transition-all"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityTrustSection;
