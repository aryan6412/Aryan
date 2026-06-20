import React from 'react';
import { experience_data } from '../Data/portfolioData';

function ExperienceSection() {
  return (
    <section id="experience" className="experience-section">
      <div className="container-xxl">
        
        {/* Section Header */}
        <div className="text-start mb-5 pb-3">
          <span className="pill-badge text-uppercase small fw-bold mb-3 d-inline-block text-coral" style={{ letterSpacing: '2px' }}>
            Career Timeline
          </span>
          <h2 className="display-5 fw-bold font-display text-teal">
            My Work Experience
          </h2>
        </div>

        {/* Experience List */}
        <div className="d-flex flex-column mt-4">
          {experience_data.map((exp, index) => (
            <div key={index} className="experience-row row py-5 align-items-start g-4">
              
              {/* Company & Date (Left Column) */}
              <div className="col-md-4 text-start">
                <h4 className="experience-company mb-1">{exp.company}</h4>
                <div className="experience-dates">{exp.dates}</div>
              </div>

              {/* Role & Description (Right Column) */}
              <div className="col-md-8 text-start ps-md-5">
                <h3 className="experience-role text-teal">{exp.role}</h3>
                <p className="experience-desc text-muted mb-0">
                  {exp.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ExperienceSection;
