import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginWithProvider = (provider: any) => {
    signInWithPopup(auth, provider).catch((err) => setError(err.message));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      setError(err.message)
    );
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop playsInline className="video-bg">
        <source src="/videos/prueba.mp4" type="video/mp4" />
        Tu navegador no soporta video en HTML5.
      </video>

      <div className="login-overlay"></div>

      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">Iniciar Sesión</h2>
          {error && <p className="login-error">{error}</p>}
          <input
            className="login-input"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">
            Entrar
          </button>
          <div className="login-forgot">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="login-providers">
            <button
              className="provider-button google-button"
              onClick={() => loginWithProvider(new GoogleAuthProvider())}
              type="button"
            >
              Iniciar con Google
            </button>
            <button
              className="provider-button facebook-button"
              onClick={() => loginWithProvider(new FacebookAuthProvider())}
              type="button"
            >
              Iniciar con Facebook
            </button>
            <button
              className="provider-button apple-button"
              onClick={() => loginWithProvider(new OAuthProvider("apple.com"))}
              type="button"
            >
              Iniciar con Apple
            </button>
          </div>
          <p className="login-signup">
            ¿No tienes cuenta? <a href="/signup">Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
