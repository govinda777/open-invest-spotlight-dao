
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import JourneysHub from "./pages/journeys/JourneysHub";
import InvestorJourney from "./pages/journeys/InvestorJourney";
import ProjectOwnerJourney from "./pages/journeys/ProjectOwnerJourney";
import DAOMemberJourney from "./pages/journeys/DAOMemberJourney";
import CommunityMemberJourney from "./pages/journeys/CommunityMemberJourney";
import Onboarding from "./pages/Onboarding";
import { OnboardingDialog } from "./components/onboarding/OnboardingDialog";
import logo from '@/assets/svg/logo.svg';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    
    if (!hasVisited) {
      // If first visit, show the onboarding dialog
      setShowOnboarding(true);
      // Set the flag in localStorage
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <main role="main">
            <OnboardingDialog 
              open={showOnboarding} 
              onOpenChange={setShowOnboarding} 
            />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/journeys" element={<JourneysHub />} />
              <Route path="/journeys/investor" element={<InvestorJourney />} />
              <Route path="/journeys/project-owner" element={<ProjectOwnerJourney />} />
              <Route path="/journeys/dao-member" element={<DAOMemberJourney />} />
              <Route path="/journeys/community-member" element={<CommunityMemberJourney />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
