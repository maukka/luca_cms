import React from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {

  const { loginWithGoogle } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Luca Content Management System</h1>
        <p className={styles.subtitle}>Login to upload your videos to different social media platforms.</p>
        <button onClick={loginWithGoogle} className={styles.googleBtn}>
          Continue with Google account
        </button>
      </div>
    </div>
  );
};