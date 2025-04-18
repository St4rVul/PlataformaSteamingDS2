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
import { useNavigate } from "react-router-dom"; // Importación faltante

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicialización faltante

  const loginWithProvider = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/profiles"); // Redirige a selección de perfiles
    } catch (err: unknown) {
      // Mejor manejo de tipos TypeScript
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profiles"); // Redirige a selección de perfiles
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    }
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
              <img
                src="/icons/google-icon.svg"
                alt="Google"
                className="provider-icon"
              />
              Iniciar con Google
            </button>
            <button
              className="provider-button facebook-button"
              onClick={() => loginWithProvider(new FacebookAuthProvider())}
              type="button"
            >
              <img
                src="/icons/facebook-icon.svg"
                alt="Facebook"
                className="provider-icon"
              />
              Iniciar con Facebook
            </button>
            <button
              className="provider-button apple-button"
              onClick={() => loginWithProvider(new OAuthProvider("apple.com"))}
              type="button"
            >
              <img
                src="/icons/apple-icon.svg"
                alt="Apple"
                className="provider-icon"
              />
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
