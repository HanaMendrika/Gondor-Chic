import React from "react";
import "./Style.css";

export default function ShopPage({ onLogout }) {
  return (
    <div className="gc-overlay">
      <div className="gc-card">
        <span className="gc-cross gc-cross--tl" />
        <span className="gc-cross gc-cross--tr" />
        <span className="gc-cross gc-cross--bl" />
        <span className="gc-cross gc-cross--br" />

        <div className="gc-header">
          <h1 className="gc-title">
            <span className="gc-title-gondor">B</span>ienvenue
          </h1>
          <p className="gc-subtitle">« Accès accordé, Forgeron »</p>
          <div className="gc-divider" />
        </div>

        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <p className="gc-subtitle">Vous êtes connecté à la Forge-Cité.</p>
        </div>

        <button className="gc-button" onClick={onLogout}>
          Se déconnecter
        </button>

        <footer className="gc-footer">
          <p>Grimthars • Forge-Cité</p>
          <p>Gouvernance de la Montagne</p>
        </footer>
      </div>
    </div>
  );
}