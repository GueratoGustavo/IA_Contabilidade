import React, { useState } from "react";

const LeadCaptureSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Lead captured:", formData);
    alert("Obrigado! Em breve um de nossos especialistas entrará em contato.");
    setFormData({ name: "", email: "", company: "" });
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#0A101E",
        padding: "5rem 0",
        color: "#FFFFFF",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <div
          style={{
            backgroundColor: "#121A2A",
            border: "1px solid #222B3F",
            borderRadius: "1rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Texto lateral */}
          <div style={{ flex: 1 }}>
            <h2
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#0D63F3" }}
            >
              Revolucione seu financeiro com IA
            </h2>
            <p
              style={{ marginTop: "1rem", fontSize: "1rem", color: "#A0AEC0" }}
            >
              Preencha os dados abaixo e um especialista da Klyro entrará em
              contato para uma demonstração personalizada.
            </p>
          </div>

          {/* Formulário */}
          <div style={{ flex: 1 }}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
                style={{
                  width: "100%",
                  backgroundColor: "#1A1F2E",
                  border: "1px solid #222B3F",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  color: "#FFFFFF",
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Seu e-mail corporativo"
                required
                style={{
                  width: "100%",
                  backgroundColor: "#1A1F2E",
                  border: "1px solid #222B3F",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  color: "#FFFFFF",
                }}
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Empresa ou CNPJ"
                required
                style={{
                  width: "100%",
                  backgroundColor: "#1A1F2E",
                  border: "1px solid #222B3F",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  color: "#FFFFFF",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#0D63F3",
                  color: "#FFFFFF",
                  fontWeight: "500",
                  padding: "0.75rem",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0A4CC7")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0D63F3")
                }
              >
                Quero falar com um especialista
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;
