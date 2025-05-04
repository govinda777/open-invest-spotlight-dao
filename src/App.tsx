
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Projects } from './components/Projects';
import { JoinDAO } from './components/JoinDAO';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Projects />
        <JoinDAO />
      </main>
      <Footer />
    </div>
  );
}

export default App;
