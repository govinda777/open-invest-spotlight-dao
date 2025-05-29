
import React from 'react';
import { JourneyManager } from '@/utils/userJourneys';
import { JourneyViewer } from '@/components/journey/JourneyViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const InvestorJourney = () => {
  const journeyManager = new JourneyManager();
  const journey = journeyManager.getJourney('investor');
  
  const handleCompleteStep = (stepId: string) => {
    journeyManager.completeStep('investor', stepId);
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
          <h1 className="text-3xl font-bold">Investor Journey</h1>
          <p className="text-muted-foreground mt-2">
            Follow the steps below to maximize your investment experience on our platform.
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
                  <CardTitle>Investment Guides</CardTitle>
                  <CardDescription>Learn the fundamentals of blockchain investing</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment Tools</CardTitle>
                  <CardDescription>Understand and mitigate investment risks</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project Evaluation Framework</CardTitle>
                  <CardDescription>Methodology for evaluating project potential</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Governance Participation Guide</CardTitle>
                  <CardDescription>How to effectively participate in project governance</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="prose max-w-none">
              <h3>Investor Journey Details</h3>
              <h4>1. Discovery</h4>
              <ul>
                <li>Land on platform homepage</li>
                <li>Browse featured projects</li>
                <li>View project categories</li>
              </ul>
              
              <h4>2. Research</h4>
              <ul>
                <li>Read project documentation</li>
                <li>Review team information</li>
                <li>Analyze financial projections</li>
                <li>Check community engagement</li>
              </ul>
              
              <h4>3. Investment</h4>
              <ul>
                <li>Connect cryptocurrency wallet</li>
                <li>Select investment amount</li>
                <li>Review terms and conditions</li>
                <li>Complete investment transaction</li>
              </ul>
              
              <h4>4. Post-Investment</h4>
              <ul>
                <li>Track investment performance</li>
                <li>Receive regular updates</li>
                <li>Participate in project governance</li>
                <li>Access exclusive content</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestorJourney;
