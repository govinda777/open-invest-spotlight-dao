
import React from 'react';
import { JourneyManager } from '@/utils/userJourneys';
import { JourneyViewer } from '@/components/journey/JourneyViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProjectOwnerJourney = () => {
  const journeyManager = new JourneyManager();
  const journey = journeyManager.getJourney('projectOwner');
  
  const handleCompleteStep = (stepId: string) => {
    journeyManager.completeStep('projectOwner', stepId);
    // Force a re-render
    window.location.reload();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-8" asChild>
        <Link to="/journeys">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Journeys
        </Link>
      </Button>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Project Owner Journey</h1>
          <p className="text-muted-foreground mt-2">
            Launch and grow your project with the support of our DAO community.
          </p>
        </div>

        <Tabs defaultValue="journey">
          <TabsList className="mb-4">
            <TabsTrigger value="journey">Journey Map</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="details">Journey Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="journey">
            <JourneyViewer journey={journey} onCompleteStep={handleCompleteStep} />
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Submission Guide</CardTitle>
                  <CardDescription>How to prepare and submit your project</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tokenomics Framework</CardTitle>
                  <CardDescription>Design robust token economics for your project</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Community Engagement Strategies</CardTitle>
                  <CardDescription>Best practices for growing your community</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Milestone Tracking Tools</CardTitle>
                  <CardDescription>Keep your project on track and transparent</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="prose max-w-none">
              <h3>Project Owner Journey Details</h3>
              <h4>1. Project Submission</h4>
              <ul>
                <li>Create project profile</li>
                <li>Upload documentation</li>
                <li>Set funding goals</li>
                <li>Define tokenomics</li>
              </ul>
              
              <h4>2. Review Process</h4>
              <ul>
                <li>Community feedback</li>
                <li>Technical review</li>
                <li>Due diligence</li>
                <li>Approval voting</li>
              </ul>
              
              <h4>3. Campaign Launch</h4>
              <ul>
                <li>Marketing materials</li>
                <li>Community engagement</li>
                <li>Investor outreach</li>
                <li>AMA sessions</li>
              </ul>
              
              <h4>4. Project Development</h4>
              <ul>
                <li>Regular updates</li>
                <li>Milestone tracking</li>
                <li>Community feedback</li>
                <li>Governance participation</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectOwnerJourney;
