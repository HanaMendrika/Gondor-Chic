import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pseudo === "pseudo" && password === "password") {
      setError("");
      navigate("/home");
    } else {
      setError("Identifiant ou mot de passe incorrect.");
    }
  };

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

          <p className={styles["gc-register"]}>
            Pas encore de compte ?{" "}
            <Link to="/register" className={styles["gc-register-link"]}>
              S'enregistrer
            </Link>
          </p>

        </form>




        <footer className="gc-footer">
          <p>Grimthars • Forge-Cité</p>
          <p>Gouvernance de la Montagne</p>
        </footer>
      </div>
    </div>
  );
}