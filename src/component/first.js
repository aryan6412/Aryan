import React from 'react';
import { Phone, Award } from 'lucide-react';
import { hero_data } from '../Data/portfolioData';

function First() {
  const { name, email, phone, title, subtitle, experienceYears, experienceUnit } = hero_data;

  return (
    <>
      {/* Sticky Header Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top py-3">
        <div className="container-xxl">
          <a className="navbar-brand fw-extrabold text-teal font-display fs-3" href="#/">
            {name}
          </a>
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#portfolioNav" 
            aria-controls="portfolioNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse justify-content-center" id="portfolioNav">
            <ul className="navbar-nav gap-2">
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#projects">Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#experience">Experience</a>
              </li>
            </ul>
          </div>

          <div className="d-none d-lg-flex align-items-center gap-2">
            <a 
              href={`tel:${phone}`} 
              className="btn btn-outline-dark d-inline-flex align-items-center gap-2 px-4 py-2 border-secondary"
              style={{ borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem' }}
            >
              <Phone size={14} className="text-teal" />
              {phone}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-xxl">
          <div className="row align-items-center g-5">
            {/* Hero Left Content */}
            <div className="col-lg-7 text-start">
              <h1 className="hero-title-name text-teal font-display">
                {title}
              </h1>
              <p className="lead fs-4 text-muted mb-4 font-display" style={{ fontStyle: 'italic', fontWeight: 400 }}>
                {subtitle}
              </p>
              <div className="mb-4">
                <a href={`mailto:${email}`} className="hero-email-link">
                  {email}
                </a>
              </div>

              {/* Experience Badge */}
              <div className="experience-block">
                <div className="experience-number">{experienceYears}</div>
                <div className="experience-text">
                  {experienceUnit || 'Years'}<br />Experience
                </div>
              </div>
            </div>

            {/* Hero Right Image / Splash */}
            <div className="col-lg-5">
              <div className="portrait-container">
                {/* Painted blob brush stroke backdrop */}
                <div className="brush-backdrop"></div>
                
                {/* Portrait picture */}
                <img 
                  src={`${process.env.PUBLIC_URL}/images/hero_portrait.png`} 
                  alt={name} 
                  className="portrait-img shadow-lg"
                />

                {/* Circular Certified Badge with SVG Circular Text */}
                <div className="circular-badge-container">
                  <svg viewBox="0 0 100 100" width="120" height="120" className="circular-badge-svg">
                    <path 
                      id="circlePath" 
                      d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" 
                      fill="none" 
                    />
                    <text fill="#0F4E46" fontSize="6.2" fontWeight="800" letterSpacing="1.2">
                      <textPath href="#circlePath">
                        • {name.toUpperCase()} • FULL-STACK DEVELOPER • COMPUTER ENGINEER
                      </textPath>
                    </text>
                  </svg>
                  <div className="badge-center-icon">
                    <Award size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default First;
