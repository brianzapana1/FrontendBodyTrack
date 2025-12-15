import { useEffect, useState } from 'react';
import styles from './Auth.module.css';
import WelcomeView from './components/WelcomeView';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ProfileView from './components/ProfileView';
import PhysicalView from './components/PhysicalView';
import NudgeView from './components/NudgeView';
import ForgotView from './components/ForgotView';
import useReveal from '../../hooks/useReveal';

export default function Auth() {
  const [currentView, setCurrentView] = useState('welcome');
  const [title, setTitle] = useState('INICIAR SESIÓN');
  const [showSwitch, setShowSwitch] = useState(true);

  const showView = (viewId) => {
    setCurrentView(viewId);

    const titles = {
      welcome: 'INICIAR SESIÓN',
      login: 'INICIAR SESIÓN',
      'reg-create': 'CREAR UNA NUEVA CUENTA',
      nudge: '',
      'reg-profile': '¡BIENVENID@ A BODYTRACK!',
      physical: 'PERFIL FÍSICO',
      forgot: 'RECUPERAR ACCESO',
    };

    setTitle(titles[viewId] || '');
    setShowSwitch(['welcome'].includes(viewId));
  };

  // Partículas de fondo
  useEffect(() => {
    const stars = document.getElementById('stars');
    if (!stars) return;
    const N = 28;
    for (let i = 0; i < N; i++) {
      const dot = document.createElement('span');
      dot.className = styles.dot;
      const size = Math.random() * 2.2 + 1.2;
      dot.style.width = dot.style.height = `${size}px`;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.animationDuration = `${Math.random() * 12 + 10}s`;
      dot.style.animationDelay = `-${Math.random() * 10}s`;
      stars.appendChild(dot);
    }
  }, []);

  const toast = (msg = 'Listo ✅') => {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add(styles.show);
    setTimeout(() => t.classList.remove(styles.show), 2200);
  };

  return (
    <>
      <div className={styles.bg} aria-hidden="true"></div>
      <div className={styles.stars} id="stars" aria-hidden="true"></div>

      <main className={styles.wrap}>
        <section className={styles.card} aria-label="Cuadro de autenticación">
          <div className={styles.ring} aria-hidden="true"></div>

          <div className={styles.logo} aria-label="Logo Bodytrack"></div>
          {title && <h1 className={styles.title}>{title}</h1>}

          {showSwitch && (
            <p className={styles.switch}>
              ¿Eres nuevo?{' '}
              <a onClick={() => showView('reg-create')}>Crear una cuenta nueva</a>
            </p>
          )}

          <div className={styles.views}>
            <WelcomeView visible={currentView === 'welcome'} showView={showView} />
            <LoginView visible={currentView === 'login'} showView={showView} toast={toast} />

            {/*  
                🔥 Aquí ya no va directo a reg-profile  
                RegisterView ahora debe llamar showView("nudge") cuando el email es válido.
            */}
            <RegisterView
              visible={currentView === 'reg-create'}
              showView={showView}
              toast={toast}
            />

            <NudgeView
              visible={currentView === 'nudge'}
              showView={(next) => showView(next || 'reg-profile')}
            />

            <ProfileView visible={currentView === 'reg-profile'} showView={showView} />
            <PhysicalView visible={currentView === 'physical'} showView={showView} toast={toast} />
            <ForgotView visible={currentView === 'forgot'} showView={showView} toast={toast} />
          </div>
        </section>
      </main>

      <div className={styles.toast} id="toast" role="status" aria-live="polite">
        Listo ✅
      </div>
    </>
  );
}
