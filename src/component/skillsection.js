import React from 'react';
import { skill_data } from '../Data/portfolioData';
import SectionHeading from './sectionHeading';


function SkillSection() {
    return (
        <section id="tech-stack" className="skills-section py-lg-5 py-5">
            <div className="section-shell">
                <SectionHeading
                    name='Skills'
                    description='A focused stack for designing responsive interfaces, building backend services, and working across full-stack workflows.'
                    title='Tools I use to build modern web products'
                />
                <div className="row g-4 ">
                    {skill_data.map(({name,description, icon:Icon}) => (
                        <div key={name} className="col-md-6 col-lg-4">
                            <article className="feature-card h-100">
                                <div className="skill-card h-100 p-4">
                                    <div className='icon-box mb-4'><Icon size={34}/></div>
                                    <h3 className="skill-title mb-3">{name}</h3>
                                    <p className="skill-description mb-0">{description}</p>
                                </div>
                            </article>


                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default SkillSection;