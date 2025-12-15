import { useEffect, useState } from 'react';
import styles from './Pago.module.css';
import Step1Contact from './components/Step1Contact';
import Step2Payment from './components/Step2Payment';
import Step3Card from './components/Step3Card';
import Step4QR from './components/Step4QR';

export default function Pago() {
  const [currentStep, setCurrentStep] = useState('step1');
  const [showModal, setShowModal] = useState(false);

  // Partículas flotantes
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

  const showStep = (id) => {
    setCurrentStep(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showPaid = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      window.location.href = '/';
    }, 1400);
  };

  return (
    <>
      <div className={styles.bg} aria-hidden="true"></div>
      <div className={styles.stars} id="stars" aria-hidden="true"></div>

      {/* TOPBAR */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <button
            className={styles.backBtn}
            onClick={() => {
              if (document.referrer && document.referrer !== location.href) {
                window.history.back();
              } else {
                window.location.href = '/';
              }
            }}
          >
            ← Regresar
          </button>

          <h1 className={styles.title}>¡HAZTE PREMIUM!</h1>
        </div>

        {/* 🔥 FORZADO A LA ESQUINA DERECHA */}
        <div className={styles.topbarRight} style={{ marginLeft: 'auto' }}>
          <span className={styles.userName}>Usuario 1</span>
        </div>
      </header>

      <main className={styles.wrap}>
        <Step1Contact
          visible={currentStep === 'step1'}
          showStep={showStep}
        />

        <Step2Payment
          visible={currentStep === 'step2'}
          showStep={showStep}
        />

        <Step3Card
          visible={currentStep === 'step3'}
          showStep={showStep}
          onSuccess={showPaid}
        />

        <Step4QR
          visible={currentStep === 'step4'}
          showStep={showStep}
          onSuccess={showPaid}
        />
      </main>

      {/* Modal de éxito */}
      <div
        className={`${styles.modal} ${showModal ? styles.modalShow : ''}`}
        aria-live="polite"
      >
        <div className={styles.modalCard}>
          <div className={styles.big}>¡PAGO CONFIRMADO!</div>
          <div className={styles.checkmark}>Checkmark</div>
        </div>
      </div>
    </>
  );
}
