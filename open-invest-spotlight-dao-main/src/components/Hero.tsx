
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter animate-fade-in">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Open Invest DAO
              </span>
              <span className="block mt-2">Decentralized Investment Platform</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{animationDelay: "0.2s"}}>
              A community-owned platform for discovering, funding, and growing innovative blockchain projects with complete transparency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Link to="/onboarding">
                <Button 
                  size="lg" 
                  variant="default" 
                  className="w-full sm:w-auto group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/journeys">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto"
                >
                  Explore Journeys
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block animate-fade-in" style={{animationDelay: "0.6s"}}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-30"></div>
            <img 
              src="/banner.svg" 
              alt="DAO Investment Illustration" 
              className="w-full max-w-lg mx-auto relative z-10"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </section>
  );
};
