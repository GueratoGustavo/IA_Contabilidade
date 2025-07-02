import React, { useState } from "react";

const faqs = [
  {
    question: "Como a Klyro garante a precisão da classificação?",
    answer:
      "Utilizamos algoritmos avançados de machine learning combinados com validação humana para garantir 90% de acurácia em nossos modelos.",
  },
  {
    question: "Quais dados são protegidos na plataforma?",
    answer:
      "Todos os dados financeiros e pessoais são criptografados em trânsito e repouso, seguindo as melhores práticas do mercado.",
  },
  {
    question: "Posso integrar a Klyro com meu ERP atual?",
    answer:
      "Sim! Temos integrações prontas para os principais ERPs do mercado, além de APIs para customizações específicas.",
  },
  {
    question: "Como funciona o suporte em caso de dúvidas ou problemas?",
    answer:
      "Oferecemos suporte via chat, e-mail e telefone, com atendimento prioritário para clientes empresariais.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Perguntas Frequentes
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-6 cursor-pointer select-none"
              onClick={() => toggleIndex(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleIndex(index);
              }}
            >
              <h3 className="text-xl font-semibold flex justify-between items-center">
                {faq.question}
                <span
                  className={`ml-4 text-klyro-secondary transform transition-transform duration-300 ease-in-out ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </h3>
              {openIndex === index && (
                <p id={`faq-answer-${index}`} className="mt-4 text-gray-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
