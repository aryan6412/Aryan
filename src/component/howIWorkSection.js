import React from 'react';
import { Compass, Bot, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'I design',
    description: 'System plan & UI spec',
    color: 'teal',
    icon: Compass
  },
  {
    number: '02',
    title: 'AI agents build',
    description: 'Implemented in verified batches',
    color: 'coral',
    icon: Bot
  },
  {
    number: '03',
    title: 'Tests prove it',
    description: 'Automated suites green before anything ships',
    color: 'yellow',
    icon: CheckCircle2
  }
];

function HowIWorkSection() {
  return (
    <section id="how-i-work" className="how-i-work-section py-5" style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid rgba(15, 78, 70, 0.05)' }}>
      <div className="container-xxl py-4">
        
        {/* Section Header */}
        <div className="text-start mb-5 pb-2">
          <span className="pill-badge text-uppercase small fw-bold mb-3 d-inline-block text-coral" style={{ letterSpacing: '2px' }}>
            Workflow
          </span>
          <h2 className="display-5 fw-bold font-display text-teal mb-2">
            How I Work
          </h2>
          <p className="text-muted mb-0" style={{ maxWidth: '640px' }}>
            Modern AI-first development: high-clarity architecture, accelerated execution, verified reliability.
          </p>
        </div>

        {/* 3 Steps Row */}
        <div className="row g-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="service-card shadow-sm h-100 d-flex flex-column justify-content-between p-4" style={{ minHeight: '220px' }}>
                  <div className="d-flex align-items-center justify-content-between w-100 mb-4">
                    <div className={`service-icon-box color-${step.color}`}>
                      <Icon size={26} />
                    </div>
                    <span className="font-display fw-bold text-muted opacity-50" style={{ fontSize: '2rem', lineHeight: 1 }}>
                      {step.number}
                    </span>
                  </div>
                  <div className="text-start w-100">
                    <h3 className="service-title font-display text-teal mb-2" style={{ fontSize: '1.45rem' }}>
                      {step.title}
                    </h3>
                    <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HowIWorkSection;
