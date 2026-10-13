import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { UploadPage } from './pages/UploadPage';

// Eriillinen alikomponentti, jotta päästään käsiksi AuthContextin arvoihin (useAuth)
const MainContent: React.FC = () => {
  const { user, loading } = useAuth();

  // Näytetään latausnäkymä, kunnes kirjautumistila on tarkistettu backendistä
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'system-ui, sans-serif'
      }}>
        Ladataan sovellusta...
      </div>
    );
  }

  // Jos käyttäjä on kirjautunut, näytetään UploadPage, muuten LoginPage
  return user ? <UploadPage /> : <LoginPage />;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

export default App;