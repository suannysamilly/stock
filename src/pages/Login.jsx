import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient";

import "..//App.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSwitch(e) {
    e.preventDefault();
    navigate("/cadastro");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.senha,
    });

    if (error) {
      console.log("Erro:", error.message);
      alert("E-mail ou senha incorreto");
      return;
    }

    if (!data?.user) {
      console.log("Sem usuário");
      return;
    }

    // 🔥 NÃO FAZ INSERT AQUI
    // trigger já cuidou disso

    navigate("/dashboard");
  }

  return (
    <div className="main-container">
      <div className="left-panel">
        <div className="content-wrapper">
          <img src="/logo-pe.png" alt="Logo SES/PE" className="logo" />
          <h1 className="title">GESTÃO DE ESTOQUE</h1>
        </div>
      </div>

      <div className="right-panel">
        <form className="form-content" onSubmit={handleSubmit}>
          <h2 className="form-title">Login</h2>

          <div className="input-group-first">
            <input
              type="email"
              name="email"
              placeholder="Usuário"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group-last">
            <input
              type="password"
              name="senha"
              placeholder="••••••••••"
              onChange={handleChange}
              required
            />

            <div className="bottom-link">
              <p>
                Não possui conta?{" "}
                <a href="#" onClick={handleSwitch}>
                  Criar cadastro
                </a>
              </p>
            </div>
          </div>

          <div className="btn-container">
            <button type="submit" className="btn-entrar">
              ENTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;