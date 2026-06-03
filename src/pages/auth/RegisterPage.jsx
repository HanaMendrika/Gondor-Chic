import { useState } from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/register", {
        username: pseudo,
        email,
        password,
      });

      console.log("Inscription OK:", data);
      localStorage.setItem("token", data.data.token);

      navigate("/home");

    } catch (err) {
      console.error("Erreur:", err.response?.data);
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className={styles["auth-page"]}>
      <div className={styles["auth-card"]}>

        {/* LEFT SIDE */}
        <div className={styles["auth-form-side"]}>

          {/* Decorative crosses */}
          <div className={`${styles["gc-cross"]} ${styles["gc-cross--tl"]}`}></div>
          <div className={`${styles["gc-cross"]} ${styles["gc-cross--tr"]}`}></div>

          <div className={styles["brand"]}>
            <h2 className={styles["gc-title"]}>
              <div>
                <span className={styles["gc-title-gondor"]}>G</span>ondor{" "}
                <span className={styles["gc-title-or"]}>or</span>{" "}
              </div>
              <span className={styles["gc-title-chic"]}>Chic</span>
            </h2>
            <p className={styles["gc-subtitle"]}>« La Forge de la Montagne »</p>
            <div className={styles["gc-divider"]} />
          </div>

          <div className={styles["form-wrapper"]}>
            <h1>Créer un compte</h1>
            <p className={styles["subtitle"]}>
              Rejoignez la cité et accédez aux trésors de la montagne.
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles["field"]}>
                <label>Pseudo</label>
                <input
                  type="text"
                  placeholder="Votre pseudo..."
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                />
              </div>

              <div className={styles["field"]}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="nom@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles["field"]}>
                <label>Mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className={styles["gc-error"]}>{error}</p>}

              <button type="submit" className={styles["gc-submit-btn"]}>
                Créer un compte
              </button>
            </form>

            <p className={styles["login-link"]}>
              Déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className={styles["auth-showcase"]}>
          <div className={styles["showcase-content"]}>
            <h2>
              Les plus belles créations
              <br />
              de la montagne.
            </h2>

            <p>
              Découvrez les bijoux forgés avec passion
              par les maîtres artisans de Gondor or Chic.
            </p>

            <div className={styles["preview-card"]}>
              <div className={styles["preview-header"]} />
              <div className={styles["preview-grid"]}>
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