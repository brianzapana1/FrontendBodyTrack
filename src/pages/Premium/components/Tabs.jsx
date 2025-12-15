import React from 'react';
import styles from '../Premium.module.css';

const Tabs = ({ view, setView }) => {
  const tabs = [
    { label: 'Inicio', viewId: 'view-dashboard' },
    { label: 'Perfil', viewId: 'view-perfil' },
    { label: 'Foro', viewId: 'view-foro' },
    { label: 'Entrenador', viewId: 'view-entrenador' },
    { label: 'Pagos', viewId: 'view-pagos' },
    { label: 'Logros y Objetivos', viewId: 'view-objetivos' },
    { label: 'Rutinas', viewId: 'view-rutinas' },
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.viewId}
          className={`${styles.tab} ${view === tab.viewId ? styles.active : ''}`}
          onClick={() => setView(tab.viewId)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
