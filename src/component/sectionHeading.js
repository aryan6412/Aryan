import React from 'react';
function SectionHeading({ name,title, description }) {
    return (
        <div className="section-heading mb-4">
            <span className="section-name">{name}</span>
            <h2 className="section-title">{title}</h2>
            <p className="section-description">{description}</p>
        </div>
    );
}

export default SectionHeading;