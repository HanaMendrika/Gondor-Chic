import React, { useState } from "react";
import "./Style.css";
import Home from "../client/ShopPage";

export default function LoginPage() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pseudo === "pseudo" && password === "password") {
      setError("");
      setLoggedIn(true);
    } else {
      setError("Identifiant ou mot de passe incorrect.");
    }
  };

  if (loggedIn) return <Home onLogout={() => setLoggedIn(false)} />;

  return (
    <div className="gc-overlay">
      <div className="gc-card">
        <span className="gc-cross gc-cross--tl" />
        <span className="gc-cross gc-cross--tr" />
        <span className="gc-cross gc-cross--bl" />
        <span className="gc-cross gc-cross--br" />

        <div className="gc-header">
          <h1 className="gc-title">
            <span className="gc-title-gondor">G</span>ondor{" "}
            <span className="gc-title-of">or</span>{" "}
            <span className="gc-title-chic">Chic</span>
          </h1>
          <p className="gc-subtitle">« La Forge de la Montagne »</p>
          <div className="gc-divider" />
        </div>

        <form className="gc-form" onSubmit={handleSubmit}>
          <div className="gc-field">
            <label className="gc-label" htmlFor="pseudo">Pseudo</label>
            <input
              id="pseudo"
              className="gc-input"
              type="text"
              placeholder="Votre identifiant nain..."
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="gc-field">
            <label className="gc-label" htmlFor="password">Mot de passe</label>
            <input
              id="password"
              className="gc-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="gc-error">{error}</p>}

          <button className="gc-button" type="submit">S'identifier</button>
        </form>

        <footer className="gc-footer">
          <p>Grimthars • Forge-Cité</p>
          <p>Gouvernance de la Montagne</p>
        </footer>
      </div>
    </div>
  );
}