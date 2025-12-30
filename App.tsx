
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import PropertyList from './views/PropertyList';
import Leads from './views/Leads';
import Profile from './views/Profile';
import Plans from './views/Plans';
import Agenda from './views/Agenda';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'Painel Geral';
      case '/properties': return 'Carteira de Imóveis';
      case '/leads': return 'Gestão de Leads';
      case '/agenda': return 'Agenda Inteligente';
      case '/profile': return 'Configurações';
      case '/plans': return 'Planos e Assinaturas';
      default: return 'Corretor360';
    }
  };

  return (
    <Layout title={getPageTitle(location.pathname)}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
