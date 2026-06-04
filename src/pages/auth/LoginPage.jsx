import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      console.log("Login OK:", data);
      localStorage.setItem("token", data.data.token);

      navigate("/home");

    } catch (err) {
      console.error("Erreur:", err.response?.data);
      setError(err.response?.data?.message || "Identifiant ou mot de passe incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["gc-overlay"]}>
      <div className={styles["gc-card"]}>
        <span className={`${styles["gc-cross"]} ${styles["gc-cross--tl"]}`} />
        <span className={`${styles["gc-cross"]} ${styles["gc-cross--tr"]}`} />
        <span className={`${styles["gc-cross"]} ${styles["gc-cross--bl"]}`} />
        <span className={`${styles["gc-cross"]} ${styles["gc-cross--br"]}`} />

        <div className={styles["gc-header"]}>
          <h1 className={styles["gc-title"]}>
            <span className={styles["gc-title-gondor"]}>G</span>ondor{" "}
            <span className={styles["gc-title-of"]}>or</span>{" "}
            <span className={styles["gc-title-chic"]}>Chic</span>
          </h1>
          <p className={styles["gc-subtitle"]}>« La Forge de la Montagne »</p>
          <div className={styles["gc-divider"]} />
        </div>

        <form className={styles["gc-form"]} onSubmit={handleSubmit}>
          <div className={styles["gc-field"]}>
            <label className={styles["gc-label"]} htmlFor="email">Email</label>
            <input
              id="email"
              className={styles["gc-input"]}
              type="email"
              placeholder="Votre email nain..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles["gc-field"]}>
            <label className={styles["gc-label"]} htmlFor="password">Mot de passe</label>
            <input
              id="password"
              className={styles["gc-input"]}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className={styles["gc-error"]}>{error}</p>}

          <button 
            className={`${styles["gc-button"]} ${isLoading ? styles["gc-button--loading"] : ""}`} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "S'identifier"}
          </button>

          <p className={styles["gc-register"]}>
            Pas encore de compte ?{" "}
            <Link to="/register" className={styles["gc-register-link"]}>
              S'enregistrer
            </Link>
          </p>
        </form>

        <footer className={styles["gc-footer"]}>
          <p>Grimthars • Forge-Cité</p>
          <p>Gouvernance de la Montagne</p>
        </footer>
      </div>
    </div>
  );
}