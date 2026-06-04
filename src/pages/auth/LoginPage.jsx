import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      // data.data contient l'AuthResponse (token, etc.)
      console.log("Login OK:", data);
      localStorage.setItem("token", data.data.token);

      navigate("/home");

    } catch (err) {
      console.error("Erreur:", err.response?.data);
      setError(err.response?.data?.message || "Identifiant ou mot de passe incorrect.");
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
            <label className="gc-label" htmlFor="email">Email</label>
            <input
              id="email"
              className="gc-input"
              type="email"
              placeholder="Votre email nain..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
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

          <p className="gc-register">
            Pas encore de compte ?{" "}
            <Link to="/register" className="gc-register-link">
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