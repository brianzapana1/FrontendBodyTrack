import React from 'react';
import styles from '../Premium.module.css';

const Topbar = ({ onLogout }) => {
  return (
    <div className={styles.topbar}>
      <div className={styles.user}>
        <span className={styles.avatar}></span> Usuario x
      </div>
      <button className={styles.btnOutline} onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Topbar;
