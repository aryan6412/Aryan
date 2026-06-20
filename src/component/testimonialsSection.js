import React from 'react';
import { User } from 'lucide-react';
import { testimonials_data } from '../Data/portfolioData';

function TestimonialsSection() {
  if (!testimonials_data || testimonials_data.length === 0) {
    return null;
  }

  return (
    <section className="testimonials-section">
      <div className="container-xxl">
        
        {/* Section Header */}
        <div className="text-center mb-5 pb-3">
          <span className="pill-badge text-uppercase small fw-bold mb-3 d-inline-block text-coral" style={{ letterSpacing: '2px' }}>
            Testimonials
          </span>
          <h2 className="display-5 fw-bold font-display text-teal">
            People talk about us
          </h2>
          <p className="text-muted mt-2 max-width-md mx-auto" style={{ maxWidth: '600px' }}>
            We work closely with clients to deliver solutions that fit their budget and align with their goals. Here is what they say.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="row g-4 justify-content-center">
          {testimonials_data.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="testimonial-card h-100 d-flex flex-column justify-content-between text-start">
                
                {/* Quote Text */}
                <p className="testimonial-quote text-muted">
                  “{item.quote}”
                </p>

                {/* Author Info */}
                <div className="testimonial-author mt-3">
                  <div className="testimonial-avatar">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="testimonial-name text-teal mb-0">{item.name}</h4>
                    <span className="testimonial-role">{item.role}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;
