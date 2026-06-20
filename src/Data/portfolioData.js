import * as Lucide from 'lucide-react';
import data from './portfolioData.json';

// Helper to resolve icon from string
const getIcon = (name) => {
    return Lucide[name] || Lucide.HelpCircle;
};

export const hero_data = data.hero_data;

export const services_data = data.services_data.map(item => ({
    ...item,
    icon: getIcon(item.iconName)
}));

export const experience_data = data.experience_data;

export const works_data = data.works_data;

export const testimonials_data = (data.testimonials_data || []).map(item => ({
    ...item,
    icon: getIcon(item.avatarName)
}));

export const contactLinks = data.contactLinks;

// Backward compatibility or secondary skill exports
export const skill_data = [
    { name: 'Java', description: 'Backend development', icon: Lucide.Braces },
    { name: 'PHP', description: 'Server-side scripting', icon: Lucide.Server },
    { name: 'React JS', description: 'Interactive user interfaces', icon: Lucide.Atom },
    { name: 'MySQL', description: 'Database management', icon: Lucide.Database }
];
export const Project = [{ title: data.works_data[0].title, description: '', badge: '', highlights: [] }];
export const projectHighlights = [];
export const project_data = [];
