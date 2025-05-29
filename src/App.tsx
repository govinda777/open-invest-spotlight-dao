
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Projects } from './components/Projects';
import { JoinDAO } from './components/JoinDAO';
import { Footer } from './components/Footer';
import Onboarding from './pages/Onboarding';
import JourneysHub from './pages/journeys/JourneysHub';
import InvestorJourney from './pages/journeys/InvestorJourney';
import ProjectOwnerJourney from './pages/journeys/ProjectOwnerJourney';
import DAOMemberJourney from './pages/journeys/DAOMemberJourney';
import CommunityMemberJourney from './pages/journeys/CommunityMemberJourney';
import JourneyMapper from './pages/journeys/JourneyMapper';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Features />
              <Projects />
              <JoinDAO />
            </main>
          } />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/journeys" element={<JourneysHub />} />
          <Route path="/journeys/investor" element={<InvestorJourney />} />
          <Route path="/journeys/project-owner" element={<ProjectOwnerJourney />} />
          <Route path="/journeys/dao-member" element={<DAOMemberJourney />} />
          <Route path="/journeys/community-member" element={<CommunityMemberJourney />} />
          <Route path="/journeys/mapper" element={<JourneyMapper />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
