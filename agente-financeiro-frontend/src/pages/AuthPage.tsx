import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:4000";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        const res = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Erro no login");
          return;
        }

        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        const res = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Erro no cadastro");
          return;
        }

        setIsLogin(true);
        alert("Cadastro realizado com sucesso. Agora faça login.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <div
      className="container is-flex is-justify-content-center is-align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="box" style={{ width: "400px" }}>
        <h1 className="title has-text-centered">
          {isLogin ? "Login" : "Cadastro"}
        </h1>

        {error && <div className="notification is-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="field">
              <label className="label">Nome</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Senha</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mt-5">
            <div className="control">
              <button type="submit" className="button is-fullwidth is-link">
                {isLogin ? "Entrar" : "Cadastrar"}
              </button>
            </div>
          </div>
        </form>

        <p className="has-text-centered mt-4">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <a
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            style={{ cursor: "pointer" }}
          >
            {isLogin ? "Cadastre-se" : "Faça login"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
