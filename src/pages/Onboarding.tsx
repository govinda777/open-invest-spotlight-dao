
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, BookOpen, Star, User, Users, Info } from "lucide-react";
import logo from '@/assets/svg/logo.svg';
import HowItWorksStep from "@/components/sections/HowItWorksStep";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      title: "Welcome to Open Invest DAO",
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Open Invest DAO is a decentralized platform that enables collaborative investment in innovative blockchain projects.
          </p>
          <div className="flex justify-center my-8">
            <img src={logo} alt="Open Invest DAO Logo" className="h-40 w-auto" />
          </div>
          <p>
            This onboarding guide will help you understand how to get started and make the most of our platform.
          </p>
        </div>
      )
    },
    {
      title: "Choose Your Journey",
      content: (
        <div className="space-y-6">
          <p className="mb-4">
            Open Invest DAO serves different users with unique goals. Choose the journey that best fits your needs:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="hover:border-primary transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="text-purple-600" /> Investor
                </CardTitle>
                <CardDescription>Invest in innovative projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Discover and invest in promising blockchain projects, track your investments, and participate in governance decisions.</p>
              </CardContent>
              <CardFooter>
                <Link to="/journeys/investor" className="w-full">
                  <Button className="w-full">Begin Investor Journey <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="hover:border-primary transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="text-purple-600" /> Project Owner
                </CardTitle>
                <CardDescription>Submit and fund your project</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Submit your blockchain project, gather community support, receive funding, and provide regular updates.</p>
              </CardContent>
              <CardFooter>
                <Link to="/journeys/project-owner" className="w-full">
                  <Button className="w-full">Begin Project Owner Journey <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="hover:border-primary transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-purple-600" /> DAO Member
                </CardTitle>
                <CardDescription>Participate in governance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Acquire governance tokens, vote on proposals, shape the platform's future, and receive rewards for participation.</p>
              </CardContent>
              <CardFooter>
                <Link to="/journeys/dao-member" className="w-full">
                  <Button className="w-full">Begin DAO Member Journey <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="hover:border-primary transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="text-purple-600" /> Community Member
                </CardTitle>
                <CardDescription>Engage and learn</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Join discussions, learn about projects, provide feedback, build reputation, and earn community rewards.</p>
              </CardContent>
              <CardFooter>
                <Link to="/journeys/community-member" className="w-full">
                  <Button className="w-full">Begin Community Member Journey <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <p className="text-sm text-muted-foreground">
            You can always explore different journeys later based on your evolving interests and goals.
          </p>
        </div>
      )
    },
    {
      title: "How Open Invest DAO Works",
      content: (
        <div className="space-y-6">
          <p className="mb-6">
            Understanding the basic workflow of Open Invest DAO will help you navigate the platform more effectively:
          </p>
          
          <div className="space-y-2">
            <HowItWorksStep
              number={1}
              title="Connect Your Wallet"
              description="Start by connecting your Web3 wallet to access the full functionality of the platform."
              details="We support popular wallets like MetaMask, WalletConnect, and more."
            />
            
            <HowItWorksStep
              number={2}
              title="Complete Verification"
              description="Depending on your chosen journey, you may need to verify your identity to participate fully."
              details="Verification requirements vary based on your jurisdiction and level of participation."
            />
            
            <HowItWorksStep
              number={3}
              title="Make Initial Contribution"
              description="Get started with an initial contribution of approximately $2,000 to receive governance tokens."
              details="Your contribution grants you voting rights proportional to your stake in the DAO."
            />
            
            <HowItWorksStep
              number={4}
              title="Participate in Governance"
              description="Vote on investment proposals, platform upgrades, and other important decisions."
              details="All votes are recorded on blockchain for complete transparency and accountability."
            />
            
            <HowItWorksStep
              number={5}
              title="Receive Benefits"
              description="Earn rewards, airdrops, and returns based on your participation and investments."
              details="Rewards include governance tokens, project tokens, and other ecosystem benefits."
              isLast={true}
            />
          </div>
        </div>
      )
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-6">
          <p className="mb-4">
            Here are answers to some common questions about Open Invest DAO:
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a DAO?</AccordionTrigger>
              <AccordionContent>
                A Decentralized Autonomous Organization (DAO) is an entity with no central leadership. Decisions are made from the bottom-up, governed by a community organized around a specific set of rules enforced on a blockchain.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How do governance tokens work?</AccordionTrigger>
              <AccordionContent>
                Governance tokens represent your stake in the DAO and give you voting rights proportional to your holdings. You can use these tokens to vote on proposals, suggest changes, and participate in platform governance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>What investment strategies does Open Invest DAO use?</AccordionTrigger>
              <AccordionContent>
                The DAO employs various strategies including a HODL portfolio of established cryptocurrencies (Bitcoin, Ethereum, etc.) and DeFi strategies such as liquidity pools, staking, vaults, and collateralized lending.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How are investment decisions made?</AccordionTrigger>
              <AccordionContent>
                Investment decisions are made collectively through governance votes. Members can propose investments, and if approved by the community, the funds are allocated accordingly. All decisions are transparent and recorded on the blockchain.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How can I withdraw my investments?</AccordionTrigger>
              <AccordionContent>
                Withdrawal processes vary based on the specific investment and may include unlock periods and exit fees. Details are provided for each investment opportunity on the platform.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )
    },
    {
      title: "Next Steps",
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            You're now ready to start your journey with Open Invest DAO!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <Card className="bg-purple-50">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <BookOpen className="text-purple-600" /> 
                  Explore Learning Resources
                </h3>
                <p className="mt-2 text-sm">
                  Access educational materials on blockchain, DeFi, and investment strategies to enhance your knowledge.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Users className="text-purple-600" /> 
                  Join Our Community
                </h3>
                <p className="mt-2 text-sm">
                  Connect with other members through our Discord, Telegram, and forum to share insights and ask questions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Star className="text-purple-600" /> 
                  Browse Active Projects
                </h3>
                <p className="mt-2 text-sm">
                  Discover and research current investment opportunities available on the platform.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Info className="text-purple-600" /> 
                  Set Up Notifications
                </h3>
                <p className="mt-2 text-sm">
                  Configure your notification preferences to stay updated on important platform activities.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Link to="/journeys">
              <Button size="lg">
                View All User Journeys <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )
    }
  ];
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <span className="ml-2 font-bold text-xl">Open Invest DAO</span>
          </div>
          <div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">Getting Started</h1>
            <p className="text-center text-gray-600">Follow this guide to start your journey with Open Invest DAO</p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg mb-6">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                  {currentStep}
                </div>
                <h2 className="text-xl font-semibold ml-3">{steps[currentStep - 1].title}</h2>
              </div>
              
              <div className="mt-6">
                {steps[currentStep - 1].content}
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < steps.length ? (
                <Button onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Link to="/journeys">
                  <Button>
                    Finish Onboarding
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    currentStep === index + 1 ? "bg-purple-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentStep(index + 1)}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
