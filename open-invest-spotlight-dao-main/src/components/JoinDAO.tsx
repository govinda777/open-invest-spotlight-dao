
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const JoinDAO = () => {
  return (
    <section id="join" className="relative py-24 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">
            Ready to start your journey?
          </h2>
          <p className="text-lg mb-10 text-muted-foreground">
            Join our community today and be part of the decentralized investment revolution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button 
                size="lg" 
                variant="default" 
                className="w-full sm:w-auto animate-pulse group"
              >
                Start Onboarding
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/journeys">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto group"
              >
                View User Journeys
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </section>
  );
};
