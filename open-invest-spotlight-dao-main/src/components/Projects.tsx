
import { useState } from "react";
import { Button } from "./ui/button";

const projects = [
  {
    id: 1,
    title: "GreenTech Ventures",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2374&q=80",
    raised: 1200000,
    goal: 2000000,
    backers: 340,
    daysLeft: 14,
  },
  {
    id: 2,
    title: "Decentralized Lending Protocol",
    category: "DeFi",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    raised: 890000,
    goal: 1500000,
    backers: 215,
    daysLeft: 21,
  },
  {
    id: 3,
    title: "MedTech AI Solutions",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    raised: 650000,
    goal: 1000000,
    backers: 180,
    daysLeft: 30,
  },
  {
    id: 4,
    title: "GameFi Metaverse",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    raised: 1800000,
    goal: 3000000,
    backers: 520,
    daysLeft: 7,
  }
];

const categories = ["All", "DeFi", "Gaming", "Sustainability", "Healthcare", "Infrastructure"];

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="staggered">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-3">
              Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mb-6">
              Discover carefully vetted projects with strong potential and aligned with our DAO values.
              Invest directly and track your portfolio's growth.
            </p>
          </div>
          <Button variant="gradient" className="whitespace-nowrap animate-scale-in">
            Submit Project
          </Button>
        </div>
        
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 staggered">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover-scale">
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 bg-secondary text-xs rounded-full">{project.category}</span>
                  <span className="text-sm text-muted-foreground">{project.daysLeft} days left</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{Math.round((project.raised / project.goal) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${Math.round((project.raised / project.goal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-primary font-bold">${(project.raised / 1000000).toFixed(1)}M</span>
                    <span className="text-sm text-muted-foreground"> raised</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.backers} backers
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" className="mx-auto">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};
