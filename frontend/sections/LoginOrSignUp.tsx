import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { GoogleIcon } from "../icons";

const LoginOrSignUp: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setError("");
  }, [isLoginView]);

  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Por favor, preencha o e-mail e a senha.");
      return;
    }
    if (!isLoginView && formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (!isLoginView && !formData.name) {
      setError("Por favor, preencha seu nome.");
      return;
    }

    console.log("Form submitted", { isLoginView, formData });
  };

  return (
    <div className="bg-klyro-dark min-h-screen">
      {/* Header fixo */}
      <Header />

      {/* Conteúdo centralizado abaixo do header */}
      <div className="flex justify-center items-center px-4 py-20 min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-slate-800/60 rounded-xl shadow-2xl backdrop-blur-lg border border-slate-700 mt-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              {isLoginView ? "Acesse sua Conta" : "Crie sua Conta"}
            </h1>
            <p className="mt-2 text-gray-400">
              {isLoginView
                ? "Bem-vindo de volta!"
                : "Comece a sua jornada conosco."}
            </p>
          </div>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-center space-x-2"
          >
            <GoogleIcon />
            <span>Continuar com Google</span>
          </Button>

          <div className="flex items-center space-x-2">
            <div className="flex-grow h-px bg-slate-600"></div>
            <span className="text-gray-400 text-sm">OU</span>
            <div className="flex-grow h-px bg-slate-600"></div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLoginView && (
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-300 block mb-2"
                >
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-klyro-primary text-white"
                  required
                />
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block mb-2"
              >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-klyro-primary text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block mb-2"
              >
                Senha
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-klyro-primary text-white"
                required
              />
            </div>
            {!isLoginView && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-300 block mb-2"
                >
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-klyro-primary text-white"
                  required
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <Button type="submit" variant="primary" className="w-full">
              {isLoginView ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              {isLoginView ? "Não tem uma conta?" : "Já tem uma conta?"}
              <button
                onClick={handleToggleView}
                className="font-medium text-klyro-primary hover:underline ml-1"
              >
                {isLoginView ? "Crie uma" : "Faça login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOrSignUp;
