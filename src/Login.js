import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuario = {
      email,
      token: 'fake-jwt-token',
      ultimoLogin: new Date().toISOString()
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        <div className="login-links">
          <a href="#">Esqueceu a senha?</a>
          <a href="#">Criar conta</a>
        </div>
      </div>
    </div>
  );
}

export default Login;