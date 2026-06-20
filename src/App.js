import './App.css';
import React, { useState, useEffect } from 'react';
import First from './component/first';
import ServicesSection from './component/servicesSection';
import ExperienceSection from './component/experienceSection';
import ProjectSection from './component/projectSection';
import TestimonialsSection from './component/testimonialsSection';
import ContactSection from './component/contactSection';
import AdminSection from './component/adminSection';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const isAdminRoute = currentHash === '#/admin' || currentHash === '#admin';

  if (isAdminRoute) {
    return <AdminSection />;
  }

  return (
    <div className="bady portfolio-app position-relative overflow-hidden">
      <First />
      <ServicesSection />
      <ProjectSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}

export default App;
