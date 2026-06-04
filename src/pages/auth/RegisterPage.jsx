// RegisterPage.jsx
import { useState } from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [pseudo, setPseudo] = useState("");
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
      const { data } = await axios.post("http://localhost:8080/api/auth/register", {
        username: pseudo,
        email,
        password,
      });

      console.log("Inscription OK:", data);
      localStorage.setItem("token", data.data.token);

      // Add subtle delay for better UX
      setTimeout(() => navigate("/home"), 500);
    } catch (err) {
      console.error("Erreur:", err.response?.data);
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["auth-page"]}>
      {/* Animated background particles */}
      <div className={styles["bg-particles"]}>
        <div className={styles["particle"]}></div>
        <div className={styles["particle"]}></div>
        <div className={styles["particle"]}></div>
        <div className={styles["particle"]}></div>
        <div className={styles["particle"]}></div>
      </div>

      <div className={styles["auth-card"]}>
        {/* LEFT SIDE - Form */}
        <div className={styles["auth-form-side"]}>
          {/* Decorative ornate corners */}
          <div className={`${styles["ornate-corner"]} ${styles["corner-tl"]}`}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M10 2 L2 2 L2 10" stroke="#c49060" strokeWidth="2" fill="none"/>
              <path d="M15 5 L5 5 L5 15" stroke="#d4b896" strokeWidth="1" fill="none" opacity="0.5"/>
              <circle cx="4" cy="4" r="2" fill="#e8c080" opacity="0.6"/>
            </svg>
          </div>
          <div className={`${styles["ornate-corner"]} ${styles["corner-tr"]}`}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M50 2 L58 2 L58 10" stroke="#c49060" strokeWidth="2" fill="none"/>
              <path d="M45 5 L55 5 L55 15" stroke="#d4b896" strokeWidth="1" fill="none" opacity="0.5"/>
              <circle cx="56" cy="4" r="2" fill="#e8c080" opacity="0.6"/>
            </svg>
          </div>

          <div className={styles["brand"]}>
            <div className={styles["crown-icon"]}>
                        <img
                          className={styles["gc-logo-img"]}
                          src="./favicon.ico"
                          alt="Gondor Chic Logo"
                        />
            </div>
            <h2 className={styles["gc-title"]}>
              <span className={styles["gc-title-gondor"]}>G</span>ondor{" "}
              <span className={styles["gc-title-or"]}>or</span>{" "}
              <span className={styles["gc-title-chic"]}>Chic</span>
            </h2>
            <p className={styles["gc-subtitle"]}>« La Forge de la Montagne »</p>
            <div className={styles["gc-divider"]}>
              <span>✦</span>
            </div>
          </div>

          <div className={styles["form-wrapper"]}>
            <p className={styles["subtitle"]}>
              Rejoignez la cité et accédez aux trésors de la montagne.
              <span className={styles["title-underline"]}></span>
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles["field"]}>
                <label>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#c9a87a"/>
                    <path d="M0 16C0 11.5817 3.58172 8 8 8C12.4183 8 16 11.5817 16 16" fill="#c9a87a"/>
                  </svg>
                  Pseudo
                </label>
                <input
                  type="text"
                  placeholder="Votre pseudo..."
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  required
                />
                <div className={styles["field-glow"]}></div>
              </div>

              <div className={styles["field"]}>
                <label>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="4" width="12" height="10" rx="1.5" stroke="#c9a87a" fill="none"/>
                    <path d="M3 6L8 10L13 6" stroke="#c9a87a" fill="none"/>
                  </svg>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="nom@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className={styles["field-glow"]}></div>
              </div>

              <div className={styles["field"]}>
                <label>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="5" width="10" height="9" rx="1.5" stroke="#c9a87a" fill="none"/>
                    <path d="M5 5V4C5 2.34315 6.34315 1 8 1C9.65685 1 11 2.34315 11 4V5" stroke="#c9a87a" fill="none"/>
                    <circle cx="8" cy="9.5" r="1" fill="#c9a87a"/>
                    <path d="M8 10.5V12" stroke="#c9a87a" strokeWidth="0.8"/>
                  </svg>
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className={styles["password-strength"]}>
                  <div className={`${styles["strength-bar"]} ${password.length > 0 ? styles["active"] : ""}`}></div>
                  <div className={`${styles["strength-bar"]} ${password.length >= 6 ? styles["active"] : ""}`}></div>
                  <div className={`${styles["strength-bar"]} ${password.length >= 8 ? styles["active"] : ""}`}></div>
                </div>
                <div className={styles["field-glow"]}></div>
              </div>

              {error && (
                <div className={styles["gc-error"]}>
                  <span>⚠</span> {error}
                </div>
              )}

              <button type="submit" className={styles["gc-submit-btn"]} disabled={isLoading}>
                {isLoading ? (
                  <span className={styles["loading-spinner"]}></span>
                ) : (
                  "Créer un compte"
                )}
              </button>
            </form>

            <div className={styles["separator"]}>
              <span>ou</span>
            </div>

            <div className={styles["social-buttons"]}>
              <button className={styles["social-btn"]}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className={styles["social-btn"]}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.54-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
                </svg>
                Facebook
              </button>
            </div>

            <p className={styles["login-link"]}>
              Déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Showcase */}
        <div className={styles["auth-showcase"]}>
          <div className={styles["showcase-overlay"]}></div>
          <div className={styles["showcase-content"]}>
            <div className={styles["showcase-badge"]}>Collection Hiver 2025</div>
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
              <div className={styles["preview-header"]}>
                <div className={styles["preview-dots"]}>
                  <span></span><span></span><span></span>
                </div>
                <div className={styles["preview-search"]}>
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <circle cx="6" cy="6" r="4" stroke="#d4b896" fill="none"/>
                    <line x1="9" y1="9" x2="12.5" y2="12.5" stroke="#d4b896" strokeWidth="1.2"/>
                  </svg>
                </div>
              </div>
              <div className={styles["preview-grid"]}>
                <div className={styles["preview-item"]}>
                  <div className={styles["preview-gem"]}></div>
                </div>
                <div className={styles["preview-item"]}>
                  <div className={styles["preview-ring"]}></div>
                </div>
                <div className={styles["preview-item"]}>
                  <div className={styles["preview-necklace"]}></div>
                </div>
                <div className={styles["preview-item"]}>
                  <div className={styles["preview-earring"]}></div>
                </div>
              </div>
              <div className={styles["preview-footer"]}>
                <span>✨ Nouveautés</span>
              </div>
            </div>

            <div className={styles["testimonial"]}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M10 12 L6 12 L6 8 L10 8 Z" fill="#d4b896" opacity="0.5"/>
                <path d="M24 12 L20 12 L20 8 L24 8 Z" fill="#d4b896" opacity="0.5"/>
              </svg>
              <p>"Des bijoux d'une qualité exceptionnelle, forgés avec un savoir-faire ancestral."</p>
              <div className={styles["testimonial-author"]}>— Éléonore de Minas Tirith</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}