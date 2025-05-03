
import React from 'react';
import { JourneyManager } from '@/utils/userJourneys';
import { JourneyViewer } from '@/components/journey/JourneyViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DAOMemberJourney = () => {
  const journeyManager = new JourneyManager();
  const journey = journeyManager.getJourney('daoMember');
  
  const handleCompleteStep = (stepId: string) => {
    journeyManager.completeStep('daoMember', stepId);
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
          <h1 className="text-3xl font-bold">DAO Member Journey</h1>
          <p className="text-muted-foreground mt-2">
            Participate in governance and shape the future of the platform.
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
                  <CardTitle>Governance Guide</CardTitle>
                  <CardDescription>Understanding DAO governance mechanics</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Proposal Creation Framework</CardTitle>
                  <CardDescription>How to craft effective governance proposals</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Voting Strategy Guide</CardTitle>
                  <CardDescription>Make informed voting decisions</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>DAO Treasury Management</CardTitle>
                  <CardDescription>Understanding collective fund management</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="prose max-w-none">
              <h3>DAO Member Journey Details</h3>
              <h4>1. DAO Entry</h4>
              <ul>
                <li>Purchase governance tokens</li>
                <li>Complete verification</li>
                <li>Join community channels</li>
                <li>Review governance rules</li>
              </ul>
              
              <h4>2. Governance Participation</h4>
              <ul>
                <li>Review proposals</li>
                <li>Participate in discussions</li>
                <li>Cast votes</li>
                <li>Submit proposals</li>
              </ul>
              
              <h4>3. Community Impact</h4>
              <ul>
                <li>Shape platform direction</li>
                <li>Influence project selection</li>
                <li>Contribute to improvements</li>
                <li>Earn rewards</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DAOMemberJourney;
