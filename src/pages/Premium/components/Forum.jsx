import React, { useState } from 'react';
import styles from './Premium.module.css';

const Forum = () => {
  const [forumMessages, setForumMessages] = useState([
    { user: 'Lucía', message: 'Mi rutina de hoy 💪', status: '✅' },
    { user: 'Carlos', message: '¿Consejos para hombro?', status: '✅' },
    { user: 'Ana', message: 'Receta alta en proteína', status: '✅' },
  ]);

  const handlePostMessage = () => {
    const message = document.getElementById('foroMsg').value;
    if (!message.trim()) return;
    setForumMessages([...forumMessages, { user: 'Tú', message, status: '✅' }]);
  };

  return (
    <section id="view-foro" className={styles.view}>
      <div className={styles.shell}>
        <div className={styles.ring} aria-hidden="true"></div>
        <h2 className={styles.centerTitle}>FORO DE LA COMUNIDAD BODYTRACK</h2>
        <div className={styles.board}>
          {forumMessages.map((msg, index) => (
            <div key={index} className={styles.post}>
              <span className={styles.user}>{msg.user}</span>
              <span>{msg.message}</span>
              <span>{msg.status}</span>
            </div>
          ))}
          <div className={styles.composer}>
            <input id="foroMsg" placeholder="Redactar mensaje…" />
            <button onClick={handlePostMessage}>Enviar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forum;
