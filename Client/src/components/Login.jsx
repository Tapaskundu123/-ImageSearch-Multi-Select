import React from 'react';
import { authService } from '../services/api';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Image Search App</h1>
        <p>Sign in to search and save your favorite images</p>
        
        <div className="login-buttons">
          <a href={authService.googleLogin()} className="login-btn google-btn">
            <span className="btn-icon">G</span>
            Continue with Google
          </a>
          
          <a href={authService.facebookLogin()} className="login-btn facebook-btn">
            <span className="btn-icon">f</span>
            Continue with Facebook
          </a>
          
          <a href={authService.githubLogin()} className="login-btn github-btn">
            <span className="btn-icon">⚡</span>
            Continue with GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;