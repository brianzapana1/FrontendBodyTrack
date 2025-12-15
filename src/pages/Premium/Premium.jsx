import React, { useState } from 'react';
import Background from './components/Background';
import Topbar from './components/Topbar';
import Tabs from './components/Tabs';
import DashboardHome from './components/DashboardHome';
import TrainerDetail from './components/TrainerDetail';
import TrainerWelcome from './components/TrainerWelcome';

const Premium = () => {
  const [view, setView] = useState('view-dashboard');

  const onLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div>
      <Background />
      <Topbar onLogout={onLogout} />
      <Tabs view={view} setView={setView} />

      {/* Render views based on current `view` state */}
      {view === 'view-dashboard' && <DashboardHome setView={setView} />}
      {view === 'view-trainer-detail' && <TrainerDetail />}
      {view === 'view-trainer-welcome' && <TrainerWelcome />}
      {/* Add other views as needed */}
    </div>
  );
};

export default Premium;
