
import { useState } from "react";

const features = [
  {
    title: "Decentralized Governance",
    description: "Vote on project decisions, platform updates, and fund allocations through community-driven governance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    )
  },
  {
    title: "Transparent Investments",
    description: "All transactions and project milestones are recorded on blockchain for complete transparency and trust.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
        <line x1="3" x2="21" y1="9" y2="9"/>
        <line x1="9" x2="9" y1="21" y2="9"/>
      </svg>
    )
  },
  {
    title: "Project Discovery",
    description: "Advanced filtering and recommendation system to help you find the projects that match your investment criteria.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
    )
  },
  {
    title: "Diverse Project Categories",
    description: "From DeFi and NFTs to real-world assets and sustainable ventures - all curated with careful due diligence.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4 7.55 4.24"/>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.29 7 12 12 20.71 7"/>
        <line x1="12" x2="12" y1="22" y2="12"/>
      </svg>
    )
  },
  {
    title: "Milestone-Based Funding",
    description: "Funds are released according to project milestones, ensuring accountability and proper capital allocation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
        <path d="m9 16 2 2 4-4"/>
      </svg>
    )
  },
  {
    title: "Portfolio Analytics",
    description: "Comprehensive dashboard with real-time analytics, performance tracking, and portfolio management tools.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    )
  }
];

export const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 staggered">
          <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Redefining Investment Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines the best of decentralized finance with user-friendly tools to create
            a seamless investment journey for all participants.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 hover-scale ${
                index === activeFeature ? 'glass-card shadow-lg' : 'bg-white/5 hover:glass-card'
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${
                index === activeFeature ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
