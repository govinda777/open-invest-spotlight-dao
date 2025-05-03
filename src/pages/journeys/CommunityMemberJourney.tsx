
import React from 'react';
import { JourneyManager } from '@/utils/userJourneys';
import { JourneyViewer } from '@/components/journey/JourneyViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunityMemberJourney = () => {
  const journeyManager = new JourneyManager();
  const journey = journeyManager.getJourney('communityMember');
  
  const handleCompleteStep = (stepId: string) => {
    journeyManager.completeStep('communityMember', stepId);
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
          <h1 className="text-3xl font-bold">Community Member Journey</h1>
          <p className="text-muted-foreground mt-2">
            Engage with our community and grow your knowledge and reputation.
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
                  <CardTitle>Community Guidelines</CardTitle>
                  <CardDescription>How to participate effectively in our community</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                  <CardDescription>Educational content for blockchain and DeFi</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Contribution Opportunities</CardTitle>
                  <CardDescription>Ways to contribute and earn reputation</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Events Calendar</CardTitle>
                  <CardDescription>Upcoming community events and workshops</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="prose max-w-none">
              <h3>Community Member Journey Details</h3>
              <h4>1. Community Entry</h4>
              <ul>
                <li>Create profile</li>
                <li>Join social channels</li>
                <li>Complete onboarding</li>
                <li>Set preferences</li>
              </ul>
              
              <h4>2. Engagement</h4>
              <ul>
                <li>Participate in discussions</li>
                <li>Share knowledge</li>
                <li>Provide feedback</li>
                <li>Help new members</li>
              </ul>
              
              <h4>3. Growth</h4>
              <ul>
                <li>Build reputation</li>
                <li>Earn community points</li>
                <li>Access exclusive content</li>
                <li>Influence community direction</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityMemberJourney;
