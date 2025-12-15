import React from 'react';
import styles from './Premium.module.css';

const WeekRoutines = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const openDay = (day) => {
    // Aquí se abre la rutina del día
  };

  return (
    <section id="view-rutinas" className={styles.view}>
      <div className={styles.shell}>
        <div className={styles.ring} aria-hidden="true"></div>
        <h2 className={styles.centerTitle}>ENTRENAMIENTO DE LA SEMANA</h2>
        <div className={styles.week}>
          {days.map((day) => (
            <div key={day} className={styles.day} onClick={() => openDay(day)}>
              {day}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeekRoutines;
