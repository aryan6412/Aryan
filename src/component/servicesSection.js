import React from 'react';
import { services_data } from '../Data/portfolioData';

function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <div className="container-xxl">
        <div className="row g-5 align-items-center">
          
          {/* Services Cards (Left Side) */}
          <div className="col-lg-6">
            <div className="d-flex flex-column gap-4">
              {services_data.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="service-card shadow-sm">
                    <div className="d-flex align-items-center gap-4">
                      {/* Color-coded Icon Box */}
                      <div className={`service-icon-box color-${service.color}`}>
                        <Icon size={28} />
                      </div>
                      <div className="text-start">
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-count mb-0">{service.projectsCount} Projects</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Heading and Statistics (Right Side) */}
          <div className="col-lg-6 text-start ps-lg-5">
            <span className="pill-badge text-uppercase small fw-bold mb-3 d-inline-block text-coral" style={{ letterSpacing: '2px' }}>
              My Services
            </span>
            <h2 className="display-5 fw-bold mb-4 font-display text-teal">
              What do I help?
            </h2>
            <p className="lead text-muted mb-4">
              I help you find solutions and solve your technical problems. I use standard design processes to build digital products, optimizing them to help grow your business.
            </p>
            <p className="text-muted mb-5">
              We focus on clean visual layout, responsive performance across all platforms, and strong UX guidelines that make your products feel intuitive and premium.
            </p>

            {/* Statistics Counters */}
            <div className="row g-4 mt-2">
              <div className="col-sm-6">
                <div className="stats-number text-coral">285+</div>
                <div className="stats-label">Projects Completed</div>
              </div>
              <div className="col-sm-6">
                <div className="stats-number text-teal">190+</div>
                <div className="stats-label">Happy Clients</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
