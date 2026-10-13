import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './UploadPage.module.css';

export const UploadPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const res = await fetch('http://localhost:3000/api/videos/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (res.ok) {
        alert('Video ladattu onnistuneesti!');
        setSelectedFile(null);
      } else {
        alert('Videon lataus epäonnistui.');
      }
    } catch (err) {
      console.error('Latausvirhe:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 style={{ margin: 0 }}>Videostudio</h2>
        <div className={styles.userSection}>
          {user?.picture && <img src={user.picture} alt="Profiili" className={styles.avatar} />}
          <span>{user?.name || user?.email}</span>
          <button onClick={logout} className={styles.logoutBtn}>Ulos</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.uploadCard}>
          <h3>Lataa uusi video</h3>
          <form onSubmit={handleUpload}>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className={styles.submitBtn}
            >
              {uploading ? 'Ladataan...' : 'Lähetä video'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};