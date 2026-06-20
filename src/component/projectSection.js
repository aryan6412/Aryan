import React from 'react';
import { works_data } from '../Data/portfolioData';

function ProjectSection() {
  return (
    <section id="projects" className="works-section">
      <div className="container-xxl">
        
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4 mb-5 pb-3">
          <div className="text-start">
            <span className="pill-badge text-uppercase small fw-bold mb-3 d-inline-block text-coral" style={{ letterSpacing: '2px' }}>
              Portfolio
            </span>
            <h2 className="display-5 fw-bold font-display text-teal mb-2">
              My Latest Works
            </h2>
            <p className="text-muted mb-0">Perfect solutions for digital experiences.</p>
          </div>
          <div className="text-start text-md-end">
            <a 
              href="#contact" 
              className="text-teal fw-bold text-decoration-none"
              style={{ fontSize: '1rem', borderBottom: '2px solid var(--primary-teal)', paddingBottom: '4px' }}
            >
              Explore More Works
            </a>
          </div>
        </div>

        {/* Works Grid */}
        <div className="row g-4">
          {works_data.map((work, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className={`work-card bg-${work.colorTheme} shadow-sm`}>
                
                {/* Text Content Area */}
                <div className="text-start">
                  <span className="work-category">{work.category}</span>
                  <h3 className="work-title text-teal">{work.title}</h3>
                </div>

                {/* Mockup Image Area */}
                <div className="work-img-container">
                  <img 
                    src={`${process.env.PUBLIC_URL}/${work.imageUrl}`} 
                    alt={work.title} 
                    className="work-img"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProjectSection;