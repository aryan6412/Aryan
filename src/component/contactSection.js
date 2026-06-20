import React from 'react';
import { contactLinks, hero_data } from '../Data/portfolioData';

function ContactSection() {
  const { email, phone } = hero_data;
  const { address } = contactLinks;

  return (
    <footer id="contact" className="footer-section text-start">
      <div className="container-xxl">
        
        {/* Main Footer Row */}
        <div className="row g-5 mb-5">
          
          {/* CTA Column (Left Side) */}
          <div className="col-lg-7">
            <h2 className="footer-cta-title text-teal font-display mb-4">
              Let's make something<br />amazing together.
            </h2>
            <div className="mb-4">
              <a 
                href={contactLinks.whatsapp || `mailto:${email}`} 
                target="_blank" 
                rel="noreferrer" 
                className="footer-email-link"
              >
                Start by saying hi
              </a>
            </div>
            
            <div className="mt-5">
              <a 
                href="#/admin" 
                className="text-decoration-none small text-muted hover-coral" 
                style={{ fontSize: '0.8rem', opacity: 0.6, transition: 'opacity 0.2s' }}
                onMouseOver={(e) => e.target.style.opacity = 1}
                onMouseOut={(e) => e.target.style.opacity = 0.6}
              >
                Admin Panel Login
              </a>
            </div>
          </div>

          {/* Info & Links Column (Right Side) */}
          <div className="col-lg-5 ps-lg-5">
            <div className="row g-4">
              
              {/* Address / Contact details */}
              <div className="col-sm-6">
                <div className="footer-label">Information</div>
                <p className="footer-info-text text-teal mb-3">{address || '145 New York, FL 5467, USA'}</p>
                <p className="mb-1 text-muted fw-semibold" style={{ fontSize: '0.95rem' }}>{email}</p>
                <p className="text-muted fw-semibold" style={{ fontSize: '0.95rem' }}>{phone}</p>
              </div>

              {/* Navigation Links */}
              <div className="col-sm-6 ps-sm-4">
                <div className="footer-label">Quick Links</div>
                <ul className="list-unstyled d-flex flex-column gap-2">
                  <li>
                    <a href="#services" className="footer-nav-link">Services</a>
                  </li>
                  <li>
                    <a href="#projects" className="footer-nav-link">Works</a>
                  </li>
                  <li>
                    <a href="#experience" className="footer-nav-link">Experience</a>
                  </li>
                  <li>
                    <a href={contactLinks.github} target="_blank" rel="noreferrer" className="footer-nav-link">GitHub</a>
                  </li>
                  <li>
                    <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="footer-nav-link">LinkedIn</a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-4 border-top border-secondary border-opacity-10 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <p className="text-muted small mb-0">
            &copy; {new Date().getFullYear()} {hero_data.name}. All rights reserved.
          </p>
          <p className="text-muted small mb-0">
            Powered by React &amp; Tailwind Aesthetic
          </p>
        </div>

      </div>
    </footer>
  );
}

export default ContactSection;
