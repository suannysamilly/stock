import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient";

import "..//App.css";


function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    unidade: "",
    setor: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSwitch(e) {
    e.preventDefault();
    navigate("/");
  }

  async function handleSubmit(e) {
  e.preventDefault();

  // 1. cria usuário
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.senha,
  });

  if (error) {
    console.log("Erro no cadastro:", error.message);
    return;
  }

  // 🔥 2. FAZ LOGIN (ESSENCIAL)
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.senha,
    });

  if (loginError) {
    console.log("Erro no login automático:", loginError.message);
    return;
  }

  const user = loginData.user;

  if (!user) {
    console.log("Usuário não autenticado");
    return;
  }

  // 🔥 3. garante que existe no banco
  const { data: existing } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!existing) {
    const { error: insertError } = await supabase
      .from("users")
      .insert({ id: user.id });

    if (insertError) {
      console.log("Erro ao criar user:", insertError.message);
      return;
    }
  }

  // 🔥 4. agora atualiza
  const { error: updateError } = await supabase
    .from("users")
    .update({
      name: form.nome,
      unit: form.unidade,
      sector: form.setor,
    })
    .eq("id", user.id);

  if (updateError) {
    console.log("Erro ao atualizar dados:", updateError.message);
    return;
  }

  console.log("Cadastro completo!");

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
          <h2 className="form-title">Novo Cadastro</h2>

          <div className="input-group-first">
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome completo"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <select name="unidade" onChange={handleChange} required>
                <option value="">UNIDADE</option>
                <option value="SEDE">SEDE ADMINISTRATIVA (SES/PE)</option>
                <option value="FUSAM">FUSAM</option>
              </select>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="setor"
                placeholder="Setor"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group-last">
            <input
              type="password"
              name="senha"
              placeholder="Crie uma senha segura"
              onChange={handleChange}
              required
            />

            <div className="bottom-link">
              <p>
                Já possui conta?{" "}
                <a href="#" onClick={handleSwitch}>
                  Realizar Login
                </a>
              </p>
            </div>
          </div>

          <div className="btn-container">
            <button type="submit" className="btn-entrar">
              Confirmar Cadastro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;