import React, { useState } from "react";
import "./RegisterPage.css";
import "./Style.css";


export default function RegisterPage() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      pseudo,
      email,
      password,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* LEFT SIDE */}
        <div className="auth-form-side">

          <div className="brand">
            <h2 className="gc-title">
                <div>
                    <span className="gc-title-gondor">G</span>ondor{" "}
                    <span className="gc-title-of">or</span>{" "}
                </div>
                <span className="gc-title-chic">Chic</span>
            </h2>
                <p className="gc-subtitle">« La Forge de la Montagne »</p>
                <div className="gc-divider" />
          </div>

          <div className="form-wrapper">
            <h1>Créer un compte</h1>
            <p className="subtitle">
              Rejoignez la cité et accédez aux trésors de la montagne.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Pseudo</label>
                <input
                  type="text"
                  placeholder="Votre pseudo..."
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="nom@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit">
                Créer un compte
              </button>
            </form>

            <p className="login-link">
              Déjà un compte ? <a href="#">Se connecter</a>
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="auth-showcase">
          <div className="showcase-content">
            <h2>
              Les plus belles créations
              <br />
              de la montagne.
            </h2>

            <p>
              Découvrez les bijoux forgés avec passion
              par les maîtres artisans de Gondor or Chic.
            </p>

            <div className="preview-card">
              <div className="preview-header" />

              <div className="preview-grid">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}