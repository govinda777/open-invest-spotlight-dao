
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Calendar, Target, TrendingUp } from 'lucide-react';

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
    description: "Revolutionary clean energy solutions for sustainable future. We're developing cutting-edge solar panel technology with 40% higher efficiency than current market standards.",
    roadmap: [
      { phase: "Research & Development", status: "completed" },
      { phase: "Prototype Development", status: "current" },
      { phase: "Testing & Validation", status: "upcoming" },
      { phase: "Market Launch", status: "upcoming" }
    ],
    team: [
      { name: "Dr. Sarah Chen", role: "CEO & Founder", experience: "15 years in renewable energy" },
      { name: "Mark Rodriguez", role: "CTO", experience: "12 years in solar technology" },
      { name: "Lisa Wang", role: "Head of Operations", experience: "10 years in project management" }
    ]
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
    description: "Next-generation DeFi lending platform with innovative risk assessment algorithms and cross-chain compatibility.",
    roadmap: [
      { phase: "Smart Contract Development", status: "completed" },
      { phase: "Security Audits", status: "current" },
      { phase: "Beta Launch", status: "upcoming" },
      { phase: "Mainnet Deployment", status: "upcoming" }
    ],
    team: [
      { name: "Alex Thompson", role: "Lead Developer", experience: "8 years in blockchain" },
      { name: "Maria Garcia", role: "Smart Contract Auditor", experience: "6 years in security" },
      { name: "David Kim", role: "Product Manager", experience: "10 years in fintech" }
    ]
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
    description: "AI-powered diagnostic tools that help healthcare professionals make faster and more accurate diagnoses.",
    roadmap: [
      { phase: "AI Model Training", status: "completed" },
      { phase: "Clinical Trials", status: "current" },
      { phase: "Regulatory Approval", status: "upcoming" },
      { phase: "Commercial Launch", status: "upcoming" }
    ],
    team: [
      { name: "Dr. Emily Johnson", role: "Chief Medical Officer", experience: "20 years in medicine" },
      { name: "Robert Lee", role: "AI Research Lead", experience: "12 years in machine learning" },
      { name: "Anna Kowalski", role: "Regulatory Affairs", experience: "8 years in medical devices" }
    ]
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
    description: "Immersive blockchain-based gaming ecosystem where players can earn, trade, and build in a virtual world.",
    roadmap: [
      { phase: "Game Engine Development", status: "completed" },
      { phase: "Alpha Testing", status: "completed" },
      { phase: "Beta Launch", status: "current" },
      { phase: "Full Release", status: "upcoming" }
    ],
    team: [
      { name: "Jake Miller", role: "Game Director", experience: "15 years in game development" },
      { name: "Sophie Chen", role: "Blockchain Developer", experience: "7 years in crypto" },
      { name: "Tom Wilson", role: "Art Director", experience: "12 years in game design" }
    ]
  }
];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  const progressPercentage = Math.round((project.raised / project.goal) * 100);

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge>{project.category}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription className="text-base">{project.description}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.roadmap.map((phase, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      phase.status === 'completed' ? 'bg-green-500' :
                      phase.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <span className={phase.status === 'current' ? 'font-medium' : ''}>{phase.phase}</span>
                    <Badge variant={
                      phase.status === 'completed' ? 'default' :
                      phase.status === 'current' ? 'secondary' : 'outline'
                    }>
                      {phase.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.team.map((member, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-primary">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.experience}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Funding Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Raised</span>
                  <span className="font-bold text-primary">${(project.raised / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Goal</span>
                  <span className="font-medium">${(project.goal / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Backers</span>
                  <span className="font-medium">{project.backers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    Days Left
                  </span>
                  <span className="font-medium">{project.daysLeft}</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Invest Now
              </Button>
              <Button variant="outline" className="w-full">
                Add to Watchlist
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <span className="font-medium">$100</span>
                <span className="ml-auto text-sm text-muted-foreground">Early Bird</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span className="font-medium">$500</span>
                <span className="ml-auto text-sm text-muted-foreground">Standard</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span className="font-medium">$1,000</span>
                <span className="ml-auto text-sm text-muted-foreground">Premium</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span className="font-medium">$5,000</span>
                <span className="ml-auto text-sm text-muted-foreground">VIP</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
