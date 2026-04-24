import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import "./Dashboard.css";


export default function Dashboard() {
  return (
    <div className="dashboard-body">
      {/* SIDEBAR */}
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

      {/* MAIN */}
      <main className="content">
        <header className="topbar">
          <h3>Gestão de Solicitações</h3>
          <div className="user-info">
            Olá, <span>...</span> (<span>...</span>)
          </div>
        </header>

        {/* NOVA SOLICITAÇÃO */}
        <details>
          <summary>
            <span>
              <span className="material-icons" style={{ marginRight: 10 }}>
                add_circle
              </span>
              Nova Solicitação
            </span>
          </summary>

          <div className="details-content">
            <form>
              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <label>Item Necessário</label>
                  <select required></select>
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label>Quantidade</label>
                  <input type="number" min="1" defaultValue="1" required />
                </div>
              </div>

              <h4>Dados de Destino</h4>

              <div className="form-row">
                <div className="form-group">
                  <label>Unidade de Destino</label>
                  <select required>
                    <option value="">Selecione...</option>
                    <option>Sede Administrativa</option>
                    <option>Almoxarifado Central</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Setor de Destino</label>
                  <input type="text" required />
                </div>
              </div>

              <div className="form-group">
                <label>Nome do Recebedor</label>
                <input type="text" required />
              </div>

              <div className="form-group">
                <label>Observações</label>
                <input type="text" />
              </div>

              <div style={{ textAlign: "right" }}>
                <button type="submit">Confirmar Solicitação</button>
              </div>
            </form>
          </div>
        </details>

        {/* TABELA */}
        <div className="workspace">
          <h2>Acompanhamento</h2>

          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th>Data/Hora</th>
                  <th>Item</th>
                  <th>Qtd</th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Solicitante</th>
                  <th>Recebedor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {/* dados aqui */}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL */}
      <div className="modal-overlay" style={{ display: "none" }}>
        <div className="modal-content">
          <h3>Gerenciar Solicitação</h3>

          <form>
            <div className="form-group">
              <label>Status</label>
              <select required>
                <option value="pendente">Pendente</option>
                <option value="concluido">Concluído</option>
                <option value="recusado">Recusado</option>
              </select>
            </div>

            <div className="form-group">
              <label>Observação</label>
              <textarea rows="3" />
            </div>

            <div className="modal-actions">
              <button type="button">Cancelar</button>
              <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
