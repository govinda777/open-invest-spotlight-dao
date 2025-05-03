
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, Briefcase, Vote, MessageSquare } from 'lucide-react';
import { JourneyManager, UserType } from '@/utils/userJourneys';

const JourneysHub = () => {
  const journeyManager = new JourneyManager();
  
  const journeyCards = [
    {
      title: "Investor Journey",
      description: "Discover, research, invest, and track your investments",
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      type: 'investor' as UserType,
      route: "/journeys/investor"
    },
    {
      title: "Project Owner Journey",
      description: "Submit projects, secure funding, and build with community support",
      icon: <Users className="h-8 w-8 text-primary" />,
      type: 'projectOwner' as UserType,
      route: "/journeys/project-owner"
    },
    {
      title: "DAO Member Journey",
      description: "Participate in governance and shape the platform's future",
      icon: <Vote className="h-8 w-8 text-primary" />,
      type: 'daoMember' as UserType,
      route: "/journeys/dao-member"
    },
    {
      title: "Community Member Journey",
      description: "Engage, learn, and build your reputation in the community",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      type: 'communityMember' as UserType,
      route: "/journeys/community-member"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">User Journeys</h1>
          <p className="text-lg text-muted-foreground">
            Explore different paths and experiences within the Open Invest Spotlight DAO platform.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journeyCards.map((card, index) => {
            const progress = journeyManager.getProgress(card.type);
            
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="mb-3">{card.icon}</div>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${progress}%` }} 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to={card.route}>
                      View Journey <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        <Card className="bg-primary-foreground border-primary-foreground">
          <CardHeader>
            <CardTitle>Cross-User Interactions</CardTitle>
            <CardDescription>
              Understanding how different user types interact within the platform ecosystem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <p>
                Our platform creates a collaborative ecosystem where all user types interact 
                with each other. Project Owners submit their projects, which are reviewed by 
                DAO Members. Approved projects become available to Investors, while Community 
                Members engage with these projects through discussion and feedback.
              </p>
              <p>
                This interconnected ecosystem ensures that all participants benefit from
                shared knowledge, transparent decision-making, and collective value creation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JourneysHub;
