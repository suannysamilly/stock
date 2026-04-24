import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import "./Dashboard.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      // pega usuário logado
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      // busca dados na sua tabela
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.log(error);
      } else {
        setUserData(data);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="container">
      <div className="left-container">
<aside className="sidebar">
        <div className="logo-area">
          <img src="/img/logo-pe.png" alt="Logo SES/PE" className="sidebar-logo" />
        </div>

        <div className="app-title">
          <h2>Gestão de Estoque</h2>
        </div>

        <nav>
          <button id="menuEstoque">
            <span className="material-icons">inventory_2</span>
            Estoque
          </button>

          <button
            id="menuMeusPedidos"
            style={{ display: "none" }}
            onClick={() => (window.location.href = "requests.html")}
          >
            <span className="material-icons">pending_actions</span>
            Acompanhar Pedidos
          </button>

          <button id="menuSolicitacoes" className="active">
            <span className="material-icons">assignment</span>
            Solicitações
          </button>

          <button id="menuUsuarios">
            <span className="material-icons">group</span>
            Usuários
          </button>
        </nav>

        <div className="logout-area">
          <button id="btnLogout">
            <span className="material-icons">logout</span>
            Sair
          </button>
        </div>
      </aside>


      </div>

      <div className="top-container">


      </div>
        <div className="dashboard-container">


      </div>

      <div className="bottom-container">

      </div>
    </div>  
  );
}

export default Dashboard;