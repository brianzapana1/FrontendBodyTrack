import React, { useState } from 'react';
import styles from './Premium.module.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    lastName: '',
    username: '',
    birthDate: '',
    height: '',
    weight: '',
    country: '',
    email: '',
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <section id="view-perfil" className={styles.view}>
      <div className={styles.shell}>
        <div className={styles.ring} aria-hidden="true"></div>
        <h2 className={styles.centerTitle}>MI PERFIL</h2>
        <div className={styles.shellLight}>
          <div className={styles.formGrid}>
            {Object.keys(profileData).map((key) => (
              <div key={key} className={styles.field}>
                <label className={styles.pill}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  name={key}
                  value={profileData[key]}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              </div>
            ))}
          </div>
          <div className={styles.row} style={{ justifyContent: 'space-between', marginTop: '18px' }}>
            <div className={styles.photoUploader}>Agregar/cambiar foto</div>
            <button className={styles.btn}>Actualizar datos</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
