
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye, Heart } from 'lucide-react';

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
    description: "Revolutionary clean energy solutions for sustainable future."
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
    description: "Next-generation DeFi lending platform with innovative risk assessment."
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
    description: "AI-powered diagnostic tools for healthcare professionals."
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
    description: "Immersive blockchain-based gaming ecosystem."
  },
  {
    id: 5,
    title: "DeFi Insurance Protocol",
    category: "DeFi",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2370&q=80",
    raised: 450000,
    goal: 800000,
    backers: 120,
    daysLeft: 45,
    description: "Decentralized insurance solutions for DeFi protocols."
  },
  {
    id: 6,
    title: "Carbon Credit Marketplace",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2371&q=80",
    raised: 780000,
    goal: 1200000,
    backers: 200,
    daysLeft: 18,
    description: "Blockchain-based carbon credit trading platform."
  }
];

const categories = ["All", "DeFi", "Gaming", "Sustainability", "Healthcare", "Infrastructure"];

const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [watchlist, setWatchlist] = useState<number[]>([]);
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const toggleWatchlist = (projectId: number) => {
    setWatchlist(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Projects</h1>
          <p className="text-muted-foreground">
            Discover and invest in innovative projects across various categories.
          </p>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <Badge>{project.category}</Badge>
                </div>
                <button
                  onClick={() => toggleWatchlist(project.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    watchlist.includes(project.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${watchlist.includes(project.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-muted-foreground">{project.daysLeft} days left</span>
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
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
                
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-primary font-bold">${(project.raised / 1000000).toFixed(1)}M</span>
                    <span className="text-muted-foreground"> raised</span>
                  </div>
                  <div className="text-muted-foreground">
                    {project.backers} backers
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" asChild>
                    <Link to={`/project/${project.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
