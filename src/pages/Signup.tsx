import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Crear usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Actualizar el displayName del usuario
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      // 3. Redirigir a selección de perfiles
      navigate("/profiles");
    } catch (err: any) {
      setError(err.message);
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
        <form className="login-form" onSubmit={handleSignUp}>
          <h2 className="login-title">Regístrate</h2>
          {error && <p className="login-error">{error}</p>}

          <input
            className="login-input"
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="email"
            placeholder="Correo electrónico"
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
            Crear cuenta
          </button>

          <p className="login-signup">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
